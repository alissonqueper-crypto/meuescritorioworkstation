import { useState } from "react";
import {
  ArrowRight, Beer, Gift, Trophy, Music, MapPin, Clock, Shield, Users,
  ChevronDown, CreditCard, Calendar, Star, Zap, Check, Loader2, Timer, Route, Sticker, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import eventHeroImg from "@/assets/event-hero.jpg";

const ScrollSection = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id={id} ref={ref} className={`py-16 md:py-24 px-4 transition-all duration-700 ${isVisible ? "scroll-visible" : "scroll-hidden"} ${className}`}>
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>
  );
};

const tickets = [
  {
    id: "masculino",
    name: "Masculino",
    price: "R$ 110,00",
    desc: "Ingresso masculino – volume total: 2,2 litros no circuito.",
    features: ["Placa de identificação individual", "Mapa do circuito", "Copos em cada bar", "Adesivos de controle"],
    highlight: false,
  },
  {
    id: "feminino",
    name: "Feminino",
    price: "R$ 55,00",
    desc: "Ingresso feminino – volume total: 1,1 litro no circuito.",
    features: ["Placa de identificação individual", "Mapa do circuito", "Copos em cada bar", "Adesivos de controle"],
    highlight: true,
  },
];

const bars = [
  { num: 1, name: "Cena Indie Bar" },
  { num: 2, name: "Meu Escritório – Workstation" },
  { num: 3, name: "Oeste Pub" },
  { num: 4, name: "Galgo" },
  { num: 5, name: "Pix" },
  { num: 6, name: "Pulse" },
  { num: 7, name: "Império Hamburgueria" },
  { num: 8, name: "Bravo Pub" },
  { num: 9, name: "Kazah Oz" },
  { num: 10, name: "Garagem Bar e Lanchonete" },
  { num: 11, name: "O Boteco dos Amigos" },
];

const mesasDinamica = [
  { mesa: "1ª Mesa", copo: "300ml", adesivo: "Quadrado ■", color: "text-neon-purple" },
  { mesa: "2ª Mesa", copo: "200ml", adesivo: "Triângulo ▲", color: "text-neon-pink" },
  { mesa: "3ª Mesa", copo: "100ml ou shot", adesivo: "Bolinha ●", color: "text-neon-blue" },
  { mesa: "4ª Mesa", copo: "Passagem (sem consumo)", adesivo: "X ✕", color: "text-muted-foreground" },
];

const faq = [
  { q: "Qual a idade mínima para participar?", a: "É necessário ter 18 anos completos e apresentar documento com foto na retirada do kit." },
  { q: "O que está incluso no ingresso?", a: "Placa de identificação individual, mapa do circuito, copos em cada bar e adesivos de controle de passagem." },
  { q: "Quais formas de pagamento são aceitas?", a: "Pagamento online via InfinitePay: cartão de crédito, débito e Pix." },
  { q: "Posso transferir meu ingresso para outra pessoa?", a: "Sim, desde que informe a organização com antecedência." },
  { q: "Quantos bares fazem parte do circuito?", a: "São 11 bares participantes, com um percurso total de aproximadamente 2,5 km." },
  { q: "Qual o volume total de bebida no circuito?", a: "Masculino: 2,2 litros (300ml + 200ml por bar). Feminino: 1,1 litro (100ml + passagem por bar). A 4ª mesa é apenas passagem sem consumo." },
  { q: "Quanto tempo tenho para completar o circuito?", a: "O tempo máximo é de 2 horas a partir da largada às 17h." },
  { q: "Como funciona a validação nos bares?", a: "Em cada bar existem 4 mesas. Ao beber ou registrar passagem, você devolve o copo ao garçom e recebe um adesivo na placa. Sem devolver o copo, não recebe o adesivo." },
  { q: "E se chover?", a: "O evento acontece chuva ou sol. Os bares são ambientes cobertos." },
  { q: "Qual a política de reembolso?", a: "Reembolso integral até 7 dias antes do evento. Após, não haverá devolução." },
  { q: "Tem after party?", a: "Sim! Ao final do circuito, todos os participantes se encontram no local do after com DJ e sorteios." },
];

const CorridaDeBarEmBar = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", numero_placa: "" });
  const { toast } = useToast();

  const handleBuy = (ticketId: string) => {
    setSelectedTicket(ticketId);
    setForm({ nome: "", telefone: "", numero_placa: "" });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const placa = parseInt(form.numero_placa);
    if (isNaN(placa) || placa <= 0) {
      toast({ title: "Número de placa inválido", description: "Insira um número válido.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          nome: form.nome,
          telefone: form.telefone,
          numero_placa: placa,
          tipo_ingresso: selectedTicket,
        },
      });

      if (error || !data?.checkout_url) {
        throw new Error(data?.error || "Erro ao gerar link de pagamento.");
      }

      window.location.href = data.checkout_url;
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Não foi possível processar. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neon-gradient min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventHeroImg} alt="Corrida de Bar em Bar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-purple)/0.3)] to-[hsl(var(--neon-blue)/0.2)]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-5xl px-4 py-32 text-center">
          <div className="animate-reveal-up">
            <span className="inline-block bg-neon-card rounded-full px-4 py-1 text-xs font-semibold text-neon-pink uppercase tracking-widest mb-6">
              14 de Março de 2026 · Caçador/SC
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black mb-4 animate-neon-glow leading-tight">
              CORRIDA DE BAR<br />EM BAR
            </h1>
            <p className="text-sm md:text-base text-neon-purple font-semibold uppercase tracking-wider mb-4">
              Em busca do Litrão MAPA 2026
            </p>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-6">
              Percorra 11 bares em um circuito de ~2,5 km pela cidade de Caçador em uma noite épica!
            </p>
            {/* Info badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {[
                { icon: Calendar, label: "14/03 · Sexta" },
                { icon: Clock, label: "Largada 17h" },
                { icon: Timer, label: "Máx. 2 horas" },
                { icon: Route, label: "~2,5 km" },
                { icon: Beer, label: "11 bares" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 bg-neon-card rounded-full px-3 py-1.5 text-xs font-medium">
                  <b.icon className="w-3.5 h-3.5 text-neon-pink" /> {b.label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="neon" size="xl" onClick={() => document.getElementById("ingressos")?.scrollIntoView({ behavior: "smooth" })}>
                <CreditCard className="w-5 h-5" /> Comprar ingresso agora
              </Button>
              <Button variant="outline" size="xl" onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}>
                Ver como funciona <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <ScrollSection id="como-funciona">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-neon-gradient">Como Funciona?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "01", icon: CreditCard, title: "Inscrição", desc: "Compre seu ingresso online e garanta sua placa de identificação." },
            { n: "02", icon: Calendar, title: "Retirada do Kit", desc: "No dia do evento, retire sua placa e mapa no ponto de concentração às 17h." },
            { n: "03", icon: Beer, title: "Circuito de 11 Bares", desc: "Percorra os 11 bares, passe pelas 4 mesas de cada um e colecione adesivos." },
            { n: "04", icon: Trophy, title: "Classificação & After", desc: "Menor tempo + todos os bares + volume completo = pódio! Depois, after party." },
          ].map((step) => (
            <div key={step.n} className="bg-neon-card rounded-xl p-6 text-center transition-all duration-300">
              <span className="font-display text-5xl font-black text-neon-purple/40">{step.n}</span>
              <div className="w-12 h-12 mx-auto rounded-full bg-neon-purple/20 flex items-center justify-center my-4">
                <step.icon className="w-6 h-6 text-neon-pink" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* DINÂMICA DO CIRCUITO */}
      <ScrollSection className="bg-card/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-neon-gradient">Dinâmica do Circuito</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Em cada bar existem <strong className="text-foreground">4 mesas</strong>. Você escolhe em quais consumir e em qual apenas registrar passagem. O adesivo só é entregue após devolver o copo ao garçom.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {mesasDinamica.map((m) => (
            <div key={m.mesa} className="bg-neon-card rounded-xl p-6 text-center transition-all duration-300">
              <span className={`text-3xl font-bold ${m.color}`}>{m.adesivo}</span>
              <h3 className="font-semibold text-lg mt-3 mb-1">{m.mesa}</h3>
              <p className="text-sm text-muted-foreground">{m.copo}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 max-w-2xl mx-auto bg-neon-card rounded-xl p-6 text-sm text-muted-foreground space-y-2">
          <p><strong className="text-foreground">Volume total Masculino:</strong> 2,2 litros (300ml + 200ml em cada bar × 11 bares, com opção de shot e passagem)</p>
          <p><strong className="text-foreground">Volume total Feminino:</strong> 1,1 litro (volume reduzido no circuito)</p>
          <p className="text-neon-pink font-medium pt-2">⚠ Sem devolver o copo, você não recebe o adesivo!</p>
        </div>
      </ScrollSection>

      {/* BARES PARTICIPANTES */}
      <ScrollSection>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-neon-gradient">11 Bares do Circuito</h2>
        <p className="text-center text-muted-foreground mb-12">Na ordem oficial do percurso</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bars.map((bar) => (
            <div key={bar.num} className="bg-neon-card rounded-xl p-5 transition-all duration-300 flex items-center gap-4">
              <span className="font-display text-2xl font-black text-neon-purple/60 w-8 text-center shrink-0">
                {String(bar.num).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <Beer className="w-4 h-4 text-neon-pink shrink-0" />
                <h3 className="font-semibold">{bar.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* O QUE ESTÁ INCLUSO */}
      <ScrollSection className="bg-card/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-neon-gradient">O Que Está Incluso</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Award, label: "Placa de identificação" },
            { icon: MapPin, label: "Mapa do circuito" },
            { icon: Beer, label: "Copos em cada bar" },
            { icon: Star, label: "Adesivos de controle" },
            { icon: Trophy, label: "Sorteios e prêmios" },
            { icon: Music, label: "After party com DJ" },
            { icon: Shield, label: "Segurança no percurso" },
            { icon: Users, label: "Networking épico" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neon-card text-center transition-all duration-300">
              <item.icon className="w-7 h-7 text-neon-pink" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* CRITÉRIOS DE CLASSIFICAÇÃO */}
      <ScrollSection>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-neon-gradient">Critérios de Classificação</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Para subir no pódio, você precisa cumprir todos os requisitos abaixo:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Timer, title: "Menor tempo", desc: "Completar o circuito no menor tempo possível." },
            { icon: Beer, title: "Todos os 11 bares", desc: "Passar por todos os bares do circuito, sem pular nenhum." },
            { icon: Clock, title: "Máximo 2 horas", desc: "Concluir todo o percurso em até 2 horas a partir da largada." },
            { icon: Zap, title: "Volume completo", desc: "Masc: 2,2L · Fem: 1,1L – atingir o volume exato do seu ingresso." },
          ].map((c) => (
            <div key={c.title} className="bg-neon-card rounded-xl p-6 flex gap-4 items-start transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5 text-neon-pink" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* INGRESSOS */}
      <ScrollSection id="ingressos" className="bg-card/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-neon-gradient">Ingressos & Valores</h2>
        <p className="text-center text-muted-foreground mb-12">Garanta sua vaga antes que os ingressos esgotem!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tickets.map((t) => (
            <div key={t.id} className={`relative bg-neon-card rounded-2xl p-8 flex flex-col transition-all duration-300 ${t.highlight ? "ring-2 ring-neon-pink shadow-[0_0_40px_hsl(var(--neon-pink)/0.2)]" : ""}`}>
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 btn-neon text-xs font-bold px-4 py-1 rounded-full">
                  Melhor Preço
                </span>
              )}
              <h3 className="font-display text-xl font-bold mb-1">{t.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neon-pink">{t.price}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="text-sm flex items-center gap-2">
                    <Check className="w-4 h-4 text-neon-purple shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="neon" size="lg" className="w-full" onClick={() => handleBuy(t.id)}>
                Comprar este ingresso
              </Button>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* MODAL DE INSCRIÇÃO */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-neon-card border-neon-purple/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-neon-gradient">
              Inscrição – {selectedTicket === "masculino" ? "Masculino (R$ 110,00)" : "Feminino (R$ 55,00)"}
            </DialogTitle>
            <DialogDescription>Preencha seus dados para prosseguir ao pagamento.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" required placeholder="Seu nome completo" value={form.nome} onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone / WhatsApp</Label>
              <Input id="telefone" required placeholder="(49) 99999-9999" value={form.telefone} onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numero_placa">Número desejado da placa</Label>
              <Input id="numero_placa" type="number" required min={1} placeholder="Ex: 42" value={form.numero_placa} onChange={(e) => setForm((f) => ({ ...f, numero_placa: e.target.value }))} />
            </div>
            <Button type="submit" variant="neon" size="lg" className="w-full" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</> : "Ir para pagamento"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* REGRAS, SEGURANÇA & TERMOS */}
      <ScrollSection>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8 text-neon-gradient">Regras & Segurança</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-neon-card rounded-xl p-6 md:p-8 text-sm text-muted-foreground space-y-3">
            <h3 className="text-foreground font-semibold text-base mb-3">📋 Regras do Circuito</h3>
            <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Idade mínima:</strong> 18 anos com documento com foto.</p>
            <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Copos:</strong> Plásticos e não reutilizáveis. Devolução obrigatória ao garçom.</p>
            <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Proibido:</strong> Portar copos fora do ponto de consumo.</p>
            <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Bares:</strong> Participantes só entram nos bares para uso do sanitário.</p>
            <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Responsabilidade:</strong> Cada participante é responsável por sua condição física.</p>
            <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Reembolso:</strong> Integral até 7 dias antes. Após, sem devolução.</p>
          </div>
          <div className="bg-neon-card rounded-xl p-6 md:p-8 text-sm text-muted-foreground space-y-3">
            <h3 className="text-foreground font-semibold text-base mb-3">🛡️ Segurança</h3>
            <p><Check className="w-4 h-4 inline text-neon-pink mr-1" /> Equipe de organização em todas as esquinas do percurso.</p>
            <p><Check className="w-4 h-4 inline text-neon-pink mr-1" /> Ambulância e profissional de enfermagem no local.</p>
            <p><Check className="w-4 h-4 inline text-neon-pink mr-1" /> Apoio da Guarda Municipal durante todo o evento.</p>
            <p><Check className="w-4 h-4 inline text-neon-pink mr-1" /> Fiscais em cada bar e cronômetro oficial.</p>
            <p><Check className="w-4 h-4 inline text-neon-pink mr-1" /> Consumo responsável incentivado pela organização.</p>
            <p><Check className="w-4 h-4 inline text-neon-pink mr-1" /> A organização não se responsabiliza por pertences pessoais.</p>
          </div>
        </div>
      </ScrollSection>

      {/* FAQ */}
      <ScrollSection className="bg-card/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-neon-gradient">Perguntas Frequentes</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-neon-card rounded-xl border-none px-6">
                <AccordionTrigger className="text-left font-medium text-sm hover:no-underline py-4">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollSection>

      {/* MAPA */}
      <ScrollSection>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-neon-gradient">Local de Concentração</h2>
        <p className="text-center text-muted-foreground mb-8">Caçador, SC – Ponto de largada às 17h</p>
        <div className="rounded-xl overflow-hidden border border-border aspect-video max-w-4xl mx-auto">
          <iframe
            src="https://maps.google.com/maps?q=Caçador,SC,Brazil&output=embed"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Local do evento"
          />
        </div>
      </ScrollSection>

      {/* FOOTER */}
      <section className="border-t border-neon-purple/20 py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-xs text-muted-foreground space-y-2">
          <p>Organização e sede oficial: <strong className="text-foreground">Meu Escritório – WORKSTATION</strong></p>
          <p>CNPJ: 00.000.000/0001-00</p>
          <p>&copy; {new Date().getFullYear()} Corrida de Bar em Bar. Todos os direitos reservados.</p>
        </div>
      </section>
    </div>
  );
};

export default CorridaDeBarEmBar;
