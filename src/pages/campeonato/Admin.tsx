import { useEffect, useMemo, useState } from "react";
import CampeonatoLayout from "./_layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Loader2, Check, X, Trophy, Wallet, Users, Plus, Save } from "lucide-react";

const ADMIN_PASS = "cs2025admin";
const SS_KEY = "cs_admin_auth";

interface Equipe {
  id: string; nome: string; grupo: number | null; status: string | null; criado_em: string | null;
  jogadores: { id: string; nickname: string; nome: string; role: string; is_capitao: boolean | null }[];
}
interface Pagamento {
  id: string; equipe_id: string; valor: number; metodo: string | null; status: string | null;
  infinitepay_transaction_id: string | null; criado_em: string | null;
}
interface Partida {
  id: string; fase: string; grupo: number | null; data_hora: string | null;
  equipe_a_id: string | null; equipe_b_id: string | null;
  placar_a: number | null; placar_b: number | null; vencedor_id: string | null;
}

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    setAuth(sessionStorage.getItem(SS_KEY) === "1");
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pwd === ADMIN_PASS) {
      sessionStorage.setItem(SS_KEY, "1");
      setAuth(true);
    } else {
      toast.error("Senha incorreta");
    }
  }

  if (!auth) {
    return (
      <CampeonatoLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <form onSubmit={login} className="cs-card p-8 max-w-sm w-full space-y-4">
            <div className="text-center">
              <Lock className="w-8 h-8 text-cs-orange mx-auto" />
              <h1 className="font-cs-display uppercase text-2xl mt-3 text-cs-text-primary">Painel Admin</h1>
              <p className="text-cs-text-secondary text-sm mt-1">Restrito à organização</p>
            </div>
            <input
              type="password"
              autoFocus
              className="cs-input"
              placeholder="Senha"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <button className="cs-btn cs-btn-primary w-full">Entrar</button>
          </form>
        </div>
      </CampeonatoLayout>
    );
  }

  return <AdminDashboard onLogout={() => { sessionStorage.removeItem(SS_KEY); setAuth(false); }} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [maxEquipes, setMaxEquipes] = useState(16);
  const [loading, setLoading] = useState(true);
  const [openTeam, setOpenTeam] = useState<string | null>(null);
  const [scoreModal, setScoreModal] = useState<Partida | null>(null);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  async function load() {
    setLoading(true);
    const [{ data: cfg }, { data: eqs }, { data: ps }, { data: pgs }] = await Promise.all([
      supabase.from("campeonato_config").select("max_equipes").maybeSingle(),
      supabase.from("equipes").select("id, nome, grupo, status, criado_em, jogadores(id, nickname, nome, role, is_capitao)").order("criado_em"),
      supabase.from("partidas").select("*").order("data_hora", { nullsFirst: false }),
      supabase.from("pagamentos").select("*").order("criado_em", { ascending: false }),
    ]);
    setMaxEquipes(cfg?.max_equipes ?? 16);
    setEquipes((eqs as any) ?? []);
    setPartidas((ps as any) ?? []);
    setPagamentos((pgs as any) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const stats = useMemo(() => {
    const conf = equipes.filter((e) => e.status === "confirmada").length;
    const pend = equipes.filter((e) => e.status === "pendente").length;
    const receita = pagamentos.filter((p) => p.status === "aprovado").reduce((s, p) => s + Number(p.valor || 0), 0);
    return { total: equipes.length, conf, pend, receita, vagas: maxEquipes - equipes.length };
  }, [equipes, pagamentos, maxEquipes]);

  async function setStatus(id: string, status: "confirmada" | "cancelada") {
    const { error } = await supabase.from("equipes").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Atualizado");
    load();
  }
  async function setGrupo(id: string, grupo: number | null) {
    const { error } = await supabase.from("equipes").update({ grupo }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  async function marcarPago(id: string) {
    const { error } = await supabase.from("pagamentos").update({ status: "aprovado", pago_em: new Date().toISOString() }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Pagamento aprovado");
    load();
  }

  async function gerarPartidasGrupos() {
    if (!confirm("Gerar partidas round-robin para os 4 grupos? Partidas existentes não serão duplicadas.")) return;
    const novas: any[] = [];
    for (let g = 1; g <= 4; g++) {
      const team = equipes.filter((e) => e.grupo === g && e.status !== "cancelada");
      for (let i = 0; i < team.length; i++) {
        for (let j = i + 1; j < team.length; j++) {
          // Evita duplicar
          const exists = partidas.some(
            (p) => p.fase === "grupo" && p.grupo === g &&
              ((p.equipe_a_id === team[i].id && p.equipe_b_id === team[j].id) ||
                (p.equipe_a_id === team[j].id && p.equipe_b_id === team[i].id)),
          );
          if (exists) continue;
          novas.push({
            fase: "grupo", grupo: g, formato: "MD1",
            equipe_a_id: team[i].id, equipe_b_id: team[j].id,
            placar_a: 0, placar_b: 0,
          });
        }
      }
    }
    if (novas.length === 0) {
      toast("Nenhuma nova partida a gerar.");
      return;
    }
    const { error } = await supabase.from("partidas").insert(novas);
    if (error) return toast.error(error.message);
    toast.success(`${novas.length} partidas criadas`);
    load();
  }

  async function salvarPlacar() {
    if (!scoreModal) return;
    const vencedor_id = scoreA > scoreB ? scoreModal.equipe_a_id : scoreB > scoreA ? scoreModal.equipe_b_id : null;
    const { error } = await supabase.from("partidas").update({
      placar_a: scoreA, placar_b: scoreB, vencedor_id,
    }).eq("id", scoreModal.id);
    if (error) return toast.error(error.message);
    toast.success("Placar registrado");
    setScoreModal(null);
    load();
  }

  const equipeMap = new Map(equipes.map((e) => [e.id, e.nome]));

  return (
    <CampeonatoLayout>
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="font-cs-display uppercase text-3xl text-cs-text-primary">
            Painel <span className="text-cs-orange">Admin</span>
          </h1>
          <button className="cs-btn cs-btn-ghost" onClick={onLogout}>Sair</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { l: "Total inscritas", v: stats.total, Icon: Users },
            { l: "Confirmadas", v: stats.conf, Icon: Check, c: "text-cs-success" },
            { l: "Pendentes", v: stats.pend, Icon: Loader2, c: "text-cs-orange" },
            { l: "Receita", v: `R$ ${stats.receita.toFixed(2)}`, Icon: Wallet },
            { l: "Vagas livres", v: stats.vagas, Icon: Trophy },
          ].map((m) => (
            <div key={m.l} className="cs-card p-4">
              <div className="flex items-center justify-between text-cs-text-secondary text-xs uppercase tracking-widest">
                {m.l}
                <m.Icon className={`w-4 h-4 ${m.c ?? "text-cs-orange"}`} />
              </div>
              <div className="font-cs-num text-3xl text-cs-text-primary mt-2">{m.v}</div>
            </div>
          ))}
        </div>

        {/* Equipes */}
        <div>
          <h2 className="font-cs-display uppercase text-cs-orange mb-3">Equipes</h2>
          <div className="cs-card overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-cs-bg-secondary text-cs-text-secondary uppercase text-xs tracking-widest">
                <tr>
                  <th className="text-left p-3">Nome</th>
                  <th className="text-left p-3">Grupo</th>
                  <th className="text-left p-3">Jogadores</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {equipes.map((e) => (
                  <>
                    <tr key={e.id} className="border-t border-cs">
                      <td className="p-3 text-cs-text-primary">{e.nome}</td>
                      <td className="p-3">
                        <select
                          className="cs-input py-1 text-xs max-w-[110px]"
                          value={e.grupo ?? ""}
                          onChange={(ev) => setGrupo(e.id, ev.target.value ? Number(ev.target.value) : null)}
                        >
                          <option value="">—</option>
                          {[1, 2, 3, 4].map((g) => <option key={g} value={g}>Grupo {g}</option>)}
                        </select>
                      </td>
                      <td className="p-3">
                        <button className="text-cs-orange underline text-xs" onClick={() => setOpenTeam(openTeam === e.id ? null : e.id)}>
                          {e.jogadores.length} jogadores
                        </button>
                      </td>
                      <td className="p-3">
                        {e.status === "confirmada" ? <span className="cs-badge cs-badge-success">Confirmada</span>
                         : e.status === "cancelada" ? <span className="cs-badge cs-badge-danger">Cancelada</span>
                         : <span className="cs-badge cs-badge-warn">Pendente</span>}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {e.status !== "confirmada" && (
                          <button className="cs-btn cs-btn-success text-xs py-1 px-2" onClick={() => setStatus(e.id, "confirmada")}>
                            <Check className="w-3 h-3" /> Confirmar
                          </button>
                        )}
                        {e.status !== "cancelada" && (
                          <button
                            className="cs-btn cs-btn-danger text-xs py-1 px-2"
                            onClick={() => confirm(`Cancelar "${e.nome}"?`) && setStatus(e.id, "cancelada")}
                          >
                            <X className="w-3 h-3" /> Cancelar
                          </button>
                        )}
                      </td>
                    </tr>
                    {openTeam === e.id && (
                      <tr className="bg-cs-bg-secondary">
                        <td colSpan={5} className="p-3">
                          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {e.jogadores.map((j) => (
                              <div key={j.id} className="text-xs text-cs-text-secondary">
                                <span className="text-cs-text-primary font-semibold">{j.nickname}</span>
                                {j.is_capitao && <span className="text-cs-orange ml-1">★</span>}
                                <span className="ml-1">— {j.role}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {equipes.length === 0 && (
                  <tr><td colSpan={5} className="p-6 text-center text-cs-text-secondary">Nenhuma equipe inscrita</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Partidas */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-cs-display uppercase text-cs-orange">Partidas</h2>
            <button className="cs-btn cs-btn-primary text-xs" onClick={gerarPartidasGrupos}>
              <Plus className="w-3 h-3" /> Gerar fase de grupos
            </button>
          </div>
          <div className="cs-card overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-cs-bg-secondary text-cs-text-secondary uppercase text-xs tracking-widest">
                <tr>
                  <th className="text-left p-3">Data</th>
                  <th className="text-left p-3">Fase</th>
                  <th className="text-left p-3">Equipe A</th>
                  <th className="text-center p-3">Placar</th>
                  <th className="text-left p-3">Equipe B</th>
                  <th className="text-left p-3">Vencedor</th>
                  <th className="text-right p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {partidas.map((p) => (
                  <tr key={p.id} className="border-t border-cs">
                    <td className="p-3 text-cs-text-secondary text-xs">
                      {p.data_hora ? new Date(p.data_hora).toLocaleString("pt-BR") : "—"}
                    </td>
                    <td className="p-3 text-cs-text-primary">{p.fase}{p.grupo ? ` G${p.grupo}` : ""}</td>
                    <td className="p-3">{equipeMap.get(p.equipe_a_id ?? "") ?? "TBD"}</td>
                    <td className="p-3 text-center font-cs-num">{p.placar_a ?? 0} × {p.placar_b ?? 0}</td>
                    <td className="p-3">{equipeMap.get(p.equipe_b_id ?? "") ?? "TBD"}</td>
                    <td className="p-3 text-cs-orange">{equipeMap.get(p.vencedor_id ?? "") ?? "—"}</td>
                    <td className="p-3 text-right">
                      <button
                        className="cs-btn cs-btn-ghost text-xs py-1 px-2"
                        onClick={() => { setScoreModal(p); setScoreA(p.placar_a ?? 0); setScoreB(p.placar_b ?? 0); }}
                      >
                        Placar
                      </button>
                    </td>
                  </tr>
                ))}
                {partidas.length === 0 && (
                  <tr><td colSpan={7} className="p-6 text-center text-cs-text-secondary">Nenhuma partida criada</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagamentos */}
        <div>
          <h2 className="font-cs-display uppercase text-cs-orange mb-3">Pagamentos</h2>
          <div className="cs-card overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-cs-bg-secondary text-cs-text-secondary uppercase text-xs tracking-widest">
                <tr>
                  <th className="text-left p-3">Equipe</th>
                  <th className="text-left p-3">Valor</th>
                  <th className="text-left p-3">Método</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">TX ID</th>
                  <th className="text-left p-3">Data</th>
                  <th className="text-right p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((p) => (
                  <tr key={p.id} className="border-t border-cs">
                    <td className="p-3">{equipeMap.get(p.equipe_id) ?? p.equipe_id.slice(0, 8)}</td>
                    <td className="p-3 font-cs-num">R$ {Number(p.valor).toFixed(2)}</td>
                    <td className="p-3 text-cs-text-secondary">{p.metodo ?? "—"}</td>
                    <td className="p-3">
                      {p.status === "aprovado" ? <span className="cs-badge cs-badge-success">Aprovado</span>
                       : p.status === "recusado" ? <span className="cs-badge cs-badge-danger">Recusado</span>
                       : <span className="cs-badge cs-badge-warn">{p.status ?? "pendente"}</span>}
                    </td>
                    <td className="p-3 text-xs text-cs-text-secondary">{p.infinitepay_transaction_id ?? "—"}</td>
                    <td className="p-3 text-xs text-cs-text-secondary">
                      {p.criado_em ? new Date(p.criado_em).toLocaleDateString("pt-BR") : "—"}
                    </td>
                    <td className="p-3 text-right">
                      {p.status !== "aprovado" && (
                        <button className="cs-btn cs-btn-success text-xs py-1 px-2" onClick={() => marcarPago(p.id)}>
                          Marcar pago
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {pagamentos.length === 0 && (
                  <tr><td colSpan={7} className="p-6 text-center text-cs-text-secondary">Nenhum pagamento</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal placar */}
      {scoreModal && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={() => setScoreModal(null)}>
          <div className="cs-card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-cs-display uppercase text-xl text-cs-orange mb-4">Registrar placar</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-cs-text-secondary mb-1">{equipeMap.get(scoreModal.equipe_a_id ?? "") ?? "A"}</div>
                <input type="number" min={0} className="cs-input font-cs-num text-2xl text-center" value={scoreA} onChange={(e) => setScoreA(Number(e.target.value))} />
              </div>
              <div>
                <div className="text-xs text-cs-text-secondary mb-1">{equipeMap.get(scoreModal.equipe_b_id ?? "") ?? "B"}</div>
                <input type="number" min={0} className="cs-input font-cs-num text-2xl text-center" value={scoreB} onChange={(e) => setScoreB(Number(e.target.value))} />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="cs-btn cs-btn-ghost" onClick={() => setScoreModal(null)}>Cancelar</button>
              <button className="cs-btn cs-btn-primary" onClick={salvarPlacar}><Save className="w-4 h-4" /> Salvar</button>
            </div>
          </div>
        </div>
      )}
    </CampeonatoLayout>
  );
}
