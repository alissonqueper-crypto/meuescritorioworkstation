import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INFINITEPAY_HANDLE = "meu-escritorio";
const HOURS_48 = 48 * 60 * 60 * 1000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let orderNsu: string | null = null;
    try {
      const body = await req.json();
      orderNsu = body.order_nsu || null;
    } catch {
      // No body = batch mode
    }

    // Fetch pending inscricoes
    let query = supabase
      .from("inscricoes")
      .select("id, order_nsu, created_at")
      .eq("status_pagamento", "pendente")
      .not("order_nsu", "is", null);

    if (orderNsu) {
      query = query.eq("order_nsu", orderNsu);
    }

    const { data: pendentes, error: fetchError } = await query;

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Erro ao buscar inscrições pendentes." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let aprovados = 0;
    let expirados = 0;
    let ainda_pendentes = 0;

    for (const inscricao of pendentes || []) {
      try {
        const res = await fetch(
          "https://api.infinitepay.io/invoices/public/checkout/payment_check",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              handle: INFINITEPAY_HANDLE,
              order_nsu: inscricao.order_nsu,
            }),
          }
        );

        const data = await res.json();
        console.log(`InfinitePay response for ${inscricao.order_nsu}:`, JSON.stringify(data));

        if (data.success === true) {
          await supabase
            .from("inscricoes")
            .update({ status_pagamento: "aprovado" })
            .eq("id", inscricao.id);
          aprovados++;
        } else {
          const age = Date.now() - new Date(inscricao.created_at).getTime();
          if (age > HOURS_48) {
            await supabase
              .from("inscricoes")
              .update({ status_pagamento: "expirado" })
              .eq("id", inscricao.id);
            expirados++;
          } else {
            ainda_pendentes++;
          }
        }
      } catch (err) {
        console.error(`Error checking ${inscricao.order_nsu}:`, err);
        ainda_pendentes++;
      }
    }

    // === DEDUPLICATION STEP ===
    let duplicatas_removidas = 0;

    if (!orderNsu) {
      // Only run dedup in batch mode
      const { data: allInscricoes } = await supabase
        .from("inscricoes")
        .select("id, nome, telefone, status_pagamento, created_at")
        .order("created_at", { ascending: false });

      if (allInscricoes && allInscricoes.length > 0) {
        // Group by normalized nome+telefone
        const groups = new Map<string, typeof allInscricoes>();
        
        for (const ins of allInscricoes) {
          const key = `${ins.nome.trim().toLowerCase()}|${ins.telefone.replace(/\D/g, "")}`;
          if (!groups.has(key)) {
            groups.set(key, []);
          }
          groups.get(key)!.push(ins);
        }

        for (const [, group] of groups) {
          if (group.length <= 1) continue;

          // Already sorted by created_at desc (newest first)
          const aprovado = group.find((g) => g.status_pagamento === "aprovado");
          
          let idsToDelete: string[];

          if (aprovado) {
            // Keep the approved one, delete all others
            idsToDelete = group.filter((g) => g.id !== aprovado.id).map((g) => g.id);
          } else {
            // Keep newest (index 0), delete the rest
            idsToDelete = group.slice(1).map((g) => g.id);
          }

          if (idsToDelete.length > 0) {
            const { error: delErr } = await supabase
              .from("inscricoes")
              .delete()
              .in("id", idsToDelete);

            if (delErr) {
              console.error(`Delete error for group:`, delErr);
            } else {
              duplicatas_removidas += idsToDelete.length;
            }
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ aprovados, expirados, ainda_pendentes, duplicatas_removidas }),
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
