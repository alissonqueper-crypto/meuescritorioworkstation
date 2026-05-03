import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";

const TARGET = new Date("2026-05-09T16:00:00-03:00").getTime();

function calc() {
  const ms = TARGET - Date.now();
  if (ms <= 0) return null;
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  };
}

const Countdown = () => {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);

  if (!t) {
    return (
      <div className="font-gta text-brand-red text-2xl md:text-3xl tracking-wider animate-pulse">
        EVENTO EM ANDAMENTO 🔴
      </div>
    );
  }

  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="bg-card border border-border rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[68px] md:min-w-[90px] text-center">
      <div className="font-display text-3xl md:text-5xl font-bold text-brand-red leading-none">
        {String(v).padStart(2, "0")}
      </div>
      <div className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-2">
        {l}
      </div>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-4 justify-center">
      <Box v={t.d} l="Dias" />
      <Box v={t.h} l="Horas" />
      <Box v={t.m} l="Min" />
      <Box v={t.s} l="Seg" />
    </div>
  );
};

const cards = [
  {
    icon: Calendar,
    title: "📅 DATAS",
    lines: [
      "09 e 16/05 → Fase de Grupos",
      "17/05 → Quartas de Final",
      "30/05 → Semifinal + Final",
    ],
  },
  {
    icon: Users,
    title: "👥 EQUIPES",
    lines: [
      "5 a 6 jogadores por equipe",
      "Até 16 vagas disponíveis",
      "Inscrição: R$ 40,00",
    ],
  },
  {
    icon: Trophy,
    title: "🏆 PREMIAÇÃO",
    lines: [
      "1º lugar: R$ 600,00",
      "Medalhas para o top 5",
      "Pela plataforma GC",
    ],
  },
];

export default function EventoCSBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12 md:py-20 px-4 bg-gradient-to-b from-background via-card/30 to-background"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/40 bg-brand-red/10 text-brand-red text-[11px] md:text-xs font-semibold tracking-wider uppercase">
            🎮 Evento Especial · Hosted by Workstation
          </span>
        </div>

        {/* Título */}
        <h2 className="font-gta-title text-center text-5xl md:text-7xl leading-[0.95] mb-4">
          <span className="block text-foreground">3º CAMPEONATO</span>
          <span className="block text-brand-red">DE CS REGIONAL</span>
        </h2>

        {/* Subtítulo */}
        <p className="text-center font-sans text-muted-foreground tracking-wide text-sm md:text-base mb-10 md:mb-14">
          Counter-Strike · Caçador-SC · Plataforma GC
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card border border-border rounded-2xl p-5 md:p-6 hover:border-brand-red/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <c.icon className="w-5 h-5 text-brand-red" />
                <h3 className="font-gta-title uppercase text-base md:text-lg tracking-wider text-foreground">
                  {c.title}
                </h3>
              </div>
              <ul className="space-y-1.5">
                {c.lines.map((l) => (
                  <li key={l} className="font-sans text-sm text-muted-foreground">
                    {l}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mb-8 md:mb-12">
          <p className="text-center font-gta uppercase text-xs md:text-sm tracking-[0.3em] text-muted-foreground mb-4">
            Início em
          </p>
          <Countdown />
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-6">
          <Link to="/campeonato/inscricao">
            <Button
              size="lg"
              className="bg-brand-red hover:bg-brand-red/90 text-white font-gta tracking-wider text-base md:text-lg px-8 py-6 rounded-xl shadow-lg shadow-brand-red/30"
            >
              INSCREVER MINHA EQUIPE <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center font-sans text-xs text-muted-foreground">
          Evento organizado e sediado no espaço Meu Escritório WORKSTATION · Caçador-SC
        </p>
      </div>
    </motion.section>
  );
}
