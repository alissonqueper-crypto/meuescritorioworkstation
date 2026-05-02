import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import CampeonatoLayout from "./_layout";
import { Check, ChevronLeft, ChevronRight, Plus, Trash2, Star, Loader2, Copy, QrCode, CreditCard, Link2 } from "lucide-react";

type Role = "entry_fragger" | "awper" | "rifler" | "support" | "compleat";
type Method = "pix" | "cartao_credito" | "link";

interface Player {
  nome: string;
  nickname: string;
  email: string;
  telefone: string;
  role: Role;
  gc_nick: string;
  is_capitao: boolean;
}

const ROLES: { v: Role; l: string }[] = [
  { v: "entry_fragger", l: "Entry Fragger" },
  { v: "awper", l: "AWPer" },
  { v: "rifler", l: "Rifler" },
  { v: "support", l: "Support" },
  { v: "compleat", l: "Compleat" },
];

const VALOR = 40.0;

const teamSchema = z.object({
  nome: z.string().trim().min(2, "Nome muito curto").max(100, "Máximo 100 caracteres"),
  gc_id: z.string().trim().max(60).optional().or(z.literal("")),
});

const playerSchema = z.object({
  nome: z.string().trim().min(2, "Nome obrigatório").max(100),
  nickname: z.string().trim().min(2, "Nickname obrigatório").max(40),
  role: z.enum(["entry_fragger", "awper", "rifler", "support", "compleat"]),
});

const captainSchema = playerSchema.extend({
  email: z.string().trim().email("E-mail inválido").max(120),
  telefone: z.string().trim().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone (99) 99999-9999"),
});

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function emptyPlayer(captain = false): Player {
  return { nome: "", nickname: "", email: "", telefone: "", role: "rifler", gc_nick: "", is_capitao: captain };
}

export default function Inscricao() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [vagas, setVagas] = useState<{ usadas: number; max: number } | null>(null);

  const [team, setTeam] = useState({ nome: "", gc_id: "" });
  const [players, setPlayers] = useState<Player[]>([
    emptyPlayer(true),
    emptyPlayer(),
    emptyPlayer(),
    emptyPlayer(),
    emptyPlayer(),
  ]);
  const [accept, setAccept] = useState(false);
  const [method, setMethod] = useState<Method | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{ checkout_url?: string; pix_copia_cola?: string } | null>(null);

  useEffect(() => {
    (async () => {
      const [{ count }, { data: cfg }] = await Promise.all([
        supabase.from("equipes").select("*", { count: "exact", head: true }).neq("status", "cancelada"),
        supabase.from("campeonato_config").select("max_equipes").maybeSingle(),
      ]);
      setVagas({ usadas: count ?? 0, max: cfg?.max_equipes ?? 16 });
    })();
  }, []);

  const captainCount = players.filter((p) => p.is_capitao).length;

  function setCaptain(idx: number) {
    setPlayers((prev) => prev.map((p, i) => ({ ...p, is_capitao: i === idx })));
  }

  function addPlayer() {
    if (players.length >= 6) return;
    setPlayers([...players, emptyPlayer()]);
  }
  function removePlayer(i: number) {
    if (players.length <= 5) return;
    const copy = [...players];
    const wasCap = copy[i].is_capitao;
    copy.splice(i, 1);
    if (wasCap && copy.length) copy[0].is_capitao = true;
    setPlayers(copy);
  }

  function validateStep(s: number): boolean {
    if (s === 1) {
      const r = teamSchema.safeParse(team);
      if (!r.success) {
        toast.error(r.error.issues[0].message);
        return false;
      }
      if (vagas && vagas.usadas >= vagas.max) {
        toast.error("Não há vagas restantes.");
        return false;
      }
      return true;
    }
    if (s === 2) {
      if (captainCount !== 1) {
        toast.error("Selecione exatamente 1 capitão.");
        return false;
      }
      for (let i = 0; i < players.length; i++) {
        const p = players[i];
        const sch = p.is_capitao ? captainSchema : playerSchema;
        const r = sch.safeParse(p);
        if (!r.success) {
          toast.error(`Jogador ${i + 1}: ${r.error.issues[0].message}`);
          return false;
        }
      }
      return true;
    }
    if (s === 3) {
      if (!accept) {
        toast.error("Aceite as regras para continuar.");
        return false;
      }
      return true;
    }
    return true;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(4, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit() {
    if (!method) {
      toast.error("Escolha uma forma de pagamento.");
      return;
    }
    setSubmitting(true);
    setPaymentResult(null);
    try {
      // 1. Cria equipe
      const { data: equipe, error: e1 } = await supabase
        .from("equipes")
        .insert({
          nome: team.nome.trim(),
          gc_id: team.gc_id.trim() || null,
          lote: 1,
          valor_inscricao: VALOR,
          status: "pendente",
        })
        .select("id")
        .single();
      if (e1 || !equipe) throw e1 || new Error("Falha ao criar equipe");

      // 2. Cria jogadores
      const { error: e2 } = await supabase.from("jogadores").insert(
        players.map((p) => ({
          equipe_id: equipe.id,
          nome: p.nome.trim(),
          nickname: p.nickname.trim(),
          email: p.email.trim() || null,
          telefone: p.telefone.trim() || null,
          role: p.role,
          gc_nick: p.gc_nick.trim() || null,
          is_capitao: p.is_capitao,
        })),
      );
      if (e2) throw e2;

      // 3. Pagamento via edge function
      const { data: pay, error: e3 } = await supabase.functions.invoke("inscricao-pagamento", {
        body: { equipe_id: equipe.id, valor: VALOR, metodo: method, equipe_nome: team.nome.trim() },
      });
      if (e3) throw e3;

      setPaymentResult(pay as any);
      toast.success(`Equipe inscrita! Nº ${equipe.id.slice(0, 8).toUpperCase()}`);

      if (method === "cartao_credito" && pay?.checkout_url) {
        setTimeout(() => {
          window.location.href = pay.checkout_url;
        }, 1200);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? "Erro ao inscrever equipe");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <CampeonatoLayout>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-cs-display uppercase text-3xl md:text-4xl text-cs-text-primary">
          Inscrição da <span className="text-cs-orange">Equipe</span>
        </h1>

        {/* Progress */}
        <div className="mt-6 mb-10">
          <div className="flex items-center justify-between mb-2 text-xs uppercase tracking-widest text-cs-text-secondary">
            {["Equipe", "Jogadores", "Resumo", "Pagamento"].map((l, i) => (
              <span key={l} className={step >= i + 1 ? "text-cs-orange" : ""}>
                {i + 1}. {l}
              </span>
            ))}
          </div>
          <div className="h-1.5 rounded bg-cs-bg-secondary overflow-hidden">
            <div
              className="h-full bg-cs-orange transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="cs-card p-6 md:p-8">
          {step === 1 && (
            <div className="cs-slide-in space-y-5">
              <h2 className="font-cs-display uppercase text-xl text-cs-orange">Dados da equipe</h2>

              <div>
                <label className="text-sm text-cs-text-secondary uppercase tracking-wider">Nome da equipe *</label>
                <input
                  className="cs-input mt-1"
                  maxLength={100}
                  value={team.nome}
                  onChange={(e) => setTeam({ ...team, nome: e.target.value })}
                  placeholder="Ex: TEAM REGIONAL"
                />
              </div>

              <div>
                <label className="text-sm text-cs-text-secondary uppercase tracking-wider">Nick/tag no GC (opcional)</label>
                <input
                  className="cs-input mt-1"
                  maxLength={60}
                  value={team.gc_id}
                  onChange={(e) => setTeam({ ...team, gc_id: e.target.value })}
                  placeholder="Ex: TR.GC"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="cs-card p-4">
                  <div className="text-xs uppercase tracking-widest text-cs-text-secondary">Lote atual</div>
                  <div className="font-cs-display text-2xl text-cs-orange mt-1">LOTE 1</div>
                  <div className="text-sm text-cs-text-secondary mt-1">
                    Valor: <span className="font-cs-num text-cs-text-primary">R$ 40,00</span>
                  </div>
                </div>
                <div className="cs-card p-4">
                  <div className="text-xs uppercase tracking-widest text-cs-text-secondary">Vagas restantes</div>
                  <div className="font-cs-num text-3xl text-cs-text-primary mt-1">
                    {vagas ? Math.max(0, vagas.max - vagas.usadas) : "..."}
                    <span className="text-cs-text-secondary text-base">/{vagas?.max ?? 16}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="cs-slide-in space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-cs-display uppercase text-xl text-cs-orange">Jogadores ({players.length}/6)</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="cs-btn cs-btn-ghost"
                    onClick={addPlayer}
                    disabled={players.length >= 6}
                  >
                    <Plus className="w-4 h-4" /> Adicionar
                  </button>
                </div>
              </div>

              {players.map((p, i) => (
                <div key={i} className="cs-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-cs-display uppercase text-sm tracking-widest text-cs-text-secondary">
                      Jogador {i + 1} {p.is_capitao && <span className="text-cs-orange ml-1">★ Capitão</span>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className={`cs-btn ${p.is_capitao ? "cs-btn-primary" : "cs-btn-ghost"}`}
                        onClick={() => setCaptain(i)}
                      >
                        <Star className="w-3.5 h-3.5" /> Capitão
                      </button>
                      {players.length > 5 && (
                        <button
                          type="button"
                          className="cs-btn cs-btn-ghost"
                          onClick={() => removePlayer(i)}
                          aria-label="Remover"
                        >
                          <Trash2 className="w-4 h-4 text-cs-danger" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      className="cs-input"
                      placeholder="Nome completo *"
                      value={p.nome}
                      onChange={(e) => setPlayers(players.map((x, j) => (j === i ? { ...x, nome: e.target.value } : x)))}
                    />
                    <input
                      className="cs-input"
                      placeholder="Nickname in-game *"
                      value={p.nickname}
                      onChange={(e) => setPlayers(players.map((x, j) => (j === i ? { ...x, nickname: e.target.value } : x)))}
                    />
                    <input
                      className="cs-input"
                      placeholder={p.is_capitao ? "E-mail * (capitão)" : "E-mail (opcional)"}
                      type="email"
                      value={p.email}
                      onChange={(e) => setPlayers(players.map((x, j) => (j === i ? { ...x, email: e.target.value } : x)))}
                    />
                    <input
                      className="cs-input"
                      placeholder={p.is_capitao ? "Telefone * (99) 99999-9999" : "Telefone (opcional)"}
                      value={p.telefone}
                      onChange={(e) =>
                        setPlayers(players.map((x, j) => (j === i ? { ...x, telefone: maskPhone(e.target.value) } : x)))
                      }
                    />
                    <select
                      className="cs-input"
                      value={p.role}
                      onChange={(e) =>
                        setPlayers(players.map((x, j) => (j === i ? { ...x, role: e.target.value as Role } : x)))
                      }
                    >
                      {ROLES.map((r) => (
                        <option key={r.v} value={r.v}>
                          {r.l}
                        </option>
                      ))}
                    </select>
                    <input
                      className="cs-input"
                      placeholder="Nick no GC (opcional)"
                      value={p.gc_nick}
                      onChange={(e) =>
                        setPlayers(players.map((x, j) => (j === i ? { ...x, gc_nick: e.target.value } : x)))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="cs-slide-in space-y-5">
              <h2 className="font-cs-display uppercase text-xl text-cs-orange">Resumo</h2>

              <div className="cs-card p-4">
                <div className="text-xs uppercase tracking-widest text-cs-text-secondary">Equipe</div>
                <div className="font-cs-display text-2xl text-cs-text-primary mt-1">{team.nome}</div>
                {team.gc_id && <div className="text-sm text-cs-text-secondary">GC: {team.gc_id}</div>}
              </div>

              <div className="cs-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-cs-bg-secondary text-cs-text-secondary uppercase text-xs tracking-wider">
                    <tr>
                      <th className="text-left p-3">Nick</th>
                      <th className="text-left p-3">Nome</th>
                      <th className="text-left p-3">Role</th>
                      <th className="p-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, i) => (
                      <tr key={i} className="border-t border-cs">
                        <td className="p-3 text-cs-text-primary font-semibold">{p.nickname}</td>
                        <td className="p-3 text-cs-text-secondary">{p.nome}</td>
                        <td className="p-3 text-cs-text-secondary">
                          {ROLES.find((r) => r.v === p.role)?.l}
                        </td>
                        <td className="p-3 text-right">
                          {p.is_capitao && <span className="cs-badge cs-badge-orange">★ Cap</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center cs-card p-4">
                <div className="uppercase tracking-widest text-sm text-cs-text-secondary">Total</div>
                <div className="font-cs-num text-3xl text-cs-orange">R$ 40,00</div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 accent-[hsl(var(--cs-accent-orange))]"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                />
                <span className="text-sm text-cs-text-secondary">
                  Confirmo que li e aceito as regras do campeonato.
                </span>
              </label>
            </div>
          )}

          {step === 4 && (
            <div className="cs-slide-in space-y-5">
              <h2 className="font-cs-display uppercase text-xl text-cs-orange">Pagamento</h2>

              <div className="grid sm:grid-cols-3 gap-3">
                {([
                  { v: "pix", Icon: QrCode, l: "PIX" },
                  { v: "cartao_credito", Icon: CreditCard, l: "Cartão" },
                  { v: "link", Icon: Link2, l: "Link" },
                ] as { v: Method; Icon: any; l: string }[]).map(({ v, Icon, l }) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setMethod(v)}
                    className={`cs-card p-5 text-center transition ${
                      method === v ? "border-cs-orange ring-2 ring-cs-orange/40" : ""
                    }`}
                  >
                    <Icon className="w-7 h-7 mx-auto text-cs-orange" />
                    <div className="mt-3 font-cs-display uppercase text-cs-text-primary">{l}</div>
                  </button>
                ))}
              </div>

              {submitting && (
                <div className="flex items-center gap-3 text-cs-text-secondary">
                  <Loader2 className="w-5 h-5 animate-spin text-cs-orange" />
                  Processando inscrição e pagamento...
                </div>
              )}

              {paymentResult?.pix_copia_cola && (
                <div className="cs-card p-4 space-y-3">
                  <div className="text-xs uppercase tracking-widest text-cs-text-secondary">PIX Copia e Cola</div>
                  <div className="text-xs text-cs-text-primary break-all bg-cs-bg-secondary p-3 rounded">
                    {paymentResult.pix_copia_cola}
                  </div>
                  <button
                    type="button"
                    className="cs-btn cs-btn-outline"
                    onClick={() => {
                      navigator.clipboard.writeText(paymentResult.pix_copia_cola!);
                      toast.success("PIX copiado!");
                    }}
                  >
                    <Copy className="w-4 h-4" /> Copiar
                  </button>
                </div>
              )}

              {paymentResult?.checkout_url && method === "link" && (
                <div className="cs-card p-4 space-y-3">
                  <div className="text-xs uppercase tracking-widest text-cs-text-secondary">Link de pagamento</div>
                  <a
                    href={paymentResult.checkout_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cs-orange break-all underline text-sm"
                  >
                    {paymentResult.checkout_url}
                  </a>
                  <button
                    type="button"
                    className="cs-btn cs-btn-outline"
                    onClick={() => {
                      navigator.clipboard.writeText(paymentResult.checkout_url!);
                      toast.success("Link copiado!");
                    }}
                  >
                    <Copy className="w-4 h-4" /> Copiar link
                  </button>
                </div>
              )}

              {paymentResult && (
                <div className="flex gap-3">
                  <button className="cs-btn cs-btn-ghost" onClick={() => navigate("/campeonato/equipes")}>
                    Ver equipes inscritas
                  </button>
                </div>
              )}

              {!paymentResult && (
                <button
                  type="button"
                  className="cs-btn cs-btn-success w-full text-base"
                  disabled={!method || submitting}
                  onClick={submit}
                >
                  <Check className="w-4 h-4" /> Confirmar Inscrição
                </button>
              )}
            </div>
          )}

          {/* Footer nav */}
          {step < 4 && (
            <div className="flex justify-between mt-8">
              <button type="button" className="cs-btn cs-btn-ghost" onClick={prev} disabled={step === 1}>
                <ChevronLeft className="w-4 h-4" /> Voltar
              </button>
              <button type="button" className="cs-btn cs-btn-primary" onClick={next}>
                Avançar <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </CampeonatoLayout>
  );
}
