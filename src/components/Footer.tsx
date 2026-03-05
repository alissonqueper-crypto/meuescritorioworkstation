import { MessageCircle, Instagram, Facebook, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const WHATSAPP_URL =
"https://api.whatsapp.com/send/?phone=554999472868&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+Meu+Escritorio+-+Workstation.&type=phone_number&app_absent=0";
const ADDRESS = "Rua Vinte e Cinco de Março, 148 - Centro, Caçador - SC, 89500-061";
const CNPJ = "00.000.000/0001-00"; // TODO: Editar CNPJ
const INSTAGRAM_URL = "https://www.instagram.com/meu.escritorio.ws/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61583799449147&locale=pt_BR";

const Footer = () =>
<footer className="bg-card border-t border-border">
    {/* Brand separator gradient */}
    <div className="brand-separator w-full" />

    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Brand */}
        <div>
          <img src={logo} alt="Meu Escritório – Workstation" className="h-10 md:h-14 w-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Coworking em Caçador – SC reunindo profissionais de tecnologia (OMIE), contabilidade, marketing digital e inteligência artificial. Salas de reunião por hora.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Contato</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-red shrink-0" />
              <span>{ADDRESS}</span>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-teal transition-colors">
              <Phone className="w-4 h-4 text-brand-blue" /> (49) 99947-2868
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Redes Sociais</h4>
          <div className="flex gap-3">
            

          
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-brand-red/20 transition-colors text-muted-foreground hover:text-brand-red">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-brand-blue/20 transition-colors text-muted-foreground hover:text-brand-blue">
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
  </footer>;


export default Footer;