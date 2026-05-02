import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s, finished: ms === 0 };
}

export default function Countdown({ targetISO }: { targetISO: string }) {
  const target = new Date(targetISO).getTime();
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const i = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(i);
  }, [target]);

  const Item = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center min-w-[72px]">
      <div className="font-cs-num text-5xl md:text-6xl text-cs-orange leading-none">
        {String(v).padStart(2, "0")}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-cs-text-secondary mt-2">
        {l}
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-3 md:gap-6 justify-center">
      <Item v={t.d} l="dias" />
      <span className="text-cs-orange/40 text-3xl">:</span>
      <Item v={t.h} l="horas" />
      <span className="text-cs-orange/40 text-3xl">:</span>
      <Item v={t.m} l="min" />
      <span className="text-cs-orange/40 text-3xl">:</span>
      <Item v={t.s} l="seg" />
    </div>
  );
}
