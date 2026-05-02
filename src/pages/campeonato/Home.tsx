import { Link } from "react-router-dom";
import CampeonatoLayout from "./_layout";
import Countdown from "@/components/cs/Countdown";
import { Trophy, Users, Calendar, Crosshair, Zap } from "lucide-react";

export default function CampeonatoHome() {
  return (
    <CampeonatoLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 cs-grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-cs-bg-primary/40 via-transparent to-cs-bg-primary" aria-hidden />

        <div className="relative max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cs-orange/40 bg-cs-orange/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-cs-orange animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-cs-orange font-semibold">
              Inscrições abertas
            </span>
          </div>

          <h1 className="font-cs-display font-black uppercase leading-[0.95] text-4xl md:text-7xl cs-title-flicker">
            <span className="block text-cs-text-primary">3º Campeonato</span>
            <span className="block text-cs-orange">de CS Regional</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-cs-text-secondary text-base md:text-lg">
            16 equipes. 4 grupos. MD1 na fase de grupos, MD3 nas eliminatórias.
            Disputado na plataforma <span className="text-cs-orange font-semibold">GC</span>.
          </p>

          <div className="mt-10">
            <div className="text-xs uppercase tracking-[0.3em] text-cs-text-secondary mb-4">
              Início em
            </div>
            <Countdown targetISO="2026-05-09T16:00:00-03:00" />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/campeonato/inscricao" className="cs-btn cs-btn-primary cs-cta-pulse text-base">
              <Zap className="w-4 h-4" /> Inscrever Equipe
            </Link>
            <Link to="/campeonato/chaveamento" className="cs-btn cs-btn-outline text-base">
              Ver Chaveamento
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative max-w-6xl mx-auto px-4 -mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { Icon: Users, n: "16", l: "Equipes" },
          { Icon: Crosshair, n: "4", l: "Grupos" },
          { Icon: Calendar, n: "4", l: "Datas" },
          { Icon: Trophy, n: "R$ 650", l: "Premiação" },
        ].map(({ Icon, n, l }) => (
          <div key={l} className="cs-card p-4 md:p-5 flex items-center gap-3">
            <Icon className="w-6 h-6 text-cs-orange" />
            <div>
              <div className="font-cs-num text-2xl md:text-3xl text-cs-text-primary leading-none">{n}</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-cs-text-secondary mt-1">{l}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Info blocks */}
      <section className="max-w-6xl mx-auto px-4 mt-16 grid md:grid-cols-3 gap-4">
        {[
          {
            t: "Formato",
            d: "Fase de grupos em MD1 (4 grupos de 4). Quartas, semis e final em MD3.",
          },
          {
            t: "Inscrição",
            d: "R$ 40,00 por equipe (Lote 1). Pagamento via PIX, cartão ou link.",
          },
          {
            t: "Premiação",
            d: "1º lugar: R$ 600 · 2º lugar: R$ 50 · Troféu para o campeão.",
          },
        ].map((b) => (
          <div key={b.t} className="cs-card p-6">
            <h3 className="font-cs-display uppercase text-xl text-cs-orange mb-2">{b.t}</h3>
            <p className="text-cs-text-secondary text-sm leading-relaxed">{b.d}</p>
          </div>
        ))}
      </section>

      <div className="h-20" />
    </CampeonatoLayout>
  );
}
