import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INFINITEPAY_HANDLE = "meu-escritorio";
const BASE_URL = "https://meuescritorioworkstation.lovable.app";

const TICKET_PRICES: Record<string, { price: number; description: string }> = {
  masculino: { price: 11000, description: "Ingresso Corrida de Bar em Bar - Masculino" },
  feminino: { price: 5500, description: "Ingresso Corrida de Bar em Bar - Feminino" },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tipo_ingresso } = await req.json();

    if (!tipo_ingresso) {
      return new Response(
        JSON.stringify({ error: "Campo obrigatório: tipo_ingresso" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ticket = TICKET_PRICES[tipo_ingresso];
    if (!ticket) {
      return new Response(
        JSON.stringify({ error: "Tipo de ingresso inválido. Use 'masculino' ou 'feminino'." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const orderNsu = `CORRIDA_${Date.now()}`;
    const redirectUrl = `${BASE_URL}/eventos/corrida-de-bar-em-bar/inscricao?order_nsu=${orderNsu}&tipo=${tipo_ingresso}`;

    // Create InfinitePay checkout link
    const infinitePayResponse = await fetch(
      "https://api.infinitepay.io/invoices/public/checkout/links",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: INFINITEPAY_HANDLE,
          items: [{ quantity: 1, price: ticket.price, description: ticket.description }],
          order_nsu: orderNsu,
          redirect_url: redirectUrl,
        }),
      }
    );

    const infinitePayData = await infinitePayResponse.json();

    if (!infinitePayResponse.ok || !infinitePayData.url) {
      console.error("InfinitePay Error:", infinitePayData);
      return new Response(
        JSON.stringify({ error: "Erro ao gerar link de pagamento.", details: infinitePayData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ checkout_url: infinitePayData.url, order_nsu: orderNsu }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
