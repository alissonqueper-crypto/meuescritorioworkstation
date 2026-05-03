import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Metodo = "pix" | "cartao_credito" | "cartao_debito" | "link";

interface PagamentoBody {
  equipe_id: string;
  valor: number;
  metodo: Metodo;
  equipe_nome: string;
  capitao_email: string;
  capitao_telefone: string;
}

const METODOS_VALIDOS: Metodo[] = ["pix", "cartao_credito", "cartao_debito", "link"];
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function validar(b: Partial<PagamentoBody>): string | null {
  if (!b.equipe_id || typeof b.equipe_id !== "string" || !UUID_REGEX.test(b.equipe_id))
    return "equipe_id inválido";
  if (typeof b.valor !== "number" || b.valor <= 0 || b.valor > 100000)
    return "valor inválido";
  if (!b.metodo || !METODOS_VALIDOS.includes(b.metodo as Metodo))
    return "metodo inválido";
  if (!b.equipe_nome || typeof b.equipe_nome !== "string" || b.equipe_nome.length > 200)
    return "equipe_nome inválido";
  if (!b.capitao_email || typeof b.capitao_email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.capitao_email))
    return "capitao_email inválido";
  if (!b.capitao_telefone || typeof b.capitao_telefone !== "string" || b.capitao_telefone.length > 30)
    return "capitao_telefone inválido";
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método não permitido" }, 405);

  try {
    const body = (await req.json().catch(() => null)) as PagamentoBody | null;
    if (!body) return json({ error: "JSON inválido" }, 400);

    const erro = validar(body);
    if (erro) return json({ error: erro }, 400);

    const apiKey = Deno.env.get("INFINITEPAY_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!apiKey || !supabaseUrl || !serviceKey) {
      console.error("Secrets ausentes");
      return json({ error: "Configuração do servidor incompleta" }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Mapear método para payload InfinitePay
    const ipMethod =
      body.metodo === "pix" ? "pix"
      : body.metodo === "cartao_credito" ? "credit_card"
      : body.metodo === "cartao_debito" ? "debit_card"
      : "link";

    const orderNsu = `CS_${body.equipe_id.slice(0, 8)}_${Date.now()}`;
    const valorCents = Math.round(body.valor * 100);

    const ipPayload = {
      amount: valorCents,
      payment_method: ipMethod,
      order_nsu: orderNsu,
      description: `Inscrição ${body.equipe_nome} - 3º Campeonato CS Regional`,
      customer: {
        name: body.equipe_nome,
        email: body.capitao_email,
        phone: body.capitao_telefone,
      },
    };

    const ipRes = await fetch("https://api.infinitepay.io/v2/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(ipPayload),
    });

    const ipData = await ipRes.json().catch(() => ({}));

    if (!ipRes.ok) {
      console.error("InfinitePay error:", ipRes.status, ipData);
      return json({ error: "Erro ao processar pagamento", details: ipData }, 502);
    }

    const transactionId =
      ipData.transaction_id || ipData.id || ipData.nsu || orderNsu;
    const pixQrCode = ipData.pix?.qr_code || ipData.qr_code || null;
    const pixCopiaCola =
      ipData.pix?.qr_code_text || ipData.pix?.copy_paste || ipData.copy_paste || null;
    const checkoutUrl =
      ipData.checkout_url || ipData.url || ipData.payment_url || null;

    // Persistir em pagamentos
    const { error: dbErr } = await supabase.from("pagamentos").insert({
      equipe_id: body.equipe_id,
      valor: body.valor,
      metodo: body.metodo,
      status: "pendente",
      infinitepay_transaction_id: String(transactionId),
      infinitepay_checkout_url: checkoutUrl,
      pix_qr_code: pixQrCode,
      pix_copia_cola: pixCopiaCola,
    });

    if (dbErr) {
      console.error("Erro ao salvar pagamento:", dbErr);
      return json({ error: "Erro ao salvar pagamento", details: dbErr.message }, 500);
    }

    if (body.metodo === "pix") {
      return json({
        status: "pendente",
        pix_qr_code: pixQrCode,
        pix_copia_cola: pixCopiaCola,
        transaction_id: String(transactionId),
      });
    }

    return json({
      status: "pendente",
      checkout_url: checkoutUrl,
      transaction_id: String(transactionId),
    });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return json({ error: "Erro interno do servidor" }, 500);
  }
});
