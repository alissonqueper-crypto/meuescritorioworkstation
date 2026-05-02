import { Instagram, Youtube, Twitch, MessageCircle } from "lucide-react";

export default function CSFooter() {
  return (
    <footer className="relative z-[2] border-t border-cs bg-cs-bg-secondary mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-cs-display text-xl font-extrabold tracking-wider">
            CS <span className="text-cs-orange">REGIONAL</span>
          </div>
          <p className="mt-3 text-sm text-cs-text-secondary max-w-sm">
            3º Campeonato de CS Regional — disputa MD1 nos grupos, MD3 nas eliminatórias.
            Premiação total a partir de R$ 650,00.
          </p>
        </div>

        <div>
          <h4 className="font-cs-display uppercase text-sm tracking-widest text-cs-text-primary mb-3">
            Realização
          </h4>
          <p className="text-sm text-cs-text-secondary">
            Evento realizado pela plataforma{" "}
            <span className="text-cs-orange font-semibold">GC — Game Changers</span>
          </p>
        </div>

        <div>
          <h4 className="font-cs-display uppercase text-sm tracking-widest text-cs-text-primary mb-3">
            Redes
          </h4>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram", href: "#" },
              { Icon: Youtube, label: "YouTube", href: "#" },
              { Icon: Twitch, label: "Twitch", href: "#" },
              { Icon: MessageCircle, label: "Discord", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-md border border-cs flex items-center justify-center text-cs-text-secondary hover:text-cs-orange hover:border-cs-orange transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-cs">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-cs-text-secondary flex justify-between">
          <span>© {new Date().getFullYear()} CS Regional</span>
          <span className="font-cs-num">v3.0</span>
        </div>
      </div>
    </footer>
  );
}
