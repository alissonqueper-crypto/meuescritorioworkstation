import { useEffect, useMemo, useState } from "react";
import CampeonatoLayout from "./_layout";
import { supabase } from "@/integrations/supabase/client";
import { Users, ChevronDown, ChevronUp, Star } from "lucide-react";

const ROLE_LABELS: Record<string, { l: string; icon: string }> = {
  entry_fragger: { l: "Entry Fragger", icon: "🎯" },
  awper: { l: "AWPer", icon: "🔭" },
  rifler: { l: "Rifler", icon: "🔫" },
  support: { l: "Support", icon: "🛡️" },
  compleat: { l: "Compleat", icon: "⚙️" },
};

interface Equipe {
  id: string;
  nome: string;
  grupo: number | null;
  status: string | null;
  gc_id: string | null;
  criado_em: string | null;
  jogadores: {
    id: string;
    nome: string;
    nickname: string;
    role: string;
    is_capitao: boolean | null;
  }[];
}

export default function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxEquipes, setMax] = useState(16);
  const [grupoFilter, setGrupoFilter] = useState<string>("todos");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [openId, setOpenId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const [{ data: cfg }, { data: eqs }] = await Promise.all([
      supabase.from("campeonato_config").select("max_equipes").maybeSingle(),
      supabase
        .from("equipes")
        .select("id, nome, grupo, status, gc_id, criado_em, jogadores(id, nome, nickname, role, is_capitao)")
        .neq("status", "cancelada")
        .order("criado_em", { ascending: true }),
    ]);
    setMax(cfg?.max_equipes ?? 16);
    setEquipes((eqs as any) ?? []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return equipes.filter((e) => {
      if (grupoFilter !== "todos" && String(e.grupo ?? "") !== grupoFilter) return false;
      if (statusFilter !== "todos" && e.status !== statusFilter) return false;
      return true;
    });
  }, [equipes, grupoFilter, statusFilter]);

  const total = equipes.length;
  const pct = Math.min(100, (total / maxEquipes) * 100);

  return (
    <CampeonatoLayout>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="cs-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-cs-text-secondary">Inscrições</div>
              <div className="font-cs-display text-3xl text-cs-text-primary mt-1">
                <span className="text-cs-orange font-cs-num">{total}</span> equipes inscritas{" "}
                <span className="text-cs-text-secondary text-base">de {maxEquipes} vagas</span>
              </div>
            </div>
            <Users className="w-10 h-10 text-cs-orange" />
          </div>
          <div className="h-2 rounded bg-cs-bg-secondary overflow-hidden mt-4">
            <div className="h-full bg-cs-orange transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <select className="cs-input max-w-[200px]" value={grupoFilter} onChange={(e) => setGrupoFilter(e.target.value)}>
            <option value="todos">Todos os grupos</option>
            <option value="1">Grupo 1</option>
            <option value="2">Grupo 2</option>
            <option value="3">Grupo 3</option>
            <option value="4">Grupo 4</option>
          </select>
          <select className="cs-input max-w-[220px]" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="todos">Todos os status</option>
            <option value="confirmada">Confirmada</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>

        {loading ? (
          <div className="text-cs-text-secondary">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="cs-card p-10 text-center text-cs-text-secondary">
            Nenhuma equipe encontrada.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((e) => {
              const cap = e.jogadores.find((j) => j.is_capitao);
              const open = openId === e.id;
              return (
                <div key={e.id} className="cs-card p-5 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-cs-display text-xl text-cs-text-primary uppercase leading-tight">
                        {e.nome}
                      </div>
                      {e.gc_id && <div className="text-xs text-cs-text-secondary mt-0.5">GC: {e.gc_id}</div>}
                    </div>
                    {e.grupo != null && <span className="cs-badge cs-badge-orange">Grupo {e.grupo}</span>}
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-cs-text-secondary text-sm">
                    {Array.from({ length: e.jogadores.length }).map((_, i) => (
                      <Users key={i} className="w-3.5 h-3.5 text-cs-orange" />
                    ))}
                    <span className="ml-1 font-cs-num text-cs-text-primary">{e.jogadores.length}</span>
                  </div>

                  {cap && (
                    <div className="mt-2 text-sm text-cs-text-secondary">
                      Capitão: <span className="text-cs-text-primary font-semibold">{cap.nickname}</span>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    {e.status === "confirmada" ? (
                      <span className="cs-badge cs-badge-success">Confirmada</span>
                    ) : (
                      <span className="cs-badge cs-badge-warn">Pendente</span>
                    )}
                    {e.criado_em && (
                      <span className="text-[11px] text-cs-text-secondary">
                        {new Date(e.criado_em).toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </div>

                  <button
                    className="mt-4 cs-btn cs-btn-ghost text-xs"
                    onClick={() => setOpenId(open ? null : e.id)}
                  >
                    {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {open ? "Ocultar jogadores" : "Ver jogadores"}
                  </button>

                  {open && (
                    <div className="mt-3 border-t border-cs pt-3 space-y-2 text-sm">
                      {e.jogadores.map((j) => {
                        const r = ROLE_LABELS[j.role];
                        return (
                          <div key={j.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>{r?.icon ?? "🎮"}</span>
                              <span className="text-cs-text-primary font-semibold">{j.nickname}</span>
                              <span className="text-cs-text-secondary text-xs">— {r?.l ?? j.role}</span>
                            </div>
                            {j.is_capitao && <Star className="w-3.5 h-3.5 text-cs-orange fill-current" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </CampeonatoLayout>
  );
}
