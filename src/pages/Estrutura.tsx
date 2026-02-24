import { Monitor, Users, Coffee, Armchair, DoorOpen, Sofa } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MediaGallery from "@/components/MediaGallery";

const spaces = [
  { icon: Monitor, name: "Estações de Trabalho", desc: "Mesas ergonômicas com monitor, cadeira confortável e tomadas.", color: "text-brand-red", bg: "bg-brand-red/10" },
  { icon: Users, name: "Salas de Reunião", desc: "Salas privativas com TV, quadro branco e videoconferência.", color: "text-brand-blue", bg: "bg-brand-blue/10" },
  { icon: Coffee, name: "Copa & Cozinha", desc: "Espaço com micro-ondas, geladeira, café e água filtrada.", color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { icon: Armchair, name: "Área Comum", desc: "Ambiente descontraído para pausas e networking.", color: "text-brand-gold", bg: "bg-brand-gold/10" },
  { icon: DoorOpen, name: "Recepção", desc: "Recepção moderna com atendimento dedicado.", color: "text-brand-red", bg: "bg-brand-red/10" },
  { icon: Sofa, name: "Lounge", desc: "Sofás confortáveis para reuniões informais e descanso.", color: "text-brand-blue", bg: "bg-brand-blue/10" },
];

const ScrollDiv = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "scroll-visible" : "scroll-hidden"} ${className}`}>
      {children}
    </div>
  );
};

/* TODO: Adicione fotos reais aqui */
const galleryItems: { type: "image" | "video"; src: string; alt?: string; embedUrl?: string }[] = [];

const Estrutura = () => (
  <div className="pt-24 pb-16 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nossa <span className="text-brand-gradient">Estrutura</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Conheça cada detalhe do nosso espaço pensado para sua produtividade e conforto.
        </p>
        <div className="brand-separator w-24 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((s, i) => (
          <ScrollDiv key={s.name}>
            <div className={`bg-card border border-border rounded-2xl overflow-hidden brand-card stagger-${i + 1}`}>
              {/* TODO: Substituir por imagem real */}
              <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <s.icon className="w-16 h-16 text-muted-foreground/20" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <h3 className="font-semibold">{s.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </ScrollDiv>
        ))}
      </div>

      {/* Galeria de fotos e vídeos */}
      <ScrollDiv className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          Galeria de <span className="text-brand-gradient">Fotos & Vídeos</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">Veja nosso espaço por dentro.</p>
        <MediaGallery items={galleryItems} columns={3} />
      </ScrollDiv>
    </div>
  </div>
);

export default Estrutura;
