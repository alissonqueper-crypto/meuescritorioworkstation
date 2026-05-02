import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INFINITEPAY_HANDLE = "meu-escritorio";
const BASE_URL = "https://meuescritorioworkstation.lovable.app";

interface Body {
  equipe_id?: string;
  valor?: number;
  metodo?: "pix" | "cartao_credito" | "link";
  equipe_nome?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body: Body = await req.json();
    const { equipe_id, valor, metodo, equipe_nome } = body;

    if (!equipe_id || !valor || !metodo) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios: equipe_id, valor, metodo" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!["pix", "cartao_credito", "link"].includes(metodo)) {
      return new Response(
        JSON.stringify({ error: "metodo inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const orderNsu = `CSREG_${equipe_id.slice(0, 8)}_${Date.now()}`;
    const redirectUrl = `${BASE_URL}/campeonato/equipes?order_nsu=${orderNsu}`;
    const priceCents = Math.round(Number(valor) * 100);

    let checkoutUrl: string | null = null;
    let pixCopiaCola: string | null = null;

    // Cria link de checkout no InfinitePay (todos os métodos passam pelo mesmo link público)
    const ipResp = await fetch("https://api.infinitepay.io/invoices/public/checkout/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        handle: INFINITEPAY_HANDLE,
        items: [{
          quantity: 1,
          price: priceCents,
          description: `Inscrição CS Regional - ${equipe_nome ?? equipe_id.slice(0, 8)}`,
        }],
        order_nsu: orderNsu,
        redirect_url: redirectUrl,
      }),
    });
    const ipData = await ipResp.json();
    if (!ipResp.ok || !ipData.url) {
      console.error("InfinitePay error", ipData);
      return new Response(
        JSON.stringify({ error: "Erro ao gerar link de pagamento", details: ipData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    checkoutUrl = ipData.url;

    // Para o método 'pix' devolvemos o copia-cola se a API retornar; senão usamos o link
    if (metodo === "pix" && (ipData.pix_copy_paste || ipData.pix?.copy_paste)) {
      pixCopiaCola = ipData.pix_copy_paste ?? ipData.pix?.copy_paste ?? null;
    }

    // Registra pagamento no banco
    const { error: insErr } = await supabase.from("pagamentos").insert({
      equipe_id,
      valor: Number(valor),
      metodo,
      status: "pendente",
      infinitepay_checkout_url: checkoutUrl,
      pix_copia_cola: pixCopiaCola,
    });
    if (insErr) console.error("Erro ao registrar pagamento", insErr);

    return new Response(
      JSON.stringify({
        order_nsu: orderNsu,
        checkout_url: checkoutUrl,
        pix_copia_cola: pixCopiaCola,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Unexpected", err);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
