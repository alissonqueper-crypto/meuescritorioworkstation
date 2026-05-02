import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Crosshair } from "lucide-react";

const links = [
  { to: "/campeonato", label: "Início", end: true },
  { to: "/campeonato/inscricao", label: "Inscrições" },
  { to: "/campeonato/chaveamento", label: "Chaveamento" },
  { to: "/campeonato/equipes", label: "Equipes" },
  { to: "/campeonato/contato", label: "Contato" },
];

export default function CSNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 20);
    onS();
    window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);
  useEffect(() => setOpen(false), [loc]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cs-bg-primary/95 backdrop-blur border-b border-cs"
          : "bg-cs-bg-primary/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link to="/campeonato" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-md border border-cs-orange flex items-center justify-center bg-cs-bg-secondary group-hover:shadow-[0_0_18px_hsl(var(--cs-accent-orange)/0.6)] transition">
            <Crosshair className="w-5 h-5 text-cs-orange" />
          </span>
          <div className="leading-none">
            <div className="font-cs-display font-extrabold text-lg tracking-wider text-cs-text-primary">
              CS <span className="text-cs-orange">REGIONAL</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-cs-text-secondary">3ª edição</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-cs-display uppercase text-sm tracking-wider transition ${
                  isActive
                    ? "text-cs-orange bg-cs-orange/10"
                    : "text-cs-text-secondary hover:text-cs-text-primary hover:bg-cs-bg-secondary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-cs-text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-cs-bg-primary border-t border-cs">
          <div className="px-4 py-3 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-md font-cs-display uppercase text-sm tracking-wider ${
                    isActive
                      ? "text-cs-orange bg-cs-orange/10"
                      : "text-cs-text-secondary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
