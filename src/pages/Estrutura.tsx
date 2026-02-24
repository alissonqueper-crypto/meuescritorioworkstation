import { Monitor, Users, Coffee, Armchair, DoorOpen, Sofa } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ============================================
 * CONFIGURAÇÃO: Estrutura do coworking
 * Substitua os placeholders por fotos reais
 * ============================================ */
const spaces = [
  { icon: Monitor, name: "Estações de Trabalho", desc: "Mesas ergonômicas com monitor, cadeira confortável e tomadas." },
  { icon: Users, name: "Salas de Reunião", desc: "Salas privativas com TV, quadro branco e videoconferência." },
  { icon: Coffee, name: "Copa & Cozinha", desc: "Espaço com micro-ondas, geladeira, café e água filtrada." },
  { icon: Armchair, name: "Área Comum", desc: "Ambiente descontraído para pausas e networking." },
  { icon: DoorOpen, name: "Recepção", desc: "Recepção moderna com atendimento dedicado." },
  { icon: Sofa, name: "Lounge", desc: "Sofás confortáveis para reuniões informais e descanso." },
];

const ScrollDiv = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "scroll-visible" : "scroll-hidden"} ${className}`}>
      {children}
    </div>
  );
};

const Estrutura = () => (
  <div className="pt-24 pb-16 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nossa <span className="text-primary">Estrutura</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Conheça cada detalhe do nosso espaço pensado para sua produtividade e conforto.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((s) => (
          <ScrollDiv key={s.name}>
            <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/40 transition-all duration-300">
              {/* TODO: Substituir por imagem real */}
              <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <s.icon className="w-16 h-16 text-muted-foreground/20" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{s.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </ScrollDiv>
        ))}
      </div>
    </div>
  </div>
);

export default Estrutura;
