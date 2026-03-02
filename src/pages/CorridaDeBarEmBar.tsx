import { useState } from "react";
import mapaCircuito from "@/assets/mapa-circuito.png";
import {
  ArrowRight, Beer, Gift, Trophy, Music, MapPin, Clock, Shield, Users,
  ChevronDown, CreditCard, Calendar, Star, Zap, Check, Loader2, Timer, Route, Sticker, Award,
  Crosshair, Skull, Swords, Map, User, Flag } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import eventHeroImg from "@/assets/corrida-hero-gta.png";

const ScrollSection = ({ children, className = "", id }: {children: React.ReactNode;className?: string;id?: string;}) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id={id} ref={ref} className={`py-10 md:py-24 px-4 transition-all duration-700 ${isVisible ? "scroll-visible" : "scroll-hidden"} ${className}`}>
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>);

};

const tickets = [
{
  id: "masculino",
  name: "CJ – Modo Hardcore",
  subtitle: "Ingresso Masculino",
  price: "R$ 110,00",
  desc: "Para quem quer o desafio no nível máximo: 2,2L distribuídos pelos 11 bares do circuito. Ideal para quem já está acostumado a unir corrida, bar e zoeira com responsabilidade.",
  features: ["Placa de identificação individual", "Mapa do circuito", "Copos em cada bar", "Adesivos de controle"],
  highlight: false,
  cta: "Escolher CJ Hardcore"
},
{
  id: "feminino",
  name: "Sweet – Modo Light",
  subtitle: "Ingresso Feminino",
  price: "R$ 55,00",
  desc: "Para quem quer viver a experiência completa com menos volume: 1,1L ao longo do circuito. Perfeito para quem quer curtir o rolê, fazer fotos e fechar a missão sem exagero.",
  features: ["Placa de identificação individual", "Mapa do circuito", "Copos em cada bar", "Adesivos de controle"],
  highlight: true,
  cta: "Escolher Sweet Light"
}];


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
{ num: 11, name: "O Boteco dos Amigos" }];


const mesasDinamica = [
{ mesa: "1ª Mesa", copo: "300ml", adesivo: "Quadrado ■", color: "text-gta-green-light" },
{ mesa: "2ª Mesa", copo: "200ml", adesivo: "Triângulo ▲", color: "text-gta-gold" },
{ mesa: "3ª Mesa", copo: "100ml ou shot", adesivo: "Bolinha ●", color: "text-gta-red" },
{ mesa: "4ª Mesa", copo: "Passagem (sem consumo)", adesivo: "X ✕", color: "text-muted-foreground" }];


const faq = [
{ q: "Nunca corri, posso participar?", a: "Claro! Não é uma corrida de velocidade, é um circuito de bares. Vá no seu ritmo, curta cada ponto e complete a missão." },
{ q: "Preciso beber em todos os bares?", a: "Você precisa passar por todos os 11 bares, mas em cada bar há a opção de passagem (sem consumo) na 4ª mesa. Ou seja: você controla o quanto bebe." },
{ q: "Posso ir só pela experiência e não focar no tempo?", a: "Com certeza! A maioria vai pelo rolê e pela experiência. O pódio é só pra quem quiser competir de verdade." },
{ q: "O que acontece se eu não completar o circuito?", a: "Sem problema! Você pode curtir até onde conseguir. Só não concorrerá ao pódio nem aos sorteios da finalização." },
{ q: "Qual a idade mínima para participar?", a: "É necessário ter 18 anos completos e apresentar documento com foto na retirada do kit." },
{ q: "Quais formas de pagamento são aceitas?", a: "Pagamento online via InfinitePay: cartão de crédito, débito e Pix." },
{ q: "Posso transferir meu ingresso para outra pessoa?", a: "Sim, desde que informe a organização com antecedência." },
{ q: "Qual o volume total de bebida no circuito?", a: "Masculino: 2,2 litros. Feminino: 1,1 litro. A 4ª mesa é apenas passagem sem consumo." },
{ q: "Quanto tempo tenho para completar o circuito?", a: "O tempo máximo é de 2 horas a partir da largada às 17h." },
{ q: "E se chover?", a: "O evento acontece chuva ou sol. Os bares são ambientes cobertos." },
{ q: "Tem after party?", a: "Sim! Ao final do circuito, todos os participantes se encontram no local do after com DJ e sorteios." }];


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
          tipo_ingresso: selectedTicket
        }
      });

      if (error || !data?.checkout_url) {
        throw new Error(data?.error || "Erro ao gerar link de pagamento.");
      }

      window.location.href = data.checkout_url;
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Não foi possível processar. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gta-gradient min-h-screen">
      {/* HERO – MISSÃO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventHeroImg} alt="Corrida de Bar em Bar" className="w-full h-full object-cover object-[center_top]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_20%_4%)] via-[hsl(220_20%_4%/0.5)] to-[hsl(220_20%_4%/0.2)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(112_40%_29%/0.08)] to-[hsl(37_82%_30%/0.05)]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-5xl px-4 pt-24 md:pt-40 pb-12 md:pb-20 text-center">
          <div className="animate-reveal-up">
            {/* HUD chip top */}
            <span className="inline-block gta-hud-chip rounded px-4 py-1.5 text-xs tracking-widest mb-6 uppercase font-gta-hud font-bold italic">
              ★ NOVA MISSÃO DISPONÍVEL ★
            </span>

            <h1 className="font-gta-price text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 leading-[0.85] text-gta-gradient tracking-tight uppercase" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>
              CORRIDA<br />DE BAR<br />EM BAR
            </h1>
            <p className="font-gta-script text-sm md:text-base text-gta-gold uppercase tracking-widest mb-3">
              GTA San Andreas Edition
            </p>
            <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-3 leading-snug">
              A primeira corrida temática de Caçador inspirada em Los Santos: 11 bares, 2,5 km e uma missão inteira pra cumprir com a sua gangue.
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8 leading-snug">
              Escolha seu personagem, pegue sua placa, siga o mapa e complete o circuito antes que o relógio zere. Vagas limitadas.
            </p>

            {/* HUD info chips */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {[
              { icon: Calendar, label: "14/03 · 17h" },
              { icon: MapPin, label: "Caçador/SC" },
              { icon: Route, label: "~2,5 km" },
              { icon: Beer, label: "11 bares" },
              { icon: Timer, label: "Máx. 2h" }].
              map((b) =>
              <span key={b.label} className="inline-flex items-center gap-1.5 gta-hud-chip rounded px-2.5 py-1 text-[10px] sm:text-xs sm:px-3 sm:py-1.5">
                  <b.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {b.label}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="btn-gta rounded-lg px-8 py-4 text-base w-full sm:w-auto"
                onClick={() => document.getElementById("ingressos")?.scrollIntoView({ behavior: "smooth" })}>

                <Crosshair className="w-5 h-5" /> Iniciar missão
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-gta-green/50 text-gta-green-light hover:bg-gta-green/10 rounded-lg w-full sm:w-auto"
                onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}>

                Ver briefing <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(220_20%_4%)] to-transparent" />
      </section>

      {/* SUA MISSÃO */}
      <ScrollSection id="como-funciona">
        <div className="text-center mb-8 md:mb-12">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">BRIEFING</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient mb-3" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>Sua Missão</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">em Los Santos (Caçador Edition)</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
          { n: "01", icon: User, title: "Check-in do personagem", desc: "No dia do evento, pegue sua placa e mapa no ponto de partida a partir das 17h." },
          { n: "02", icon: Map, title: "Mapa liberado", desc: "Siga o circuito passando pelos 11 bares. Em cada bar, cumpra o objetivo e ganhe um adesivo na placa." },
          { n: "03", icon: Beer, title: "Complete o circuito", desc: "Passe por todos os bares dentro do tempo limite, respeitando o volume do seu tipo de ingresso." },
          { n: "04", icon: Trophy, title: "Missão concluída", desc: "Quem completar o circuito entra na disputa do pódio e curte o after com DJ." }].
          map((step) =>
          <div key={step.n} className="gta-mission-card rounded-xl p-4 md:p-6 text-center">
              <span className="font-gta-hud text-2xl md:text-4xl font-black text-gta-green/30">{step.n}</span>
              <div className="w-12 h-12 mx-auto rounded-full bg-gta-green/20 flex items-center justify-center my-4 border border-gta-green/30">
                <step.icon className="w-6 h-6 text-gta-green-light" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-snug">{step.desc}</p>
            </div>
          )}
        </div>
      </ScrollSection>

      {/* DINÂMICA DO CIRCUITO */}
      <ScrollSection className="bg-[hsl(220_18%_6%)]">
        <div className="text-center mb-8 md:mb-12">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">MECÂNICAS</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient mb-4" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>Dinâmica do Circuito</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Em cada bar existem <strong className="text-foreground">4 mesas</strong>. Você escolhe em quais consumir e em qual apenas registrar passagem. O adesivo só é entregue após devolver o copo ao garçom.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {mesasDinamica.map((m) =>
          <div key={m.mesa} className="bg-gta-card rounded-xl p-4 md:p-6 text-center">
              <span className={`text-2xl md:text-3xl font-bold ${m.color}`}>{m.adesivo}</span>
              <h3 className="font-semibold text-base md:text-lg mt-3 mb-1">{m.mesa}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{m.copo}</p>
            </div>
          )}
        </div>
        <div className="mt-8 max-w-2xl mx-auto bg-gta-card rounded-xl p-4 md:p-6 text-sm text-muted-foreground space-y-2">
          <p><strong className="text-foreground">Volume total Masculino (CJ):</strong> 2,2 litros no circuito</p>
          <p><strong className="text-foreground">Volume total Feminino (Sweet):</strong> 1,1 litro no circuito</p>
          <p className="text-[#ef4444] font-medium pt-2">⚠ Sem devolver o copo, você não recebe o adesivo!</p>
        </div>
      </ScrollSection>

      {/* BARES – PONTOS DO MAPA */}
      <ScrollSection>
        <div className="text-center mb-8 md:mb-12">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">MAPA</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient mb-3" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>11 Pontos no Mapa</h2>
          <p className="text-muted-foreground">Na ordem oficial do percurso</p>
        </div>
        <img src={mapaCircuito} alt="Mapa do circuito - 11 bares" className="w-full max-w-full md:max-w-3xl mx-auto rounded-sm border border-gta-green/30 mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {bars.map((bar) =>
          <div key={bar.num} className="bg-gta-card rounded-xl p-2 flex items-center gap-2">
              <span className="font-gta-hud text-sm text-gta-green/60 w-6 text-center shrink-0 font-bold">
                {String(bar.num).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gta-green-light shrink-0" />
                <h3 className="text-xs font-medium">{bar.name}</h3>
              </div>
            </div>
          )}
        </div>
      </ScrollSection>

      {/* O QUE ESTÁ INCLUSO */}
      <ScrollSection className="bg-[hsl(220_18%_6%)]">
        <div className="text-center mb-8 md:mb-12">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">INVENTÁRIO</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>O Que Está Incluso</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
          { icon: Award, label: "Placa de identificação" },
          { icon: Map, label: "Mapa do circuito" },
          { icon: Beer, label: "Copos em cada bar" },
          { icon: Star, label: "Adesivos de controle" },
          { icon: Trophy, label: "Sorteios e prêmios" },
          { icon: Music, label: "After party com DJ" },
          { icon: Shield, label: "Segurança no percurso" },
          { icon: Users, label: "Networking épico" }].
          map((item) =>
          <div key={item.label} className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-gta-card text-center">
              <item.icon className="w-7 h-7 text-gta-green-light" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          )}
        </div>
      </ScrollSection>

      {/* CRITÉRIOS DE CLASSIFICAÇÃO */}
      <ScrollSection>
        <div className="text-center mb-8 md:mb-12">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">RANKING</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient mb-3" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>Critérios de Classificação</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Para subir no pódio, complete todos os objetivos:</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
          { icon: Timer, title: "Menor tempo", desc: "Completar o circuito no menor tempo possível." },
          { icon: Flag, title: "Todos os 11 bares", desc: "Passar por todos os bares do circuito, sem pular nenhum." },
          { icon: Clock, title: "Máximo 2 horas", desc: "Concluir todo o percurso em até 2 horas a partir da largada." },
          { icon: Zap, title: "Volume completo", desc: "CJ: 2,2L · Sweet: 1,1L – atingir o volume do seu ingresso." }].
          map((c) =>
          <div key={c.title} className="gta-mission-card rounded-xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-gta-green/20 flex items-center justify-center shrink-0 border border-gta-green/30">
                <c.icon className="w-5 h-5 text-gta-green-light" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{c.desc}</p>
              </div>
            </div>
          )}
        </div>
      </ScrollSection>

      {/* ESCOLHA SEU PERSONAGEM (INGRESSOS) */}
      <ScrollSection id="ingressos" className="bg-[hsl(220_18%_6%)]">
        <div className="text-center mb-8 md:mb-12">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">SELEÇÃO DE PERSONAGEM</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient mb-3" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>Escolha seu Personagem</h2>
          <p className="text-muted-foreground">Garanta sua vaga antes que o lobby feche!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tickets.map((t) =>
          <div key={t.id} className={`relative gta-mission-card rounded-2xl p-5 md:p-8 flex flex-col ${t.highlight ? "ring-2 ring-gta-green-light shadow-[0_0_40px_hsl(var(--gta-green)/0.2)]" : ""}`}>
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gta-green text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Mais popular</span>
              )}
              <span className="text-xs uppercase tracking-widest text-gta-gold mb-1 font-gta-hud font-bold italic">{t.subtitle}</span>
              <h3 className="font-gta-title text-xl mb-2 text-foreground">{t.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-snug">{t.desc}</p>
              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-bold text-[#22c55e]">{t.price}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {t.features.map((f) =>
              <li key={f} className="text-sm flex items-center gap-2">
                    <Check className="w-4 h-4 text-gta-green-light shrink-0" /> {f}
                  </li>
              )}
              </ul>
              <Button className="w-full btn-gta rounded-lg py-3 text-sm" onClick={() => handleBuy(t.id)}>
                {t.cta}
              </Button>
            </div>
          )}
        </div>

        {/* Social proof */}
        <div className="mt-10 max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground italic border border-gta-green/20 rounded-lg px-6 py-4 bg-gta-card">
            "É a primeira edição, mas a lista de interessados já parece lobby de servidor lotado. As vagas são limitadas para manter o circuito seguro e organizado."
          </p>
        </div>
      </ScrollSection>

      {/* MODAL DE INSCRIÇÃO */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="gta-mission-card border-gta-green/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-gta-title text-xl text-gta-gradient">
              {selectedTicket === "masculino" ? "CJ Hardcore (R$ 110,00)" : "Sweet Light (R$ 55,00)"}
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
            <Button type="submit" className="w-full btn-gta rounded-lg py-3" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</> : "Confirmar e pagar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* CÓDIGO DE RUA (REGRAS & SEGURANÇA) */}
      <ScrollSection>
        <div className="text-center mb-8">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">RESPEITE O CÓDIGO</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>Código de Rua</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="gta-mission-card rounded-xl p-6 md:p-8 text-sm text-muted-foreground space-y-3">
            <h3 className="text-foreground font-gta-title text-base mb-3 text-gta-gold">Idade mínima e documentos</h3>
            <p className="leading-snug"><Shield className="w-4 h-4 inline text-gta-green-light mr-1" /> <strong className="text-foreground">Idade mínima:</strong> 18 anos com documento com foto.</p>
            <h3 className="text-foreground font-gta-title text-base mb-1 mt-4 text-gta-gold">Consumo responsável</h3>
            <p className="leading-snug"><Shield className="w-4 h-4 inline text-gta-green-light mr-1" /> <strong className="text-foreground">Copos:</strong> Plásticos e não reutilizáveis. Devolução obrigatória ao garçom.</p>
            <p className="leading-snug"><Shield className="w-4 h-4 inline text-gta-green-light mr-1" /> <strong className="text-foreground">Proibido:</strong> Portar copos fora do ponto de consumo.</p>
            <p className="leading-snug"><Shield className="w-4 h-4 inline text-gta-green-light mr-1" /> <strong className="text-foreground">Bares:</strong> Participantes só entram nos bares para uso do sanitário.</p>
            <h3 className="text-foreground font-gta-title text-base mb-1 mt-4 text-gta-gold">Responsabilidades</h3>
            <p><Shield className="w-4 h-4 inline text-gta-green-light mr-1" /> <strong className="text-foreground">Responsabilidade:</strong> Cada participante é responsável por sua condição física.</p>
            <p><Shield className="w-4 h-4 inline text-gta-green-light mr-1" /> <strong className="text-foreground">Reembolso:</strong> Integral até 7 dias antes. Após, sem devolução.</p>
          </div>
          <div className="gta-mission-card rounded-xl p-6 md:p-8 text-sm text-muted-foreground space-y-3">
            <h3 className="text-foreground font-gta-title text-base mb-3 text-gta-gold">Cuidados com saúde e segurança</h3>
            <p><Check className="w-4 h-4 inline text-gta-green-light mr-1" /> Equipe de organização em todas as esquinas do percurso.</p>
            <p><Check className="w-4 h-4 inline text-gta-green-light mr-1" /> Ambulância e profissional de enfermagem no local.</p>
            <p><Check className="w-4 h-4 inline text-gta-green-light mr-1" /> Apoio da Guarda Municipal durante todo o evento.</p>
            <p><Check className="w-4 h-4 inline text-gta-green-light mr-1" /> Fiscais em cada bar e cronômetro oficial.</p>
            <p><Check className="w-4 h-4 inline text-gta-green-light mr-1" /> Consumo responsável incentivado pela organização.</p>
            <p><Check className="w-4 h-4 inline text-gta-green-light mr-1" /> A organização não se responsabiliza por pertences pessoais.</p>
            <div className="mt-4 pt-4 border-t border-gta-green/20 text-xs text-muted-foreground/70">
              Diversão + responsabilidade. Esse é o código de quem participa do circuito.
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* FAQ */}
      <ScrollSection className="bg-[hsl(220_18%_6%)]">
        <div className="text-center mb-8 md:mb-12">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">AJUDA</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>Perguntas Frequentes</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, i) =>
            <AccordionItem key={i} value={`faq-${i}`} className="bg-gta-card rounded-xl border-none px-4 md:px-6">
                <AccordionTrigger className="text-left font-medium text-sm hover:no-underline py-4">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">{item.a}</AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </ScrollSection>

      {/* MAPA */}
      <ScrollSection>
        <div className="text-center mb-8">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-4 inline-block font-gta-hud font-bold italic uppercase">LOCALIZAÇÃO</span>
          <h2 className="font-gta-title text-2xl md:text-4xl text-gta-gradient mb-3" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>Ponto de Largada</h2>
          <p className="text-muted-foreground">Caçador, SC – Concentração às 17h</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-gta-green/20 aspect-video min-h-[250px] max-w-4xl mx-auto">
          <iframe
            src="https://maps.google.com/maps?q=Caçador,SC,Brazil&output=embed"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Local do evento" />

        </div>
      </ScrollSection>

      {/* FOOTER */}
      <section className="border-t border-gta-green/20 py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-xs text-muted-foreground space-y-2">
          <p>Organização e sede oficial: <strong className="text-foreground">Meu Escritório – WORKSTATION</strong></p>
          <p>CNPJ: 00.000.000/0001-00</p>
          <p>&copy; {new Date().getFullYear()} Corrida de Bar em Bar. Todos os direitos reservados.</p>
        </div>
      </section>
    </div>);

};

export default CorridaDeBarEmBar;