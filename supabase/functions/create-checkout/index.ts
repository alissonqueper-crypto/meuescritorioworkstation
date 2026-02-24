import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INFINITEPAY_HANDLE = "meu-escritorio";
const REDIRECT_URL =
  "https://id-preview--e85e8ef7-fc93-426e-bd9b-2ccba3a1ae87.lovable.app/eventos/corrida-de-bar-em-bar/sucesso";

const TICKET_PRICES: Record<string, { price: number; description: string }> = {
  masculino: { price: 11000, description: "Ingresso Corrida de Bar em Bar - Masculino" },
  feminino: { price: 5500, description: "Ingresso Corrida de Bar em Bar - Feminino" },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, telefone, numero_placa, tipo_ingresso } = await req.json();

    // Validate input
    if (!nome || !telefone || !numero_placa || !tipo_ingresso) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios: nome, telefone, numero_placa, tipo_ingresso" }),
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

    // Save to database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("inscricoes").insert({
      nome,
      telefone,
      numero_placa,
      tipo_ingresso,
      valor_pago: ticket.price,
      order_nsu: orderNsu,
      status_pagamento: "pendente",
    });

    if (dbError) {
      console.error("DB Error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar inscrição." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create InfinitePay checkout link
    const redirectWithOrder = `${REDIRECT_URL}?order_nsu=${orderNsu}`;

    const infinitePayResponse = await fetch(
      "https://api.infinitepay.io/invoices/public/checkout/links",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: INFINITEPAY_HANDLE,
          items: [{ quantity: 1, price: ticket.price, description: ticket.description }],
          order_nsu: orderNsu,
          redirect_url: redirectWithOrder,
        }),
      }
    );

    const infinitePayData = await infinitePayResponse.json();

    if (!infinitePayResponse.ok || !infinitePayData.checkout_url) {
      console.error("InfinitePay Error:", infinitePayData);
      return new Response(
        JSON.stringify({ error: "Erro ao gerar link de pagamento.", details: infinitePayData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ checkout_url: infinitePayData.checkout_url, order_nsu: orderNsu }),
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
