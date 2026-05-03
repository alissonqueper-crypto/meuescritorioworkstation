import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const INFINITEPAY_HANDLE = "meu-escritorio";
const BASE_URL = "https://meuescritorioworkstation.lovable.app";

type Metodo = "pix" | "cartao_credito" | "cartao_debito" | "link";
const METODOS_VALIDOS: Metodo[] = ["pix", "cartao_credito", "cartao_debito", "link"];
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface Body {
  equipe_id: string;
  valor: number;
  metodo: Metodo;
  equipe_nome: string;
  capitao_email: string;
  capitao_telefone: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function validar(b: Partial<Body>): string | null {
  if (!b.equipe_id || !UUID_REGEX.test(b.equipe_id)) return "equipe_id inválido";
  if (typeof b.valor !== "number" || b.valor <= 0 || b.valor > 100000) return "valor inválido";
  if (!b.metodo || !METODOS_VALIDOS.includes(b.metodo)) return "metodo inválido";
  if (!b.equipe_nome || b.equipe_nome.length > 200) return "equipe_nome inválido";
  if (!b.capitao_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.capitao_email))
    return "capitao_email inválido";
  if (!b.capitao_telefone || b.capitao_telefone.length > 30) return "capitao_telefone inválido";
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método não permitido" }, 405);

  try {
    const body = (await req.json().catch(() => null)) as Body | null;
    if (!body) return json({ error: "JSON inválido" }, 400);
    const erro = validar(body);
    if (erro) return json({ error: erro }, 400);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const orderNsu = `CS_${body.equipe_id.slice(0, 8)}_${Date.now()}`;
    const valorCents = Math.round(body.valor * 100);
    const redirectUrl = `${BASE_URL}/campeonato/inscricao?order_nsu=${orderNsu}&equipe_id=${body.equipe_id}`;

    // Mesma API pública usada em create-checkout (sem API key)
    const ipRes = await fetch(
      "https://api.infinitepay.io/invoices/public/checkout/links",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: INFINITEPAY_HANDLE,
          items: [
            {
              quantity: 1,
              price: valorCents,
              description: `Inscrição ${body.equipe_nome} - 3º Campeonato CS Regional`,
            },
          ],
          order_nsu: orderNsu,
          redirect_url: redirectUrl,
          customer: {
            name: body.equipe_nome,
            email: body.capitao_email,
            phone: body.capitao_telefone,
          },
        }),
      }
    );

    const ipData = await ipRes.json().catch(() => ({}));

    if (!ipRes.ok || !ipData.url) {
      console.error("InfinitePay error:", ipRes.status, ipData);
      return json({ error: "Erro ao gerar link de pagamento", details: ipData }, 502);
    }

    const checkoutUrl: string = ipData.url;

    const { error: dbErr } = await supabase.from("pagamentos").insert({
      equipe_id: body.equipe_id,
      valor: body.valor,
      metodo: body.metodo,
      status: "pendente",
      infinitepay_transaction_id: orderNsu,
      infinitepay_checkout_url: checkoutUrl,
    });

    if (dbErr) {
      console.error("Erro ao salvar pagamento:", dbErr);
      return json({ error: "Erro ao salvar pagamento", details: dbErr.message }, 500);
    }

    // O checkout público da InfinitePay já oferece PIX/cartão/link na mesma URL.
    // Retornamos checkout_url para todos os métodos.
    return json({
      status: "pendente",
      checkout_url: checkoutUrl,
      transaction_id: orderNsu,
    });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return json({ error: "Erro interno do servidor" }, 500);
  }
});
