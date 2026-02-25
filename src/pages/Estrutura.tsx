import { Monitor, Users, Coffee, Armchair, DoorOpen, Sofa } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const spaces = [
  { icon: Monitor, name: "Estações de Trabalho", desc: "Mesas ergonômicas com monitor, cadeira confortável e tomadas — ao lado de profissionais de tecnologia, contabilidade, marketing e IA.", color: "text-brand-red", bg: "bg-brand-red/10" },
  { icon: Users, name: "Salas de Reunião", desc: "Aluguel por hora, equipadas com TV, quadro branco e videoconferência. Ideal para reuniões com clientes e apresentações.", color: "text-brand-blue", bg: "bg-brand-blue/10" },
  { icon: Coffee, name: "Copa & Cozinha", desc: "Espaço compartilhado com micro-ondas, geladeira, café e água filtrada.", color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { icon: Armchair, name: "Área Comum", desc: "Ambiente descontraído para pausas e networking entre profissionais de diversas áreas.", color: "text-brand-gold", bg: "bg-brand-gold/10" },
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

const gallerySpaces = [
  {
    name: "Sala de Reunião 1",
    designation: "Aluguel por hora · Até 8 pessoas",
    quote: "Sala equipada com TV para apresentações e videoconferências, quadro branco, ar-condicionado e café incluso.",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Sala de Reunião 2",
    designation: "Aluguel por hora · Até 6 pessoas",
    quote: "Espaço intimista com TV e conexão de alta velocidade. Perfeito para calls, entrevistas e reuniões de equipe.",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Sala de Reunião 3",
    designation: "Aluguel por hora · Até 12 pessoas",
    quote: "Nossa maior sala de conferência, com layout flexível, projeção e som integrado para workshops e treinamentos.",
    src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Mesas de Coworking",
    designation: "Planos mensais disponíveis",
    quote: "Mesas ergonômicas com monitor, cadeira confortável e tomadas. Networking multidisciplinar.",
    src: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Visão Geral do Escritório",
    designation: "Ambiente moderno e climatizado",
    quote: "Espaço completo com internet ultra rápida, cozinha compartilhada, recepção e áreas de convivência.",
    src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop&q=80",
  },
];

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
          Galeria de <span className="text-brand-gradient">Fotos</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">Veja nosso espaço por dentro.</p>
        <CircularTestimonials
          testimonials={gallerySpaces}
          autoplay
          colors={{
            name: "hsl(0, 85%, 60%)",
            designation: "hsl(174, 70%, 46%)",
            testimony: "hsl(0, 0%, 80%)",
            arrowBackground: "hsl(215, 55%, 47%)",
            arrowHoverBackground: "hsl(0, 85%, 50%)",
            arrowForeground: "#ffffff",
          }}
        />
      </ScrollDiv>
    </div>
  </div>
);

export default Estrutura;
