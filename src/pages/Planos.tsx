import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554999472868&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+Meu+Escritorio+-+Workstation.&type=phone_number&app_absent=0";

/* ============================================
 * CONFIGURAÇÃO: Planos e valores
 * Edite nomes, preços, benefícios aqui
 * ============================================ */
const plans = [
  {
    name: "Diário",
    subtitle: "Para quem precisa de um dia produtivo",
    price: "R$ 49",
    period: "/dia",
    features: [
      "1 estação de trabalho compartilhada",
      "Internet fibra óptica",
      "Café e água inclusos",
      "Acesso das 8h às 18h",
      "Uso de áreas comuns",
    ],
    notIncluded: ["Sala de reunião", "Endereço fiscal", "Acesso 24h"],
    popular: false,
  },
  {
    name: "Mensal",
    subtitle: "Ideal para profissionais e freelancers",
    price: "R$ 499",
    period: "/mês",
    features: [
      "Estação de trabalho fixa",
      "Internet fibra óptica dedicada",
      "2h de sala de reunião por mês",
      "Café e água inclusos",
      "Acesso de segunda a sexta",
      "Armário individual",
    ],
    notIncluded: ["Endereço fiscal", "Acesso 24h"],
    popular: true,
  },
  {
    name: "Empresa",
    subtitle: "Para equipes e empresas",
    price: "R$ 899",
    period: "/mês",
    features: [
      "Sala privativa para equipe",
      "Internet dedicada",
      "6h de sala de reunião por mês",
      "Endereço fiscal incluso",
      "Café e água inclusos",
      "Acesso 24h, 7 dias por semana",
      "Armário individual por membro",
    ],
    notIncluded: [],
    popular: false,
  },
];

const ScrollSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "scroll-visible" : "scroll-hidden"} ${className}`}>
      {children}
    </div>
  );
};

const Planos = () => (
  <div className="pt-24 pb-16 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nossos <span className="text-primary">Planos</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Escolha o plano perfeito para o seu ritmo de trabalho. Todos incluem internet rápida e ambiente climatizado.
        </p>
      </div>

      <ScrollSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative bg-card border rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-xl ${
                p.popular ? "border-primary shadow-[0_0_40px_hsl(var(--primary)/0.15)] scale-[1.02]" : "border-border hover:border-primary/30"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Mais Popular
                </span>
              )}
              <h2 className="text-2xl font-bold mb-1">{p.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{p.subtitle}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">{p.price}</span>
                <span className="text-muted-foreground">{p.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="text-sm flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
                {p.notIncluded.map((f) => (
                  <li key={f} className="text-sm flex items-start gap-2 text-muted-foreground/50 line-through">
                    <span className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant={p.popular ? "accent" : "outline"} size="lg" className="w-full">
                  <MessageCircle className="w-4 h-4" /> Quero este plano
                </Button>
              </a>
            </div>
          ))}
        </div>
      </ScrollSection>
    </div>
  </div>
);

export default Planos;
