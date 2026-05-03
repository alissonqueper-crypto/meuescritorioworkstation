import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hls from "hls.js";
import { supabase } from "@/integrations/supabase/client";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Role = "entry_fragger" | "awper" | "rifler" | "support" | "compleat";

interface Jogador {
  nome: string;
  nickname: string;
  email: string;
  telefone: string;
  role: Role;
  isCapitao: boolean;
  gcNick: string;
}

interface FormState {
  nomeEquipe: string;
  gcId: string;
  jogadores: Jogador[];
  metodoPagamento: "pix" | "cartao" | "link" | "";
}

const ROLES: { value: Role; label: string; icon: string }[] = [
  { value: "entry_fragger", label: "Entry Fragger", icon: "🎯" },
  { value: "awper", label: "AWPer", icon: "🔭" },
  { value: "rifler", label: "Rifler", icon: "🔫" },
  { value: "support", label: "Support", icon: "🛡️" },
  { value: "compleat", label: "Compleat", icon: "⚙️" },
];

const VIDEOS_CS2 = [
  "https://video.akamai.steamstatic.com/store_trailers/730/612468/aa5a28c78f12232e6b6839034550c28b162fad3e/1748810724/hls_264_master.m3u8",
  "https://video.akamai.steamstatic.com/store_trailers/730/607867/ed6e0afecb45c615095cf8d84cec9d31659a3cc7/1748810722/hls_264_master.m3u8",
  "https://video.akamai.steamstatic.com/store_trailers/730/608984/a3ae9d5b8de21282056059ca5e851a063a253a55/1748810722/hls_264_master.m3u8",
  "https://video.akamai.steamstatic.com/store_trailers/730/607847/d73c6346bc3bf5dbc6d66a8f721bab640fa3d37c/1748810721/hls_264_master.m3u8",
];

const FALLBACK_BG =
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/page_bg_raw.jpg";

const jogadorVazio = (): Jogador => ({
  nome: "",
  nickname: "",
  email: "",
  telefone: "",
  role: "entry_fragger",
  isCapitao: false,
  gcNick: "",
});

// ─── COUNTDOWN HOOK ──────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [time, setTime] = useState({ dias: 0, horas: 0, min: 0, seg: 0, ended: false });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ dias: 0, horas: 0, min: 0, seg: 0, ended: true });
        return;
      }
      setTime({
        dias: Math.floor(diff / 86400000),
        horas: Math.floor((diff % 86400000) / 3600000),
        min: Math.floor((diff % 3600000) / 60000),
        seg: Math.floor((diff % 60000) / 1000),
        ended: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

// ─── VIDEO BACKGROUND ────────────────────────────────────────────────────────
function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = VIDEOS_CS2[videoIndex];
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true, startLevel: -1 });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.play().catch(() => {});
    }

    const interval = setInterval(() => {
      setVideoIndex((i) => (i + 1) % VIDEOS_CS2.length);
    }, 90000);

    return () => {
      clearInterval(interval);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [videoIndex]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={FALLBACK_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Color/contrast overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      {/* Scanlines CRT */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function InscricaoCS() {
  const [step, setStep] = useState(1);
  const [vagasUsadas, setVagasUsadas] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erroGlobal, setErroGlobal] = useState("");
  const [aceito, setAceito] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState<FormState>({
    nomeEquipe: "",
    gcId: "",
    jogadores: Array.from({ length: 5 }, jogadorVazio),
    metodoPagamento: "",
  });

  const TARGET_DATE = new Date("2026-05-09T16:00:00-03:00");
  const countdown = useCountdown(TARGET_DATE);
  const MAX_VAGAS = 16;
  const vagasRestantes = Math.max(0, MAX_VAGAS - vagasUsadas);

  useEffect(() => {
    (async () => {
      try {
        const { count } = await supabase
          .from("equipes")
          .select("*", { count: "exact", head: true })
          .neq("status", "cancelada");
        if (count !== null && count !== undefined) setVagasUsadas(count);
      } catch {
        /* noop */
      }
    })();
  }, []);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth" });

  const setJogador = (
    index: number,
    field: keyof Jogador,
    value: string | boolean
  ) => {
    setForm((prev) => {
      const jogadores = prev.jogadores.map((j) => ({ ...j }));
      (jogadores[index] as any)[field] = value;
      if (field === "isCapitao" && value === true) {
        jogadores.forEach((j, i) => {
          if (i !== index) j.isCapitao = false;
        });
      }
      return { ...prev, jogadores };
    });
  };

  const adicionarJogador = () => {
    if (form.jogadores.length < 6)
      setForm((p) => ({ ...p, jogadores: [...p.jogadores, jogadorVazio()] }));
  };
  const removerJogador = (i: number) => {
    if (form.jogadores.length > 5)
      setForm((p) => ({
        ...p,
        jogadores: p.jogadores.filter((_, idx) => idx !== i),
      }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErroGlobal("");
    try {
      const { data: equipe, error: errEquipe } = await supabase
        .from("equipes")
        .insert({
          nome: form.nomeEquipe,
          gc_id: form.gcId || null,
          status: "pendente",
          lote: 1,
          valor_inscricao: 40,
        })
        .select()
        .single();
      if (errEquipe) throw new Error(errEquipe.message);

      const jogadoresPayload = form.jogadores.map((j) => ({
        equipe_id: equipe.id,
        nome: j.nome,
        nickname: j.nickname,
        email: j.email || null,
        telefone: j.telefone || null,
        role: j.role,
        is_capitao: j.isCapitao,
        gc_nick: j.gcNick || null,
      }));
      const { error: errJ } = await supabase
        .from("jogadores")
        .insert(jogadoresPayload);
      if (errJ) throw new Error(errJ.message);

      const metodoMap = {
        pix: "pix",
        cartao: "cartao_credito",
        link: "link",
      } as const;
      await supabase.from("pagamentos").insert({
        equipe_id: equipe.id,
        valor: 40,
        metodo: metodoMap[form.metodoPagamento as keyof typeof metodoMap],
        status: "pendente",
      });

      setSucesso(true);
    } catch (e: any) {
      setErroGlobal(e.message || "Erro ao enviar inscrição.");
    } finally {
      setLoading(false);
    }
  };

  const podeAvancar1 = form.nomeEquipe.trim().length >= 3;
  const podeAvancar2 =
    form.jogadores.every((j) => j.nome && j.nickname && j.role) &&
    form.jogadores.some((j) => j.isCapitao) &&
    form.jogadores.find((j) => j.isCapitao)?.email &&
    form.jogadores.find((j) => j.isCapitao)?.telefone;
  const podeSubmit = form.metodoPagamento !== "" && aceito;

  // ── SUCCESS SCREEN ──
  if (sucesso) {
    return (
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="text-7xl mb-6 animate-bounce">🏆</div>
          <div className="h-px w-24 bg-orange-500 mb-6" />
          <h1 className="font-gta-title text-4xl md:text-6xl text-orange-500 mb-4 tracking-wider">
            INSCRIÇÃO REALIZADA!
          </h1>
          <p className="text-lg text-white/80 mb-2 max-w-xl">
            Equipe <span className="text-orange-400 font-bold">{form.nomeEquipe}</span> inscrita com sucesso.
          </p>
          <p className="text-sm text-white/60 mb-10 max-w-md">
            Em breve você receberá confirmação por e-mail. Boa sorte no campeonato!
          </p>
          <Link
            to="/"
            className="font-gta tracking-widest px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-colors"
          >
            VOLTAR AO INÍCIO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <VideoBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-orange-500/40 bg-orange-500/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-orange-300 font-sans">
              3ª Edição · Caçador-SC · 2026
            </span>
          </div>

          {/* Title */}
          <h1 className="font-gta-title leading-[0.9] mb-6">
            <span className="block text-5xl md:text-7xl text-white">CAMPEONATO</span>
            <span className="block text-5xl md:text-8xl text-orange-500 drop-shadow-[0_0_30px_rgba(255,107,0,0.5)]">
              DE CS REGIONAL
            </span>
          </h1>

          <p className="text-white/70 text-sm md:text-base tracking-[0.25em] uppercase font-sans mb-8">
            Counter-Strike 2 · Plataforma GC · 5v5 Competitivo
          </p>

          <div className="h-px w-32 bg-orange-500/60 mx-auto mb-10" />

          {/* Countdown */}
          {countdown.ended ? (
            <div className="flex items-center justify-center gap-2 text-orange-500 font-gta tracking-widest text-xl md:text-2xl mb-10 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> EVENTO EM ANDAMENTO
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
              {[
                { v: countdown.dias, l: "DIAS" },
                { v: countdown.horas, l: "HORAS" },
                { v: countdown.min, l: "MIN" },
                { v: countdown.seg, l: "SEG" },
              ].map((item, i) => (
                <div key={item.l} className="flex items-center gap-2 md:gap-4">
                  <div className="text-center min-w-[60px] md:min-w-[88px] border border-white/10 bg-black/50 backdrop-blur-sm px-3 py-3">
                    <div className="font-display text-3xl md:text-5xl font-bold text-orange-500 leading-none">
                      {String(item.v).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-2 font-sans">
                      {item.l}
                    </div>
                  </div>
                  {i < 3 && <span className="font-display text-2xl md:text-4xl text-orange-500/40">:</span>}
                </div>
              ))}
            </div>
          )}

          {/* Vagas */}
          <div className="max-w-md mx-auto mb-10">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest mb-2 font-sans">
              <span className="text-white/60">VAGAS DISPONÍVEIS</span>
              <span className={vagasRestantes <= 4 ? "text-red-400 font-bold" : "text-orange-400 font-bold"}>
                {vagasRestantes <= 4 ? "⚡ ÚLTIMAS VAGAS!" : `${vagasRestantes} / ${MAX_VAGAS}`}
              </span>
            </div>
            <div className="h-2 bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-700"
                style={{ width: `${(vagasUsadas / MAX_VAGAS) * 100}%` }}
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto font-gta tracking-widest text-base px-8 py-4 bg-orange-500 text-black hover:bg-orange-400 transition-colors shadow-[0_0_30px_rgba(255,107,0,0.4)]"
            >
              INSCREVER EQUIPE →
            </button>
            <a
              href="#regulamento"
              className="w-full sm:w-auto font-gta tracking-widest text-base px-8 py-4 border border-white/30 text-white hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              VER REGULAMENTO
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50 text-xs uppercase tracking-widest font-sans">
          <span className="mb-2">Inscreva-se abaixo</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "📅",
              title: "DATAS",
              lines: ["09 e 16/05 → Fase de Grupos", "17/05 → Quartas de Final", "30/05 → Semifinal + Final"],
            },
            {
              icon: "👥",
              title: "EQUIPES",
              lines: ["5 a 6 jogadores por equipe", "Até 16 vagas disponíveis", "Inscrição: R$ 40,00"],
            },
            {
              icon: "🏆",
              title: "PREMIAÇÃO",
              lines: ["1º lugar: R$ 600,00", "Medalhas para o top 5", "Pela plataforma GC"],
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-zinc-900/60 border border-white/10 hover:border-orange-500/50 p-6 transition-colors"
            >
              <div className="font-gta-title text-xl text-orange-500 tracking-wider mb-4">
                {card.icon} {card.title}
              </div>
              <ul className="space-y-2">
                {card.lines.map((l) => (
                  <li key={l} className="text-sm text-white/70 font-sans">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM ── */}
      <section ref={formRef} className="relative py-20 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-px w-16 bg-orange-500 mx-auto mb-4" />
            <h2 className="font-gta-title text-3xl md:text-5xl text-white tracking-wider mb-3">
              INSCRIÇÃO DA EQUIPE
            </h2>
            <p className="text-white/60 font-sans text-sm">
              Preencha os dados abaixo para garantir sua vaga no campeonato
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-10">
            {["EQUIPE", "JOGADORES", "RESUMO", "PAGAMENTO"].map((label, i) => {
              const s = i + 1;
              const ativo = step === s;
              const concluido = step > s;
              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-9 h-9 flex items-center justify-center font-gta text-sm border-2 transition-all ${
                        concluido
                          ? "border-green-500 bg-green-500 text-black"
                          : ativo
                          ? "border-orange-500 bg-orange-500/20 text-orange-500"
                          : "border-white/20 text-white/40"
                      }`}
                    >
                      {concluido ? "✓" : s}
                    </div>
                    <span
                      className={`text-[9px] md:text-[10px] mt-2 font-sans tracking-widest ${
                        ativo ? "text-orange-500" : "text-white/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div
                      className={`flex-1 h-px mx-1 md:mx-2 mb-5 transition-colors ${
                        step > s ? "bg-green-500" : ativo ? "bg-orange-500/50" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-black/60 border border-white/10 p-6 md:p-10">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <StepTitle>DADOS DA EQUIPE</StepTitle>
                <div>
                  <Label>NOME DA EQUIPE *</Label>
                  <Input
                    value={form.nomeEquipe}
                    onChange={(e) => setForm((p) => ({ ...p, nomeEquipe: e.target.value }))}
                    maxLength={100}
                    placeholder="Ex: Team Phoenix"
                  />
                  {form.nomeEquipe.length > 0 && form.nomeEquipe.length < 3 && (
                    <p className="text-red-400 text-xs mt-1 font-sans">Mínimo 3 caracteres</p>
                  )}
                </div>
                <div>
                  <Label>NICK NA PLATAFORMA GC (opcional)</Label>
                  <Input
                    value={form.gcId}
                    onChange={(e) => setForm((p) => ({ ...p, gcId: e.target.value }))}
                  />
                </div>

                <div className="border border-orange-500/30 bg-orange-500/5 p-5 flex items-center justify-between">
                  <div>
                    <div className="font-gta text-orange-500 tracking-widest text-sm mb-1">LOTE 1</div>
                    <div className="font-display text-3xl text-white font-bold">R$ 40,00</div>
                  </div>
                  <div className="text-xs text-white/70 font-sans space-y-1 text-right">
                    <div>✓ Participação completa</div>
                    <div>✓ Medalhas top 5</div>
                    <div>✓ Plataforma GC</div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <BtnPrimary onClick={() => setStep(2)} disabled={!podeAvancar1}>
                    PRÓXIMO →
                  </BtnPrimary>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <StepTitle>JOGADORES ({form.jogadores.length}/6)</StepTitle>
                <p className="text-white/60 text-sm font-sans -mt-4">
                  Mínimo 5, máximo 6 · Defina o capitão da equipe
                </p>

                {!form.jogadores.some((j) => j.isCapitao) && (
                  <div className="border border-yellow-500/40 bg-yellow-500/10 px-4 py-3">
                    <p className="text-yellow-300 text-xs font-sans">⚠️ Selecione o capitão da equipe</p>
                  </div>
                )}

                <div className="space-y-4">
                  {form.jogadores.map((jogador, i) => (
                    <div key={i} className="border border-white/10 bg-zinc-900/40 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-gta text-orange-500 tracking-widest text-sm">JOGADOR {i + 1}</span>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 text-xs font-sans text-white/80 cursor-pointer">
                            <input
                              type="radio"
                              name="capitao"
                              checked={jogador.isCapitao}
                              onChange={() => setJogador(i, "isCapitao", true)}
                              className="accent-orange-500"
                            />
                            ⭐ Capitão
                          </label>
                          {form.jogadores.length > 5 && (
                            <button
                              onClick={() => removerJogador(i)}
                              className="text-red-400/60 hover:text-red-400 text-xs font-sans transition-colors"
                            >
                              ✕ remover
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>NOME COMPLETO *</Label>
                          <Input value={jogador.nome} onChange={(e) => setJogador(i, "nome", e.target.value)} />
                        </div>
                        <div>
                          <Label>NICKNAME IN-GAME *</Label>
                          <Input value={jogador.nickname} onChange={(e) => setJogador(i, "nickname", e.target.value)} />
                        </div>

                        {jogador.isCapitao && (
                          <>
                            <div>
                              <Label>E-MAIL *</Label>
                              <Input
                                type="email"
                                placeholder="exemplo@email.com"
                                value={jogador.email}
                                onChange={(e) => setJogador(i, "email", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>TELEFONE *</Label>
                              <Input
                                value={jogador.telefone}
                                onChange={(e) => setJogador(i, "telefone", e.target.value)}
                                placeholder="(49) 99999-9999"
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <Label>FUNÇÃO *</Label>
                          <select
                            value={jogador.role}
                            onChange={(e) => setJogador(i, "role", e.target.value as Role)}
                            className="w-full bg-black/40 border border-white/10 focus:border-orange-500/60 text-white text-sm px-3 py-3 outline-none transition-colors rounded-none appearance-none"
                          >
                            {ROLES.map((r) => (
                              <option key={r.value} value={r.value} className="bg-black">
                                {r.icon} {r.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label>NICK NA GC (opcional)</Label>
                          <Input value={jogador.gcNick} onChange={(e) => setJogador(i, "gcNick", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {form.jogadores.length < 6 && (
                  <button
                    onClick={adicionarJogador}
                    className="w-full border border-dashed border-white/20 hover:border-orange-500/50 hover:text-orange-500 text-white/60 py-3 font-gta tracking-widest text-sm transition-colors"
                  >
                    + ADICIONAR 6º JOGADOR (OPCIONAL)
                  </button>
                )}

                <div className="flex justify-between pt-2">
                  <BtnSecondary onClick={() => setStep(1)}>← VOLTAR</BtnSecondary>
                  <BtnPrimary onClick={() => setStep(3)} disabled={!podeAvancar2}>
                    PRÓXIMO →
                  </BtnPrimary>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <StepTitle>RESUMO DA INSCRIÇÃO</StepTitle>

                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-white/50 text-xs uppercase tracking-widest font-sans">Equipe</span>
                    <span className="text-white font-bold">{form.nomeEquipe}</span>
                  </div>
                  {form.gcId && (
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-white/50 text-xs uppercase tracking-widest font-sans">Nick GC</span>
                      <span className="text-white">{form.gcId}</span>
                    </div>
                  )}

                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest font-sans mb-3">JOGADORES</p>
                    <div className="space-y-2">
                      {form.jogadores.map((j, i) => {
                        const role = ROLES.find((r) => r.value === j.role);
                        return (
                          <div
                            key={i}
                            className="flex justify-between items-center bg-zinc-900/50 border border-white/5 px-4 py-3"
                          >
                            <span className="text-white">
                              {j.isCapitao && <span className="text-orange-500 mr-1">⭐</span>}
                              {j.nickname || j.nome}
                            </span>
                            <span className="text-white/60 text-xs font-sans">
                              {role?.icon} {role?.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-orange-500/40 pt-4 mt-6">
                    <span className="text-white/70 text-sm uppercase tracking-widest font-sans">Total</span>
                    <span className="font-display text-3xl text-orange-500 font-bold">R$ 40,00</span>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <BtnSecondary onClick={() => setStep(2)}>← VOLTAR</BtnSecondary>
                  <BtnPrimary onClick={() => setStep(4)}>IR PARA PAGAMENTO →</BtnPrimary>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <StepTitle>PAGAMENTO</StepTitle>
                <p className="text-white/60 text-sm font-sans -mt-4">
                  Selecione a forma de pagamento — R$ 40,00
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: "pix", icon: "📱", label: "PIX", desc: "Aprovação imediata" },
                    { value: "cartao", icon: "💳", label: "CARTÃO", desc: "Crédito ou débito" },
                    { value: "link", icon: "🔗", label: "LINK", desc: "Link de pagamento" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setForm((p) => ({ ...p, metodoPagamento: opt.value as any }))}
                      className={`p-5 border text-left transition-all duration-200 ${
                        form.metodoPagamento === opt.value
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-white/10 hover:border-orange-500/40"
                      }`}
                    >
                      <div className="text-3xl mb-2">{opt.icon}</div>
                      <div className="font-gta text-white tracking-widest text-sm mb-1">{opt.label}</div>
                      <div className="text-xs text-white/50 font-sans">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                {form.metodoPagamento === "pix" && (
                  <div className="border border-green-500/30 bg-green-500/5 p-4">
                    <p className="text-green-300 text-xs font-sans">
                      ✓ Após confirmar, um QR Code PIX será gerado pela InfinitePay.
                    </p>
                  </div>
                )}
                {form.metodoPagamento === "cartao" && (
                  <div className="border border-green-500/30 bg-green-500/5 p-4">
                    <p className="text-green-300 text-xs font-sans">
                      ✓ Você será redirecionado para o checkout seguro da InfinitePay.
                    </p>
                  </div>
                )}
                {form.metodoPagamento === "link" && (
                  <div className="border border-green-500/30 bg-green-500/5 p-4">
                    <p className="text-green-300 text-xs font-sans">
                      ✓ Um link de pagamento será gerado e copiado para você.
                    </p>
                  </div>
                )}

                <label className="flex items-start gap-3 text-xs text-white/70 font-sans cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aceito}
                    onChange={(e) => setAceito(e.target.checked)}
                    className="accent-orange-500 mt-0.5"
                  />
                  <span>
                    Confirmo que li e aceito as regras do campeonato e que todos os jogadores estão cientes da
                    inscrição.
                  </span>
                </label>

                {erroGlobal && (
                  <div className="border border-red-500/40 bg-red-500/10 px-4 py-3">
                    <p className="text-red-300 text-xs font-sans">{erroGlobal}</p>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <BtnSecondary onClick={() => setStep(3)}>← VOLTAR</BtnSecondary>
                  <BtnPrimary onClick={handleSubmit} disabled={!podeSubmit || loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                        ENVIANDO...
                      </span>
                    ) : (
                      "CONFIRMAR INSCRIÇÃO ✓"
                    )}
                  </BtnPrimary>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-white/40 text-xs font-sans mt-6">
            Evento organizado e sediado no espaço Meu Escritório WORKSTATION · Caçador-SC
          </p>
        </div>
      </section>

      {/* ── REGULAMENTO ── */}
      <section id="regulamento" className="relative py-20 px-4 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-px w-16 bg-orange-500 mx-auto mb-4" />
            <h2 className="font-gta-title text-3xl md:text-5xl text-white tracking-wider">REGULAMENTO</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-sans">
            <ul className="space-y-3 text-white/80">
              <li>✓ Equipes de 5 a 6 jogadores (Compleat opcional)</li>
              <li>✓ Capitão pode ser: AWPer, IGL, Rifler ou Support</li>
              <li>✓ Todos os jogos pela plataforma GC</li>
              <li>✓ Formato grupo: MD1 (melhor de 1)</li>
              <li>✓ Eliminatórias: MD3 (melhor de 3)</li>
            </ul>
            <ul className="space-y-3 text-white/80">
              <li>✓ Inscrição: R$ 40,00 por equipe</li>
              <li>✓ 1º lugar: R$ 600,00</li>
              <li>✓ Medalhas para o top 5</li>
              <li>✓ Até 16 equipes participantes</li>
              <li>✓ Stream ao vivo de partidas selecionadas</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-gta-title text-2xl text-white tracking-wider border-l-4 border-orange-500 pl-3">
      {children}
    </h3>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-sans mb-2">
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-black/40 border border-white/10 focus:border-orange-500/60 text-white text-base md:text-sm px-3 py-3 outline-none transition-colors rounded-none"
    />
  );
}

function BtnPrimary({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-gta tracking-widest text-sm px-6 py-3 bg-orange-500 text-black hover:bg-orange-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,107,0,0.3)]"
    >
      {children}
    </button>
  );
}

function BtnSecondary({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-gta tracking-widest text-sm px-6 py-3 border border-white/20 text-white hover:border-orange-500 hover:text-orange-500 transition-colors"
    >
      {children}
    </button>
  );
}
