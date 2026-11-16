"use client";

import * as React from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/** Glass "time remaining" card for the hero. Renders dashes until mounted so SSR and client markup match. */
export function HeroCountdown({ startDate, label }: { startDate: string; label: string }) {
  const target = React.useMemo(() => new Date(startDate).getTime(), [startDate]);
  const [parts, setParts] = React.useState<Parts | null>(null);

  React.useEffect(() => {
    const tick = () => setParts(diff(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: parts?.days },
    { label: "Hours", value: parts?.hours },
    { label: "Min", value: parts?.minutes },
    { label: "Sec", value: parts?.seconds },
  ];

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/85">Time remaining :</p>
      <p className="sr-only">{label}</p>
      <ol aria-hidden className="mt-4 grid grid-cols-4 gap-2 text-center">
        {units.map((u) => (
          <li key={u.label}>
            <span className="block font-display text-4xl font-bold tabular-nums leading-none tracking-tight sm:text-5xl">
              {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
            </span>
            <span className="mt-2 block text-sm text-white/65">{u.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
