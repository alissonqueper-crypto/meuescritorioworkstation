import { MessageCircle, Instagram, Facebook, MapPin, Phone } from "lucide-react";

/* ============================================
 * CONFIGURAÇÃO: Dados do footer
 * Edite endereço, CNPJ, redes sociais aqui
 * ============================================ */
const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554999472868&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+Meu+Escritorio+-+Workstation.&type=phone_number&app_absent=0";
const ADDRESS = "Rua Exemplo, 123 – Centro, Caçador – SC, 89500-000"; // TODO: Editar endereço
const CNPJ = "00.000.000/0001-00"; // TODO: Editar CNPJ
const INSTAGRAM_URL = "#"; // TODO: Editar link Instagram
const FACEBOOK_URL = "#"; // TODO: Editar link Facebook

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-bold text-lg mb-2">
            <span className="text-primary">Meu Escritório</span>
            <span className="text-muted-foreground"> – WORKSTATION</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Seu coworking moderno em Caçador – SC. Produtividade, criatividade e networking.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Contato</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <span>{ADDRESS}</span>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" /> (49) 99947-2868
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Redes Sociais</h4>
          <div className="flex gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors text-muted-foreground hover:text-primary">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors text-muted-foreground hover:text-primary">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors text-muted-foreground hover:text-primary">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Meu Escritório – WORKSTATION. Todos os direitos reservados.</p>
        <p className="mt-1">CNPJ: {CNPJ}</p>
      </div>
    </div>
  </footer>
);

export default Footer;
