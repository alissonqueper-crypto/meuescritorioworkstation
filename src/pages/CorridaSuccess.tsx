import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, ArrowRight, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554999472868&text=Ol%C3%A1%21+Acabei+de+comprar+meu+ingresso+para+a+Corrida+de+Bar+em+Bar.&type=phone_number&app_absent=0";

const CorridaSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNsu = searchParams.get("order_nsu") || "N/A";
  const [status, setStatus] = useState("carregando...");

  useEffect(() => {
    const updateStatus = async () => {
      if (orderNsu === "N/A") {
        setStatus("approved");
        return;
      }
      // Update payment status to approved
      const { error } = await supabase
        .from("inscricoes" as any)
        .update({ status_pagamento: "aprovado" } as any)
        .eq("order_nsu", orderNsu);

      if (error) {
        console.error("Error updating status:", error);
      }
      setStatus("aprovado");
    };
    updateStatus();
  }, [orderNsu]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neon-gradient">
      <div className="max-w-lg w-full text-center py-32">
        <div className="animate-reveal-up">
          <div className="w-20 h-20 mx-auto rounded-full bg-[hsl(142,70%,45%,0.2)] flex items-center justify-center mb-6 animate-float">
            <CheckCircle className="w-10 h-10 text-[hsl(142,70%,50%)]" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-neon-gradient">
            Pagamento Confirmado!
          </h1>
          <p className="text-muted-foreground mb-6">
            Seu ingresso para a <strong className="text-foreground">Corrida de Bar em Bar</strong> foi adquirido com sucesso!
          </p>

          <div className="bg-neon-card rounded-xl p-6 mb-8 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pedido</span>
              <span className="font-mono">{orderNsu}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-[hsl(142,70%,50%)] font-semibold capitalize">{status}</span>
            </div>
          </div>

          <div className="bg-neon-card rounded-xl p-6 mb-8 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground mb-3">Próximos passos:</h3>
            <ul className="space-y-2 text-left">
              <li>✅ Guarde seu comprovante de pagamento</li>
              <li>📍 No dia do evento, vá ao ponto de concentração</li>
              <li>🎫 Apresente seu documento para retirar a pulseira</li>
              <li>🍻 Divirta-se com responsabilidade!</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="w-4 h-4" /> Falar com a organização
              </Button>
            </a>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Voltar ao site <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorridaSuccess;
