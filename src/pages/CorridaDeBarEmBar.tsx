import { Link } from "react-router-dom";
import {
  ArrowRight, Beer, Gift, Trophy, Music, MapPin, Clock, Shield, Users,
  ChevronDown, CreditCard, Calendar, Star, Zap, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import eventHeroImg from "@/assets/event-hero.jpg";

const ScrollSection = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id={id} ref={ref} className={`py-16 md:py-24 px-4 transition-all duration-700 ${isVisible ? "scroll-visible" : "scroll-hidden"} ${className}`}>
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>
  );
};

/* ============================================
 * INTEGRAÇÃO INFINITEPAY
 * ============================================
 *
 * Endpoint: POST https://api.infinitepay.io/invoices/public/checkout/links
 *
 * Headers:
 *   Content-Type: application/json
 *
 * Payload:
 * {
 *   "handle": "SUA_INFINITETAG_AQUI",  // sem o símbolo $
 *   "items": [
 *     {
 *       "quantity": 1,
 *       "price": 5000,                  // valor em CENTAVOS
 *       "description": "Ingresso Corrida de Bar em Bar - Lote 1"
 *     }
 *   ],
 *   "order_nsu": "PEDIDO_001",          // ID interno do pedido
 *   "redirect_url": "https://seusite.com/eventos/corrida-de-bar-em-bar/sucesso"
 * }
 *
 * Resposta esperada: { "checkout_url": "https://..." }
 * Redirecionar o usuário para o checkout_url
 * ============================================ */

const createCheckoutLink = async (ticketType: string): Promise<string> => {
  /*
   * TODO: Implementar chamada real à API da InfinitePay
   *
   * const INFINITEPAY_HANDLE = "SUA_INFINITETAG"; // TODO: inserir sua InfiniteTag
   * const REDIRECT_URL = "https://seusite.com/eventos/corrida-de-bar-em-bar/sucesso";
   *
   * const ticketPrices: Record<string, { price: number; description: string }> = {
   *   "lote1": { price: 5000, description: "Ingresso Corrida de Bar em Bar - Lote 1" },
   *   "lote2": { price: 7000, description: "Ingresso Corrida de Bar em Bar - Lote 2" },
   *   "vip":   { price: 12000, description: "Ingresso VIP Corrida de Bar em Bar" },
   * };
   *
   * const ticket = ticketPrices[ticketType];
   * const orderNsu = `CORRIDA_${Date.now()}`;
   *
   * const response = await fetch("https://api.infinitepay.io/invoices/public/checkout/links", {
   *   method: "POST",
   *   headers: { "Content-Type": "application/json" },
   *   body: JSON.stringify({
   *     handle: INFINITEPAY_HANDLE,
   *     items: [{ quantity: 1, price: ticket.price, description: ticket.description }],
   *     order_nsu: orderNsu,
   *     redirect_url: REDIRECT_URL,
   *   }),
   * });
   *
   * const data = await response.json();
   * return data.checkout_url;
   */

  // MOCK – remover quando integrar com a API real
  console.log(`Comprando ingresso: ${ticketType}`);
  alert(
    `Redirecionando para pagamento: ${ticketType}\n\nConfigure a integração com InfinitePay para ativar o pagamento real.\n\nVeja os comentários no código-fonte.`
  );
  return "#";
};

const handleBuy = async (ticketType: string) => {
  const url = await createCheckoutLink(ticketType);
  if (url && url !== "#") {
    window.location.href = url;
  }
};

/* ============================================
 * CONFIGURAÇÃO: Ingressos – valores e nomes
 * ============================================ */
const tickets = [
  {
    id: "lote1",
    name: "Lote 1",
    price: "R$ 50,00",    // TODO: valor real
    desc: "Primeiro lote – garanta o melhor preço!",
    features: ["Pulseira de acesso", "Mapa do circuito", "1 drink de boas-vindas"],
    highlight: false,
  },
  {
    id: "lote2",
    name: "Lote 2",
    price: "R$ 70,00",    // TODO: valor real
    desc: "Segundo lote – promoção por tempo limitado.",
    features: ["Pulseira de acesso", "Mapa do circuito", "1 drink de boas-vindas", "Copo personalizado"],
    highlight: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "R$ 120,00",   // TODO: valor real
    desc: "Experiência premium com acesso exclusivo.",
    features: ["Pulseira VIP", "Mapa do circuito", "3 drinks inclusos", "Copo e camiseta", "Área VIP no after"],
    highlight: false,
  },
];

/* ============================================
 * CONFIGURAÇÃO: Bares participantes
 * ============================================ */
const bars = [
  { name: "Bar do João", desc: "Drinks autorais e petiscos.", bairro: "Centro" },
  { name: "Cervejaria Artesanal", desc: "As melhores IPAs da cidade.", bairro: "Santa Catarina" },
  { name: "Boteco da Esquina", desc: "Chopps gelados e tira-gosto.", bairro: "Centro" },
  { name: "Lounge Neon", desc: "Cocktails e música eletrônica.", bairro: "Alto Bonito" },
  { name: "Pub Rock & Roll", desc: "Bandas ao vivo e cervejas.", bairro: "Santa Cruz" },
  { name: "Destilaria 88", desc: "Gin tônica e drinks premium.", bairro: "Centro" },
  // TODO: Adicionar ou editar bares participantes
];

/* ============================================
 * CONFIGURAÇÃO: FAQ do evento
 * ============================================ */
const faq = [
  { q: "Qual a idade mínima para participar?", a: "É necessário ter 18 anos completos e apresentar documento com foto." },
  { q: "O que está incluso no ingresso?", a: "Pulseira de acesso ao circuito, mapa dos bares e pelo menos 1 drink de boas-vindas (varia por lote)." },
  { q: "Quais formas de pagamento são aceitas?", a: "Pagamento online via InfinitePay: cartão de crédito, débito e Pix." },
  { q: "Posso transferir meu ingresso para outra pessoa?", a: "Sim, desde que informe a organização com antecedência." },
  { q: "Como funciona o circuito?", a: "Você retira sua pulseira no ponto de concentração e percorre os bares parceiros, aproveitando drinks e promoções exclusivas." },
  { q: "Tem after party?", a: "Sim! Ao final do circuito, todos os participantes se encontram no local do after com DJ e sorteios." },
  { q: "E se chover?", a: "O evento acontece chuva ou sol. Os bares são ambientes cobertos." },
  { q: "Qual a política de reembolso?", a: "Reembolso integral até 7 dias antes do evento. Após, não haverá devolução." },
];

const CorridaDeBarEmBar = () => {
  return (
    <div className="bg-neon-gradient min-h-screen">
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventHeroImg} alt="Corrida de Bar em Bar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-purple)/0.3)] to-[hsl(var(--neon-blue)/0.2)]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-5xl px-4 py-32 text-center">
          <div className="animate-reveal-up">
            <span className="inline-block bg-neon-card rounded-full px-4 py-1 text-xs font-semibold text-neon-pink uppercase tracking-widest mb-6">
              Evento Exclusivo
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black mb-6 animate-neon-glow leading-tight">
              CORRIDA DE BAR<br />EM BAR
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
              A corrida mais insana de bar em bar de Caçador! Percorra os melhores bares da cidade em uma noite épica.
            </p>
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

      {/* ============ COMO FUNCIONA ============ */}
      <ScrollSection id="como-funciona">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-neon-gradient">
          Como Funciona?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "01", icon: CreditCard, title: "Inscrição", desc: "Compre seu ingresso online de forma rápida e segura." },
            { n: "02", icon: Calendar, title: "Retirada do Kit", desc: "No dia do evento, retire sua pulseira e mapa no ponto de concentração." },
            { n: "03", icon: Beer, title: "Circuito", desc: "Percorra os bares parceiros e aproveite drinks e promoções exclusivas." },
            { n: "04", icon: Music, title: "After Party", desc: "Encontre todos no local do after com DJ, sorteios e muita diversão." },
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

      {/* ============ O QUE ESTÁ INCLUSO ============ */}
      <ScrollSection className="bg-card/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-neon-gradient">
          O Que Está Incluso
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Beer, label: "Bares parceiros" },
            { icon: Gift, label: "Brindes exclusivos" },
            { icon: Trophy, label: "Sorteios e prêmios" },
            { icon: Music, label: "After party" },
            { icon: Star, label: "Drinks promocionais" },
            { icon: Zap, label: "Experiências únicas" },
            { icon: Users, label: "Networking" },
            { icon: MapPin, label: "Mapa do circuito" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neon-card text-center transition-all duration-300">
              <item.icon className="w-7 h-7 text-neon-pink" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* ============ BARES PARTICIPANTES ============ */}
      <ScrollSection>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-neon-gradient">
          Bares Participantes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bars.map((bar) => (
            <div key={bar.name} className="bg-neon-card rounded-xl p-6 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Beer className="w-5 h-5 text-neon-purple" />
                <h3 className="font-semibold text-lg">{bar.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{bar.desc}</p>
              <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded-full">{bar.bairro}</span>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* ============ INGRESSOS ============ */}
      <ScrollSection id="ingressos" className="bg-card/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-neon-gradient">
          Ingressos & Valores
        </h2>
        <p className="text-center text-muted-foreground mb-12">Garanta sua vaga antes que os lotes esgotem!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tickets.map((t) => (
            <div key={t.id} className={`relative bg-neon-card rounded-2xl p-8 flex flex-col transition-all duration-300 ${t.highlight ? "ring-2 ring-neon-pink shadow-[0_0_40px_hsl(var(--neon-pink)/0.2)]" : ""}`}>
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 btn-neon text-xs font-bold px-4 py-1 rounded-full">
                  Melhor Custo-Benefício
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

      {/* ============ REGRAS E TERMOS ============ */}
      <ScrollSection>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8 text-neon-gradient">
          Regras & Termos
        </h2>
        {/* TODO: Editar regras e termos do evento */}
        <div className="max-w-3xl mx-auto bg-neon-card rounded-xl p-6 md:p-8 text-sm text-muted-foreground space-y-3">
          <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Idade mínima:</strong> 18 anos. Documento com foto obrigatório.</p>
          <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Consumo responsável:</strong> O evento incentiva o consumo moderado de bebidas alcoólicas.</p>
          <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Pulseira:</strong> A pulseira é pessoal e intransferível. Não a remova durante o evento.</p>
          <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Reembolso:</strong> Reembolso integral até 7 dias antes do evento. Após esse prazo, não haverá devolução.</p>
          <p><Shield className="w-4 h-4 inline text-neon-purple mr-1" /> <strong className="text-foreground">Responsabilidade:</strong> A organização não se responsabiliza por pertences pessoais.</p>
        </div>
      </ScrollSection>

      {/* ============ FAQ ============ */}
      <ScrollSection className="bg-card/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-neon-gradient">
          Perguntas Frequentes
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-neon-card rounded-xl border-none px-6">
                <AccordionTrigger className="text-left font-medium text-sm hover:no-underline py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollSection>

      {/* ============ MAPA / LOCAL ============ */}
      <ScrollSection>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-neon-gradient">
          Local de Concentração
        </h2>
        {/* TODO: Editar endereço do ponto de concentração */}
        <p className="text-center text-muted-foreground mb-8">Praça Central – Caçador, SC (endereço placeholder)</p>
        <div className="rounded-xl overflow-hidden border border-border aspect-video max-w-4xl mx-auto">
          <iframe
            src="https://maps.google.com/maps?q=Caçador,SC,Brazil&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Local do evento"
          />
        </div>
      </ScrollSection>

      {/* ============ FOOTER DO EVENTO ============ */}
      <section className="border-t border-neon-purple/20 py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-xs text-muted-foreground space-y-2">
          <p>
            Organização e sede oficial: <strong className="text-foreground">Meu Escritório – WORKSTATION</strong>
          </p>
          {/* TODO: Editar CNPJ e redes do evento */}
          <p>CNPJ: 00.000.000/0001-00</p>
          <p>&copy; {new Date().getFullYear()} Corrida de Bar em Bar. Todos os direitos reservados.</p>
        </div>
      </section>
    </div>
  );
};

export default CorridaDeBarEmBar;
