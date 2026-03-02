import { Monitor, Users, Coffee, Armchair, DoorOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import copa1 from "@/assets/copa-1.jpg";
import copa2 from "@/assets/copa-2.jpg";
import copa3 from "@/assets/copa-3.jpg";
import sala1 from "@/assets/sala-1.jpg";
import sala2 from "@/assets/sala-2.jpg";
import sala3 from "@/assets/sala-3.jpg";
import recepcao1 from "@/assets/recepcao-1.jpg";
import recepcao2 from "@/assets/recepcao-2.jpg";
import areaComum1 from "@/assets/area-comum-1.jpg";
import areaComum2 from "@/assets/area-comum-2.jpg";
import areaComum3 from "@/assets/area-comum-3.jpg";
import estacao1 from "@/assets/estacao-1.jpg";
import estacao2 from "@/assets/estacao-2.jpg";
import estacao3 from "@/assets/estacao-3.jpg";
import galeriaFachada from "@/assets/galeria-fachada.jpg";
import galeriaRecepcao from "@/assets/galeria-recepcao.jpg";
import galeriaRede from "@/assets/galeria-rede.jpg";
import galeriaCoworking from "@/assets/galeria-coworking.jpg";
import galeriaEstacao from "@/assets/galeria-estacao.jpg";
import galeriaEscritorio from "@/assets/galeria-escritorio.jpg";

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
    name: "Fachada",
    designation: "Entrada principal",
    quote: "Entrada imponente com letreiro Workstation e logos dos parceiros. Nosso espaço te recebe de portas abertas.",
    src: galeriaFachada,
  },
  {
    name: "Recepção & Lounge",
    designation: "Boas-vindas",
    quote: "Sofá confortável, TV de boas-vindas e logo na parede. Um ambiente acolhedor desde o primeiro passo.",
    src: galeriaRecepcao,
  },
  {
    name: "Rede Suspensa",
    designation: "Descompressão",
    quote: "Rede colorida iluminada com telão ao fundo — o cantinho perfeito para relaxar entre reuniões.",
    src: galeriaRede,
  },
  {
    name: "Coworking Noturno",
    designation: "Ambiente versátil",
    quote: "Estações de trabalho sob rede suspensa com iluminação noturna aconchegante e produtiva.",
    src: galeriaCoworking,
  },
  {
    name: "Estação de Trabalho",
    designation: "Produtividade",
    quote: "Mesas com divisória e cadeiras ergonômicas para foco total no seu trabalho.",
    src: galeriaEstacao,
  },
  {
    name: "Escritório Privativo",
    designation: "Privacidade",
    quote: "Sala privativa com mesa, estante e vista para o coworking. Ideal para quem precisa de silêncio e concentração.",
    src: galeriaEscritorio,
  },
];

const carouselColors = {
  name: "hsl(0, 85%, 60%)",
  designation: "hsl(174, 70%, 46%)",
  testimony: "hsl(0, 0%, 80%)",
  arrowBackground: "hsl(215, 55%, 47%)",
  arrowHoverBackground: "hsl(0, 85%, 50%)",
  arrowForeground: "#ffffff",
};

const structureBlocks = [
  {
    icon: Monitor,
    name: "Estações de Trabalho",
    desc: "Mesas ergonômicas com cadeira confortável e tomadas.",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    photos: [
      { name: "Mesa Individual", designation: "Plano mensal", quote: "Mesas ergonômicas com cadeira confortável e vista para a rua, ideais para máxima produtividade.", src: estacao1 },
      { name: "Estação Compartilhada", designation: "Hot desk disponível", quote: "Mesas com divisória para privacidade e cadeiras executivas, perfeitas para foco e colaboração.", src: estacao2 },
      { name: "Visão Geral do Coworking", designation: "Ambiente completo", quote: "Ambiente amplo com estações de trabalho, rede suspensa colorida e plantas decorativas.", src: estacao3 },
    ],
  },
  {
    icon: Users,
    name: "Salas de Reunião",
    desc: "Equipadas com TV, quadro branco e videoconferência.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    photos: [
      { name: "Sala Executiva", designation: "Mesa ampla com vista", quote: "Sala com mesa ampla, cadeira executiva e vista para a rua. Ideal para reuniões com clientes e videoconferências.", src: sala1 },
      { name: "Sala de Reunião Compacta", designation: "Reuniões intimistas", quote: "Espaço aconchegante com poltrona e cadeira, perfeito para calls, entrevistas e reuniões de equipe.", src: sala2 },
      { name: "Escritório Privativo", designation: "Estação completa", quote: "Escritório equipado com estante, mesa de trabalho e impressora. Ideal para quem precisa de privacidade e foco.", src: sala3 },
    ],
  },
  {
    icon: Coffee,
    name: "Copa & Cozinha",
    desc: "Espaço compartilhado com café, micro-ondas e geladeira.",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
    photos: [
      { name: "Copa & Recepção", designation: "Visão geral", quote: "Balcão com geladeira, canecas e tudo que você precisa para um café durante o expediente.", src: copa1 },
      { name: "Geladeira de Bebidas", designation: "Produtos disponíveis", quote: "Bebidas variadas disponíveis para compra, sempre geladas e prontas para consumo.", src: copa2 },
      { name: "Cozinha Compartilhada", designation: "Equipada e prática", quote: "Pia, purificador de água e utensílios básicos para suas refeições durante o expediente.", src: copa3 },
    ],
  },
  {
    icon: Armchair,
    name: "Área Comum",
    desc: "Ambiente descontraído para pausas e networking.",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    photos: [
      { name: "Rede Suspensa", designation: "Descompressão no mezanino", quote: "Rede colorida suspensa no mezanino com vista para o telão — o lugar perfeito para relaxar entre reuniões.", src: areaComum1 },
      { name: "Lounge", designation: "Sofás e TV", quote: "Sofás confortáveis com TV e banner do escritório para pausas, reuniões informais e networking.", src: areaComum2 },
      { name: "Deck de Lazer", designation: "Eventos e descontração", quote: "Espaço amplo com rede suspensa, telão e área versátil para eventos, happy hours e momentos de lazer.", src: areaComum3 },
    ],
  },
  {
    icon: DoorOpen,
    name: "Recepção",
    desc: "Recepção moderna com atendimento dedicado.",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    photos: [
      { name: "Recepção & Lounge", designation: "Boas-vindas", quote: "Sofá confortável, TV com mensagem de boas-vindas e vista para as salas de reunião.", src: recepcao1 },
      { name: "Área de Coworking", designation: "Estações de trabalho", quote: "Ambiente amplo e moderno com estações de trabalho, planta decorativa e teto com design diferenciado.", src: recepcao2 },
    ],
  },
];

const Estrutura = () => (
  <div className="pt-20 md:pt-24 pb-16 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Nossa <span className="text-brand-gradient">Estrutura</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Conheça cada detalhe do nosso espaço pensado para sua produtividade e conforto.
        </p>
        <div className="brand-separator w-24 mx-auto mt-6" />
      </div>

      {/* Galeria de fotos geral */}
      <ScrollDiv>
        <h2 className="text-3xl font-bold text-center mb-4">
          Galeria de <span className="text-brand-gradient">Fotos</span>
        </h2>
        <p className="text-center text-muted-foreground mb-6 md:mb-8">Veja nosso espaço por dentro.</p>
        <CircularTestimonials testimonials={gallerySpaces} autoplay colors={carouselColors} />
      </ScrollDiv>

      {/* 6 blocos de carrosséis */}
      <div className="mt-12 md:mt-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          Conheça Nossos <span className="text-brand-gradient">Espaços</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12">Explore cada ambiente do escritório em detalhes.</p>

        {structureBlocks.map((block, i) => (
          <ScrollDiv key={block.name} className={i > 0 ? "mt-10 md:mt-16" : ""}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl ${block.bg} flex items-center justify-center`}>
                <block.icon className={`w-5 h-5 ${block.color}`} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">{block.name}</h3>
                <p className="text-sm text-muted-foreground">{block.desc}</p>
              </div>
            </div>
            <CircularTestimonials testimonials={block.photos} autoplay colors={carouselColors} />
          </ScrollDiv>
        ))}
      </div>
    </div>
  </div>
);

export default Estrutura;
