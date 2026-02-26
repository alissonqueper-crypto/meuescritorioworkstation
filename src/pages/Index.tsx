import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wifi, Users, Coffee, MapPin, Thermometer, Building2, ArrowRight, Calendar, Code, Calculator, Megaphone, Brain } from "lucide-react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LampContainer } from "@/components/ui/lamp";
import logoImg from "@/assets/logo.png";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554999472868&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+Meu+Escritorio+-+Workstation.&type=phone_number&app_absent=0";

const ScrollSection = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id={id} ref={ref} className={`py-10 md:py-24 px-4 transition-all duration-700 ${isVisible ? "scroll-visible" : "scroll-hidden"} ${className}`}>
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>
  );
};

const brandColors = [
  "text-brand-red",
  "text-brand-blue",
  "text-brand-teal",
  "text-brand-gold",
  "text-brand-red",
  "text-brand-blue",
];
const brandBgs = [
  "bg-brand-red/10",
  "bg-brand-blue/10",
  "bg-brand-teal/10",
  "bg-brand-gold/10",
  "bg-brand-red/10",
  "bg-brand-blue/10",
];

const benefits = [
  { icon: Wifi, title: "Internet Ultra Rápida", desc: "Fibra óptica dedicada para sua produtividade." },
  { icon: Users, title: "Salas de Reunião", desc: "Espaços privativos equipados com TV e quadro branco, aluguel por hora." },
  { icon: Coffee, title: "Cozinha Compartilhada", desc: "Café, micro-ondas e geladeira sempre disponíveis." },
  { icon: Building2, title: "Networking Multidisciplinar", desc: "Trabalhe ao lado de profissionais de tecnologia, contabilidade, marketing e IA." },
  { icon: Thermometer, title: "Ambiente Climatizado", desc: "Ar-condicionado em todos os espaços do coworking." },
  { icon: MapPin, title: "Localização Central", desc: "No coração de Caçador – SC, fácil acesso." },
];

const residents = [
  { icon: Code, title: "Software Empresarial (OMIE)", desc: "Implementação e suporte do sistema de gestão OMIE para empresas da região.", color: "text-brand-red", bg: "bg-brand-red/10" },
  { icon: Calculator, title: "Contabilidade", desc: "Escritório contábil completo com atendimento presencial e digital para sua empresa.", color: "text-brand-blue", bg: "bg-brand-blue/10" },
  { icon: Megaphone, title: "Marketing Digital & Social Media", desc: "Agência completa de marketing digital, gestão de redes sociais e criação de conteúdo.", color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { icon: Brain, title: "Inteligência Artificial", desc: "Equipe especializada em desenvolvimento de soluções de IA sob medida para empresas.", color: "text-brand-gold", bg: "bg-brand-gold/10" },
];

const officeSpaces = [
  {
    name: "Sala de Reunião 1",
    designation: "Aluguel por hora · Até 8 pessoas",
    quote: "Sala equipada com TV para apresentações e videoconferências, quadro branco, ar-condicionado e café incluso. Ideal para reuniões com clientes.",
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
    quote: "Mesas ergonômicas com monitor, cadeira confortável e tomadas. Trabalhe ao lado de profissionais de tecnologia, contabilidade, marketing e IA.",
    src: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Visão Geral do Escritório",
    designation: "Ambiente moderno e climatizado",
    quote: "Espaço completo com internet ultra rápida, cozinha compartilhada, recepção e áreas de convivência. Tudo pensado para sua produtividade.",
    src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop&q=80",
  },
];

const Index = () => {
  return (
    <div>
      {/* ============ HERO ============ */}
      <div className="relative">
        <LampContainer>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center text-center"
          >
            <img src={logoImg} alt="Meu Escritório Workstation" className="w-72 md:w-96 mb-6" />

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="lg" className="w-full sm:w-auto mb-4 md:mb-0">Conhecer planos no WhatsApp</Button>
            </a>
          </motion.div>
        </LampContainer>

        {/* Badges nos cantos inferiores */}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-50 flex flex-col items-center gap-1 px-4">
          <div className="flex gap-2 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-red/30 bg-brand-red/10 text-brand-red text-[10px] md:text-xs font-semibold">
              Coworking Premium
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-teal/30 bg-brand-teal/10 text-brand-teal text-[10px] md:text-xs font-semibold">
              Caçador – SC
            </span>
          </div>
          <p className="text-[10px] md:text-sm text-muted-foreground text-center">
            Tecnologia · Contabilidade · Marketing · IA
          </p>
        </div>
      </div>

      <div className="brand-separator w-full" />

      {/* ============ BENEFÍCIOS ============ */}
      <ScrollSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Por que escolher nosso <span className="text-brand-gradient">Workstation</span>?
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
          Tudo que você precisa para trabalhar com conforto, foco e conexão.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`bg-card border border-border rounded-2xl p-4 md:p-6 brand-card group stagger-${i + 1}`}
              style={{ animationFillMode: "both" }}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${brandBgs[i]} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <b.icon className={`w-5 h-5 md:w-6 md:h-6 ${brandColors[i]}`} />
              </div>
              <h3 className="font-semibold text-sm md:text-lg mb-2">{b.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* ============ QUEM TRABALHA AQUI ============ */}
      <ScrollSection className="bg-card/50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Quem <span className="text-brand-gradient">Trabalha Aqui</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
          Profissionais de diversas áreas reunidos em um só lugar, prontos para atender sua empresa.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {residents.map((r, i) => (
            <div
              key={r.title}
              className={`bg-card border border-border rounded-2xl p-4 md:p-6 brand-card group stagger-${i + 1}`}
              style={{ animationFillMode: "both" }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl ${r.bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                  <r.icon className={`w-5 h-5 md:w-7 md:h-7 ${r.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* ============ NOSSOS ESPAÇOS ============ */}
      <ScrollSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Nossos <span className="text-brand-gradient">Espaços</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
          Conheça nossa estrutura pensada para sua produtividade e conforto.
        </p>
        <CircularTestimonials
          testimonials={officeSpaces}
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
        <div className="text-center mt-8">
          <Link to="/estrutura">
            <Button variant="outline">Ver mais detalhes <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
      </ScrollSection>

      {/* ============ LOCALIZAÇÃO ============ */}
      <ScrollSection className="bg-card/50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Localização</h2>
        <p className="text-center text-muted-foreground mb-8">Rua Exemplo, 123 – Centro, Caçador – SC</p>
        <div className="rounded-2xl overflow-hidden border border-border aspect-video min-h-[250px] max-w-4xl mx-auto">
          <iframe
            src="https://maps.google.com/maps?q=Caçador,SC,Brazil&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Localização"
          />
        </div>
      </ScrollSection>

      {/* ============ EVENTOS ============ */}
      <ScrollSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Eventos & <span className="text-brand-gradient">Comunidade</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12">Nosso coworking é palco de eventos incríveis.</p>
        <div className="max-w-2xl mx-auto">
          <div className="bg-neon-card rounded-2xl p-6 md:p-8 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-neon-pink" />
              <span className="text-xs font-semibold text-neon-purple uppercase tracking-wider">Evento em Destaque</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-neon-gradient mb-3">
              Corrida de Bar em Bar
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              A corrida mais insana de Caçador! Percorra os melhores bares da cidade em uma noite épica de diversão, drinks e prêmios.
            </p>
            <Link to="/eventos/corrida-de-bar-em-bar">
              <Button variant="neon" size="lg" className="w-full sm:w-auto">
                Ver página do evento <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </ScrollSection>
    </div>
  );
};

export default Index;
