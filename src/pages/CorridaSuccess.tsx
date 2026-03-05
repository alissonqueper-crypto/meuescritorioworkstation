import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, ArrowRight, MessageCircle, Loader2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554999472868&text=Ol%C3%A1%21+Acabei+de+comprar+meu+ingresso+para+a+Corrida+de+Bar+em+Bar.&type=phone_number&app_absent=0";

type PaymentStatus = "carregando" | "aprovado" | "pendente" | "expirado" | "erro";

const CorridaSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNsu = searchParams.get("order_nsu") || "N/A";
  const [status, setStatus] = useState<PaymentStatus>("carregando");
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    if (orderNsu === "N/A") {
      setStatus("erro");
      return;
    }

    const checkPayment = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("check-payments", {
          body: { order_nsu: orderNsu },
        });

        if (error) {
          console.error("Error checking payment:", error);
          setStatus("erro");
          return;
        }

        if (data.aprovados > 0) {
          setStatus("aprovado");
        } else if (data.expirados > 0) {
          setStatus("expirado");
        } else {
          setStatus("pendente");
          // Retry up to 5 times with 5s delay
          if (retries < 5) {
            setTimeout(() => setRetries((r) => r + 1), 5000);
          }
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setStatus("erro");
      }
    };

    checkPayment();
  }, [orderNsu, retries]);

  const isApproved = status === "aprovado";
  const isPending = status === "pendente" || status === "carregando";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neon-gradient">
      <div className="max-w-lg w-full text-center py-32">
        <div className="animate-reveal-up">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 animate-float ${
            isApproved ? "bg-[hsl(142,70%,45%,0.2)]" : 
            isPending ? "bg-[hsl(45,70%,45%,0.2)]" : "bg-[hsl(0,70%,45%,0.2)]"
          }`}>
            {isPending && <Loader2 className="w-10 h-10 text-[hsl(45,70%,50%)] animate-spin" />}
            {isApproved && <CheckCircle className="w-10 h-10 text-[hsl(142,70%,50%)]" />}
            {status === "expirado" && <Clock className="w-10 h-10 text-muted-foreground" />}
            {status === "erro" && <XCircle className="w-10 h-10 text-destructive" />}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-neon-gradient">
            {isApproved && "Pagamento Confirmado!"}
            {isPending && "Verificando Pagamento..."}
            {status === "expirado" && "Pagamento Expirado"}
            {status === "erro" && "Erro na Verificação"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {isApproved && (
              <>Seu ingresso para a <strong className="text-foreground">Corrida de Bar em Bar</strong> foi adquirido com sucesso!</>
            )}
            {isPending && "Estamos confirmando seu pagamento com a InfinitePay. Aguarde alguns instantes..."}
            {status === "expirado" && "O prazo para pagamento expirou. Faça uma nova inscrição."}
            {status === "erro" && "Não foi possível verificar o pagamento. Tente novamente mais tarde."}
          </p>

          <div className="bg-neon-card rounded-xl p-6 mb-8 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pedido</span>
              <span className="font-mono">{orderNsu}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className={`font-semibold capitalize ${
                isApproved ? "text-[hsl(142,70%,50%)]" :
                isPending ? "text-[hsl(45,70%,50%)]" : "text-muted-foreground"
              }`}>
                {status === "carregando" ? "Verificando..." : status}
              </span>
            </div>
          </div>

          {isApproved && (
            <div className="bg-neon-card rounded-xl p-6 mb-8 text-sm text-muted-foreground">
              <h3 className="font-semibold text-foreground mb-3">Próximos passos:</h3>
              <ul className="space-y-2 text-left">
                <li>✅ Guarde seu comprovante de pagamento</li>
                <li>📍 No dia do evento, vá ao ponto de concentração</li>
                <li>🎫 Apresente seu documento para retirar a pulseira</li>
                <li>🍻 Divirta-se com responsabilidade!</li>
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isApproved && (
              <Link to="/meu-ingresso">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  🎫 Ver meu ingresso
                </Button>
              </Link>
            )}
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
