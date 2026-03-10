import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Ticket, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface Inscricao {
  id: string;
  nome: string;
  telefone: string;
  tipo_ingresso: string;
  valor_pago: number;
  status_pagamento: string;
  order_nsu: string | null;
  created_at: string;
  numero_placa: number;
}

const MeuIngresso = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [ingressos, setIngressos] = useState<Inscricao[]>([]);
  const [erro, setErro] = useState("");
  const [buscou, setBuscou] = useState(false);

  const digitsOnly = (s: string) => s.replace(/\D/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setIngressos([]);

    const firstName = nome.trim().split(/\s+/)[0];

    const { data, error } = await supabase
      .from("inscricoes")
      .select("id, nome, telefone, tipo_ingresso, valor_pago, status_pagamento, order_nsu, created_at, numero_placa")
      .ilike("nome", `%${firstName}%`);

    setLoading(false);
    setBuscou(true);

    if (error) {
      setErro("Erro ao buscar ingresso. Tente novamente.");
      return;
    }

    const last8 = (s: string) => digitsOnly(s).slice(-8);
    const matches = data?.filter((r) => last8(r.telefone) === last8(telefone)) ?? [];

    if (matches.length === 0) {
      setErro("Nenhum ingresso encontrado com esse nome e telefone.");
      return;
    }

    setIngressos(matches);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  const statusColor = (s: string) => {
    if (s === "aprovado") return "text-[hsl(142,70%,50%)]";
    if (s === "pendente") return "text-[hsl(45,90%,55%)]";
    return "text-muted-foreground";
  };

  return (
    <div className="bg-gta-gradient min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 animate-reveal-up">
          <span className="inline-block gta-hud-chip rounded px-4 py-1.5 text-xs tracking-widest mb-4 uppercase font-gta-hud font-bold italic">
            🎫 MEU INGRESSO
          </span>
          <h1 className="font-gta-price text-3xl md:text-4xl text-gta-gradient uppercase tracking-tight mb-2" style={{ textShadow: "2px 2px 0 #000" }}>
            Consultar Ingresso
          </h1>
          <p className="text-muted-foreground text-sm">
            Digite o nome e telefone usados na compra.
          </p>
        </div>

        {/* Form */}
        {ingressos.length === 0 && (
          <form onSubmit={handleSubmit} className="bg-gta-card rounded-xl p-6 space-y-4 animate-reveal-up">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-foreground text-sm font-medium">Nome completo</Label>
              <Input
                id="nome"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="bg-background/80 border-border/50 text-base text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-foreground text-sm font-medium">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(49) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                className="bg-background/80 border-border/50 text-base text-foreground"
              />
            </div>

            <Button type="submit" disabled={loading} className="btn-gta w-full rounded-lg">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {loading ? "Buscando..." : "Buscar ingresso"}
            </Button>

            {erro && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3 mt-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {erro}
              </div>
            )}
          </form>
        )}

        {/* Ticket Cards */}
        {ingressos.length > 0 && (
          <div className="animate-reveal-up space-y-6">
            {ingressos.length > 1 && (
              <p className="text-center text-sm text-muted-foreground">
                {ingressos.length} ingressos encontrados
              </p>
            )}

            {ingressos.map((ingresso) => (
              <div key={ingresso.id} className="gta-mission-card rounded-xl overflow-hidden">
                {/* Ticket header */}
                <div className="bg-gta-green/20 border-b border-gta-green/30 px-6 py-4 flex items-center gap-3">
                  <Ticket className="w-6 h-6 text-gta-green-light" />
                  <div>
                    <p className="font-gta-price text-gta-gradient uppercase tracking-tight text-lg md:text-2xl">
                      {ingresso.tipo_ingresso === "masculino" ? "CJ – Modo Hardcore · Masculino" : "Sweet – Modo Light · Feminino"}
                    </p>
                    <p className="text-xs text-muted-foreground">Corrida de Bar em Bar</p>
                  </div>
                </div>

                {/* Ticket body */}
                <div className="p-6 space-y-3 text-sm">
                  {ingresso.numero_placa > 0 && (
                    <div className="flex justify-between gap-4 border-b border-border/20 pb-2 mb-1">
                      <span className="text-muted-foreground shrink-0">Nº do Participante</span>
                      <span className="font-gta-price text-xl text-gta-gradient">{ingresso.numero_placa}</span>
                    </div>
                  )}
                  {[
                    { label: "Participante", value: ingresso.nome },
                    { label: "Telefone", value: ingresso.telefone },
                    { label: "Ingresso", value: ingresso.tipo_ingresso === "masculino" ? "CJ – Modo Hardcore (2,2L) · Ingresso Masculino" : "Sweet – Modo Light (1,1L) · Ingresso Feminino" },
                    { label: "Valor pago", value: formatCurrency(ingresso.valor_pago) },
                    { label: "Data da compra", value: formatDate(ingresso.created_at) },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 border-b border-border/20 pb-2 last:border-0">
                      <span className="text-muted-foreground shrink-0">{row.label}</span>
                      <span className="font-medium text-foreground text-right">{row.value}</span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-muted-foreground">Status</span>
                    <span className={`font-semibold ${statusColor(ingresso.status_pagamento)}`}>
                      {ingresso.status_pagamento === "aprovado" && "Aprovado ✅"}
                      {ingresso.status_pagamento === "pendente" && "Pendente ⏳"}
                      {ingresso.status_pagamento === "expirado" && "Expirado ❌"}
                      {!["aprovado", "pendente", "expirado"].includes(ingresso.status_pagamento) && ingresso.status_pagamento}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-6">
              <Button
                variant="outline"
                className="border-gta-green/50 text-gta-green-light hover:bg-gta-green/10"
                onClick={() => { setIngressos([]); setBuscou(false); setErro(""); }}>
                <Search className="w-4 h-4" /> Nova consulta
              </Button>
              <Link to="/eventos/corrida-de-bar-em-bar">
                <Button variant="ghost" className="w-full text-muted-foreground">
                  <ArrowLeft className="w-4 h-4" /> Voltar ao evento
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeuIngresso;
