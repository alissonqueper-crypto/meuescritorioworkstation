import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

/* ============================================
 * CONFIGURAÇÃO: Link do WhatsApp
 * ============================================ */
const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554999472868&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+Meu+Escritorio+-+Workstation.&type=phone_number&app_absent=0";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/planos", label: "Planos" },
  { to: "/estrutura", label: "Estrutura" },
  { to: "/eventos/corrida-de-bar-em-bar", label: "Eventos" },
  { to: "/contato", label: "Contato" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg md:text-xl tracking-tight">
          <span className="text-primary">Meu Escritório</span>
          <span className="text-muted-foreground"> – WORKSTATION</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="sm" className="hidden sm:inline-flex">
              <MessageCircle className="w-4 h-4" /> Fale no WhatsApp
            </Button>
          </a>
          <button
            className="md:hidden p-2 rounded-md hover:bg-secondary text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-background/98 backdrop-blur-md border-t border-border animate-reveal-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === l.to
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-2">
              <Button variant="whatsapp" className="w-full">
                <MessageCircle className="w-4 h-4" /> Fale no WhatsApp
              </Button>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
