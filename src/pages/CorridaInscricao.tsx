import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";

const CorridaInscricao = () => {
  const [searchParams] = useSearchParams();
  const orderNsu = searchParams.get("order_nsu");
  const tipo = searchParams.get("tipo");
  const { toast } = useToast();

  const [form, setForm] = useState({ nome: "", telefone: "", indicacao: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; numero_placa: number; nome: string; tipo_ingresso: string } | null>(null);

  if (!orderNsu || !tipo) {
    return (
      <div className="bg-gta-gradient min-h-screen flex items-center justify-center px-4">
        <div className="gta-mission-card rounded-2xl p-8 max-w-md w-full text-center">
          <AlertTriangle className="w-12 h-12 text-gta-gold mx-auto mb-4" />
          <h1 className="font-gta-title text-xl text-gta-gradient mb-3">Link inválido</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Este link de inscrição não é válido. Certifique-se de que completou o pagamento antes de acessar esta página.
          </p>
          <Link to="/eventos/corrida-de-bar-em-bar">
            <Button className="btn-gta rounded-lg">Voltar para o evento</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="bg-gta-gradient min-h-screen flex items-center justify-center px-4">
        <div className="gta-mission-card rounded-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-gta-green-light mx-auto mb-4" />
          <h1 className="font-gta-title text-2xl text-gta-gradient mb-2">Missão Aceita!</h1>
          <p className="text-muted-foreground text-sm mb-6">Inscrição confirmada com sucesso.</p>

          <div className="bg-gta-card rounded-xl p-6 space-y-3 text-left mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Nome</span>
              <span className="text-foreground text-sm font-medium">{result.nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Ingresso</span>
              <span className="text-foreground text-sm font-medium">
                {result.tipo_ingresso === "masculino" ? "CJ Hardcore" : "Sweet Light"}
              </span>
            </div>
            {result.numero_placa > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Número</span>
                <span className="text-gta-green-light text-lg font-bold font-gta-hud">{result.numero_placa}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/meu-ingresso">
              <Button className="w-full btn-gta rounded-lg">🎫 Ver meu ingresso</Button>
            </Link>
            <Link to="/eventos/corrida-de-bar-em-bar">
              <Button variant="outline" className="w-full border-gta-green/50 text-gta-green-light hover:bg-gta-green/10 rounded-lg">
                Voltar ao evento
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("register-participant", {
        body: {
          order_nsu: orderNsu,
          tipo_ingresso: tipo,
          nome: form.nome,
          telefone: form.telefone,
          indicacao: form.indicacao,
        },
      });

      if (error) throw new Error("Erro ao registrar inscrição.");

      if (data?.duplicate) {
        toast({
          title: "Inscrição já registrada",
          description: "Este pedido já foi registrado anteriormente.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!data?.success) {
        throw new Error(data?.error || "Erro ao registrar.");
      }

      setResult(data);
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
    <div className="bg-gta-gradient min-h-screen flex items-center justify-center px-4 py-24">
      <div className="gta-mission-card rounded-2xl p-6 md:p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <span className="gta-hud-chip rounded px-3 py-1 text-[10px] tracking-widest mb-3 inline-block font-gta-hud font-bold italic uppercase">
            PAGAMENTO CONFIRMADO
          </span>
          <h1 className="font-gta-title text-xl md:text-2xl text-gta-gradient mb-2">
            Complete sua inscrição
          </h1>
          <p className="text-muted-foreground text-sm">
            Preencha seus dados para finalizar a inscrição na Corrida de Bar em Bar.
          </p>
        </div>

        <div className="bg-gta-card rounded-xl p-3 mb-6 text-center">
          <span className="text-xs text-muted-foreground">Ingresso: </span>
          <span className="text-sm font-medium text-gta-green-light">
            {tipo === "masculino" ? "CJ Hardcore (R$ 110,00)" : "Sweet Light (R$ 55,00)"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              required
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone / WhatsApp</Label>
            <Input
              id="telefone"
              required
              placeholder="(49) 99999-9999"
              value={form.telefone}
              onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="indicacao">Como ficou sabendo?</Label>
            <Select value={form.indicacao} onValueChange={(value) => setForm((f) => ({ ...f, indicacao: value }))} required>
              <SelectTrigger id="indicacao" className="w-full">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Cena Indie Bar">Cena Indie Bar</SelectItem>
                <SelectItem value="Meu Escritório – Workstation">Meu Escritório – Workstation</SelectItem>
                <SelectItem value="Oeste Pub">Oeste Pub</SelectItem>
                <SelectItem value="Galgo">Galgo</SelectItem>
                <SelectItem value="Pix">Pix</SelectItem>
                <SelectItem value="Pulse">Pulse</SelectItem>
                <SelectItem value="Império Hamburgueria">Império Hamburgueria</SelectItem>
                <SelectItem value="Bravo Pub">Bravo Pub</SelectItem>
                <SelectItem value="Kazah Oz">Kazah Oz</SelectItem>
                <SelectItem value="Garagem Bar e Lanchonete">Garagem Bar e Lanchonete</SelectItem>
                <SelectItem value="O Boteco dos Amigos">O Boteco dos Amigos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full btn-gta rounded-lg py-3" disabled={loading || !form.indicacao}>
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Registrando...</> : "Confirmar inscrição"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CorridaInscricao;
