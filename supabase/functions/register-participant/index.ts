import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TICKET_PRICES: Record<string, number> = {
  masculino: 110,
  feminino: 55,
};

const INFINITEPAY_HANDLE = "meu-escritorio";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { order_nsu, tipo_ingresso, nome, telefone, indicacao, check_only } = body;

    if (!order_nsu) {
      return new Response(
        JSON.stringify({ error: "order_nsu é obrigatório." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check for existing registration with this order_nsu
    const { data: existing } = await supabase
      .from("inscricoes")
      .select("id, nome, tipo_ingresso, numero_placa, status_pagamento")
      .eq("order_nsu", order_nsu)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({
          duplicate: true,
          inscricao: existing,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify payment with InfinitePay
    let paymentConfirmed = false;
    try {
      const res = await fetch(
        "https://api.infinitepay.io/invoices/public/checkout/payment_check",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            handle: INFINITEPAY_HANDLE,
            order_nsu: order_nsu,
          }),
        }
      );
      const paymentData = await res.json();
      console.log(`InfinitePay check for ${order_nsu}:`, JSON.stringify(paymentData));
      paymentConfirmed = paymentData.success === true;
    } catch (err) {
      console.error("InfinitePay check error:", err);
    }

    if (!paymentConfirmed) {
      return new Response(
        JSON.stringify({ error: "Pagamento não confirmado. Aguarde a confirmação ou tente novamente.", payment_not_confirmed: true }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If check_only mode, just return payment status
    if (check_only) {
      return new Response(
        JSON.stringify({ payment_confirmed: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields for registration
    if (!tipo_ingresso || !nome || !telefone) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios: tipo_ingresso, nome, telefone" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const valorPago = TICKET_PRICES[tipo_ingresso];
    if (!valorPago) {
      return new Response(
        JSON.stringify({ error: "Tipo de ingresso inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert inscription
    const { data: inscricao, error: dbError } = await supabase
      .from("inscricoes")
      .insert({
        nome,
        telefone,
        tipo_ingresso,
        valor_pago: valorPago,
        order_nsu,
        numero_placa: 0,
        status_pagamento: "aprovado",
        indicacao: indicacao || null,
      })
      .select("id")
      .single();

    if (dbError || !inscricao) {
      console.error("DB Error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar inscrição." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Assign participant number
    const { data: numeroDisponivel } = await supabase
      .from("numeros_participantes")
      .select("id, numero")
      .is("inscricao_id", null)
      .limit(1)
      .single();

    let numeroPlaca = 0;
    if (numeroDisponivel) {
      await supabase
        .from("numeros_participantes")
        .update({ inscricao_id: inscricao.id, atribuido_em: new Date().toISOString() })
        .eq("id", numeroDisponivel.id);

      numeroPlaca = numeroDisponivel.numero;
      await supabase
        .from("inscricoes")
        .update({ numero_placa: numeroPlaca })
        .eq("id", inscricao.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        inscricao_id: inscricao.id,
        numero_placa: numeroPlaca,
        nome,
        tipo_ingresso,
      }),
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
