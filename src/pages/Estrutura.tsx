import { Monitor, Users, Coffee, Armchair, DoorOpen, Sofa } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

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
    desc: "Mesas ergonômicas com monitor, cadeira confortável e tomadas.",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    photos: [
      { name: "Mesa Individual", designation: "Plano mensal", quote: "Mesa ergonômica com monitor dedicado, cadeira confortável e tomadas individuais para máxima produtividade.", src: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=80" },
      { name: "Área de Trabalho Compartilhada", designation: "Hot desk disponível", quote: "Ambiente aberto e colaborativo ao lado de profissionais de tecnologia, contabilidade, marketing e IA.", src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop&q=80" },
      { name: "Estação Premium", designation: "Plano fixo", quote: "Estação dedicada com gaveta, monitor ultrawide e cadeira ergonômica de alto padrão.", src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80" },
    ],
  },
  {
    icon: Users,
    name: "Salas de Reunião",
    desc: "Equipadas com TV, quadro branco e videoconferência.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    photos: [
      { name: "Sala Executiva", designation: "Até 8 pessoas", quote: "Sala equipada com TV 55\" para apresentações e videoconferências, quadro branco e ar-condicionado.", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80" },
      { name: "Sala de Equipe", designation: "Até 6 pessoas", quote: "Espaço intimista com TV e conexão de alta velocidade. Perfeito para calls e reuniões de equipe.", src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80" },
      { name: "Sala de Conferência", designation: "Até 12 pessoas", quote: "Nossa maior sala com layout flexível, projeção e som integrado para workshops e treinamentos.", src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=80" },
    ],
  },
  {
    icon: Coffee,
    name: "Copa & Cozinha",
    desc: "Espaço compartilhado com café, micro-ondas e geladeira.",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
    photos: [
      { name: "Área do Café", designation: "Café premium incluso", quote: "Máquina de café expresso, chás variados e água filtrada disponíveis o dia todo para os coworkers.", src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80" },
      { name: "Cozinha Compartilhada", designation: "Equipada e limpa", quote: "Micro-ondas, geladeira, pia e utensílios básicos para suas refeições durante o expediente.", src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80" },
      { name: "Mesa de Refeições", designation: "Almoço no escritório", quote: "Espaço confortável para refeições com mesa ampla e ambiente agradável.", src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&auto=format&fit=crop&q=80" },
    ],
  },
  {
    icon: Armchair,
    name: "Área Comum",
    desc: "Ambiente descontraído para pausas e networking.",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    photos: [
      { name: "Espaço de Convivência", designation: "Networking natural", quote: "Ambiente descontraído para pausas e conversas entre profissionais de diversas áreas.", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80" },
      { name: "Área de Descompressão", designation: "Relaxe e recarregue", quote: "Espaço pensado para pausas produtivas com poltronas confortáveis e iluminação suave.", src: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800&auto=format&fit=crop&q=80" },
      { name: "Espaço Colaborativo", designation: "Ideias e criatividade", quote: "Mesas informais para brainstorming, reuniões rápidas e troca de ideias entre coworkers.", src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80" },
    ],
  },
  {
    icon: DoorOpen,
    name: "Recepção",
    desc: "Recepção moderna com atendimento dedicado.",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    photos: [
      { name: "Recepção Principal", designation: "Primeiro contato", quote: "Recepção moderna e acolhedora com atendimento dedicado para você e seus visitantes.", src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80" },
      { name: "Área de Espera", designation: "Conforto para visitantes", quote: "Espaço confortável para seus clientes e visitantes aguardarem com café e Wi-Fi disponível.", src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80" },
      { name: "Hall de Entrada", designation: "Identidade profissional", quote: "Ambiente profissional que transmite credibilidade e seriedade para seus clientes.", src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80" },
    ],
  },
  {
    icon: Sofa,
    name: "Lounge",
    desc: "Sofás confortáveis para reuniões informais e descanso.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    photos: [
      { name: "Lounge Principal", designation: "Conforto e estilo", quote: "Sofás confortáveis em ambiente climatizado para reuniões informais, leitura e descanso.", src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80" },
      { name: "Área de Descanso", designation: "Recarregue energias", quote: "Espaço reservado para momentos de descanso com iluminação suave e poltronas reclináveis.", src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80" },
      { name: "Lounge de Networking", designation: "Conexões profissionais", quote: "Ambiente descontraído ideal para conversas de negócios, happy hours e eventos de networking.", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80" },
    ],
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

      {/* Galeria de fotos geral */}
      <ScrollDiv>
        <h2 className="text-3xl font-bold text-center mb-4">
          Galeria de <span className="text-brand-gradient">Fotos</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">Veja nosso espaço por dentro.</p>
        <CircularTestimonials testimonials={gallerySpaces} autoplay colors={carouselColors} />
      </ScrollDiv>

      {/* 6 blocos de carrosséis */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          Conheça Nossos <span className="text-brand-gradient">Espaços</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">Explore cada ambiente do escritório em detalhes.</p>

        {structureBlocks.map((block, i) => (
          <ScrollDiv key={block.name} className={i > 0 ? "mt-16" : ""}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl ${block.bg} flex items-center justify-center`}>
                <block.icon className={`w-5 h-5 ${block.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{block.name}</h3>
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
