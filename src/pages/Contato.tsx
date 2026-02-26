import { useState } from "react";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554999472868&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+Meu+Escritorio+-+Workstation.&type=phone_number&app_absent=0";

const Contato = () => {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada! (frontend only – configurar backend)");
  };

  return (
    <div className="pt-20 md:pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Fale <span className="text-brand-gradient">Conosco</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Entre em contato pelo WhatsApp ou preencha o formulário abaixo.
          </p>
          <div className="brand-separator w-24 mx-auto mt-6" />
        </div>

        <div className="text-center mb-12">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="xl" className="w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
            </Button>
          </a>
        </div>

        <div ref={ref} className={`transition-all duration-700 ${isVisible ? "scroll-visible" : "scroll-hidden"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nome</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Mensagem</label>
                <textarea
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Enviar mensagem</Button>
            </form>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Endereço</h3>
                  <p className="text-sm text-muted-foreground">Rua Exemplo, 123 – Centro, Caçador – SC</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Telefone / WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">(49) 99947-2868</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">contato@meuescritorioworkstation.com.br</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
