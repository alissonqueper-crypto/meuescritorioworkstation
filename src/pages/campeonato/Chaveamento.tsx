import { useEffect, useMemo, useState } from "react";
import CampeonatoLayout from "./_layout";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Trophy, Calendar } from "lucide-react";

interface Equipe { id: string; nome: string; grupo: number | null; }
interface Partida {
  id: string;
  fase: string;
  grupo: number | null;
  formato: string | null;
  data_hora: string | null;
  placar_a: number | null;
  placar_b: number | null;
  vencedor_id: string | null;
  equipe_a_id: string | null;
  equipe_b_id: string | null;
  equipes_a?: { nome: string } | null;
  equipes_b?: { nome: string } | null;
}

const TIMELINE = [
  { d: "09/05 (Sáb)", l: "Fase de Grupos", sub: "Grupos 1 e 3 — MD1" },
  { d: "16/05 (Sáb)", l: "Fase de Grupos", sub: "Grupos 2 e 4 — MD1" },
  { d: "17/05 (Dom)", l: "Quartas de Final", sub: "MD3 — 18:00 / 20:00" },
  { d: "30/05 (Sáb)", l: "Semis + Final", sub: "MD3 — 14h, 16h, 18h" },
];

const HORARIOS = ["16:00", "17:30", "19:00", "20:30", "22:15", "00:15"];

export default function Chaveamento() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [{ data: eqs }, { data: ps }] = await Promise.all([
      supabase.from("equipes").select("id, nome, grupo").neq("status", "cancelada").order("nome"),
      supabase
        .from("partidas")
        .select("id, fase, grupo, formato, data_hora, placar_a, placar_b, vencedor_id, equipe_a_id, equipe_b_id")
        .order("data_hora", { ascending: true, nullsFirst: false }),
    ]);
    setEquipes((eqs as any) ?? []);
    setPartidas((ps as any) ?? []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  const equipeMap = useMemo(() => {
    const m = new Map<string, Equipe>();
    equipes.forEach((e) => m.set(e.id, e));
    return m;
  }, [equipes]);

  const grupos = [1, 2, 3, 4].map((g) => ({
    g,
    equipes: equipes.filter((e) => e.grupo === g),
  }));

  function nome(id: string | null) {
    if (!id) return "—";
    return equipeMap.get(id)?.nome ?? "TBD";
  }

  function isLive(p: Partida) {
    if (!p.data_hora || p.vencedor_id) return false;
    const start = new Date(p.data_hora).getTime();
    const now = Date.now();
    return now >= start && now - start <= 60 * 60 * 1000;
  }

  // Standings simples por grupo: vitórias e saldo
  function standings(g: number) {
    const team = equipes.filter((e) => e.grupo === g);
    const stats = new Map(team.map((e) => [e.id, { v: 0, d: 0, saldo: 0, pts: 0 }]));
    partidas
      .filter((p) => p.fase === "grupo" && p.grupo === g && p.vencedor_id)
      .forEach((p) => {
        const a = stats.get(p.equipe_a_id ?? "");
        const b = stats.get(p.equipe_b_id ?? "");
        if (!a || !b) return;
        const pa = p.placar_a ?? 0, pb = p.placar_b ?? 0;
        a.saldo += pa - pb;
        b.saldo += pb - pa;
        if (p.vencedor_id === p.equipe_a_id) { a.v++; a.pts += 3; b.d++; }
        else { b.v++; b.pts += 3; a.d++; }
      });
    return team
      .map((e) => ({ ...e, ...(stats.get(e.id) ?? { v: 0, d: 0, saldo: 0, pts: 0 }) }))
      .sort((x, y) => y.pts - x.pts || y.saldo - x.saldo);
  }

  const quartas = partidas.filter((p) => p.fase === "quartas");
  const semis = partidas.filter((p) => p.fase === "semifinal");
  const final = partidas.find((p) => p.fase === "final");

  return (
    <CampeonatoLayout>
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="flex items-center justify-between">
          <h1 className="font-cs-display uppercase text-3xl md:text-4xl text-cs-text-primary">
            Chaveamento <span className="text-cs-orange">&amp; Grupos</span>
          </h1>
          <button onClick={load} className="cs-btn cs-btn-ghost" disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
          </button>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-cs-display uppercase text-cs-orange text-lg mb-4">Calendário</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIMELINE.map((t, i) => (
              <div key={i} className="cs-card p-4">
                <div className="flex items-center gap-2 text-cs-orange">
                  <Calendar className="w-4 h-4" />
                  <span className="font-cs-display uppercase tracking-wider text-sm">{t.d}</span>
                </div>
                <div className="font-cs-display text-cs-text-primary text-lg mt-2">{t.l}</div>
                <div className="text-xs text-cs-text-secondary mt-1">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Grupos */}
        <div>
          <h2 className="font-cs-display uppercase text-cs-orange text-lg mb-4">Grupos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {grupos.map(({ g }) => {
              const rows = standings(g);
              return (
                <div key={g} className="cs-card overflow-hidden">
                  <div className="bg-cs-orange text-[hsl(var(--cs-bg-primary))] px-4 py-2 font-cs-display uppercase tracking-widest font-extrabold">
                    Grupo {g}
                  </div>
                  <table className="w-full text-sm">
                    <thead className="text-cs-text-secondary uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="text-left p-3">Equipe</th>
                        <th className="p-2 text-center">V</th>
                        <th className="p-2 text-center">D</th>
                        <th className="p-2 text-center">Saldo</th>
                        <th className="p-2 text-center">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-4 text-cs-text-secondary text-center">
                            Aguardando definição
                          </td>
                        </tr>
                      ) : (
                        rows.map((r, i) => (
                          <tr key={r.id} className="border-t border-cs">
                            <td className="p-3">
                              <span className={`font-cs-num text-cs-text-secondary mr-2`}>{i + 1}.</span>
                              <span className="text-cs-text-primary">{r.nome}</span>
                            </td>
                            <td className="text-center font-cs-num">{r.v}</td>
                            <td className="text-center font-cs-num">{r.d}</td>
                            <td className={`text-center font-cs-num ${r.saldo > 0 ? "text-cs-success" : r.saldo < 0 ? "text-cs-danger" : ""}`}>
                              {r.saldo > 0 ? "+" : ""}{r.saldo}
                            </td>
                            <td className="text-center font-cs-num text-cs-orange">{r.pts}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confrontos fase de grupos */}
        <div>
          <h2 className="font-cs-display uppercase text-cs-orange text-lg mb-4">Confrontos — Fase de Grupos</h2>
          {partidas.filter((p) => p.fase === "grupo").length === 0 ? (
            <div className="cs-card p-6 text-cs-text-secondary text-sm">
              Nenhuma partida cadastrada. O admin pode gerar pelo painel.
              <div className="mt-3 text-xs">
                Horários padrão MD1 por grupo: {HORARIOS.join(" · ")}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {partidas.filter((p) => p.fase === "grupo").map((p) => (
                <div key={p.id} className="cs-card p-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    {isLive(p) && <span className="cs-badge cs-badge-danger">AO VIVO 🔴</span>}
                    <span className="cs-badge cs-badge-orange">G{p.grupo}</span>
                    <span className="font-cs-num text-cs-text-secondary text-sm">
                      {p.data_hora ? new Date(p.data_hora).toLocaleString("pt-BR") : "Sem data"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-cs-display uppercase">
                    <span className={p.vencedor_id === p.equipe_a_id ? "text-cs-orange" : "text-cs-text-primary"}>
                      {nome(p.equipe_a_id)}
                    </span>
                    <span className="font-cs-num text-2xl text-cs-text-secondary">
                      {p.placar_a ?? 0} <span className="text-cs-orange">×</span> {p.placar_b ?? 0}
                    </span>
                    <span className={p.vencedor_id === p.equipe_b_id ? "text-cs-orange" : "text-cs-text-primary"}>
                      {nome(p.equipe_b_id)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bracket */}
        <div>
          <h2 className="font-cs-display uppercase text-cs-orange text-lg mb-4">
            <Trophy className="inline w-5 h-5 mr-1 -mt-1" /> Bracket — Eliminatórias
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-cs-text-secondary mb-2">Quartas (17/05)</div>
              <div className="space-y-3">
                {[0, 1, 2, 3].map((i) => {
                  const p = quartas[i];
                  return (
                    <BracketCell key={i} p={p} nome={nome} />
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-cs-text-secondary mb-2">Semis (30/05)</div>
              <div className="space-y-3 md:mt-12">
                {[0, 1].map((i) => (
                  <BracketCell key={i} p={semis[i]} nome={nome} />
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-cs-text-secondary mb-2">Final (30/05)</div>
              <div className="md:mt-32">
                <BracketCell p={final} nome={nome} highlight />
              </div>
            </div>
          </div>
        </div>
      </section>
    </CampeonatoLayout>
  );
}

function BracketCell({
  p,
  nome,
  highlight,
}: {
  p?: Partida;
  nome: (id: string | null) => string;
  highlight?: boolean;
}) {
  if (!p) {
    return (
      <div className={`cs-card p-3 text-cs-text-secondary text-xs ${highlight ? "border-cs-orange" : ""}`}>
        TBD vs TBD
      </div>
    );
  }
  return (
    <div className={`cs-card p-3 ${highlight ? "border-cs-orange" : ""}`}>
      <div className="flex justify-between text-sm">
        <span className={p.vencedor_id === p.equipe_a_id ? "text-cs-orange font-semibold" : "text-cs-text-primary"}>
          {nome(p.equipe_a_id)}
        </span>
        <span className="font-cs-num">{p.placar_a ?? 0}</span>
      </div>
      <div className="border-t border-cs my-1" />
      <div className="flex justify-between text-sm">
        <span className={p.vencedor_id === p.equipe_b_id ? "text-cs-orange font-semibold" : "text-cs-text-primary"}>
          {nome(p.equipe_b_id)}
        </span>
        <span className="font-cs-num">{p.placar_b ?? 0}</span>
      </div>
      {p.data_hora && (
        <div className="text-[11px] text-cs-text-secondary mt-2">
          {new Date(p.data_hora).toLocaleString("pt-BR")}
        </div>
      )}
    </div>
  );
}
