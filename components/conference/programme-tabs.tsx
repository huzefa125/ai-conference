"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { AgendaDay, AgendaSession } from "@/lib/data";

const typeStyles: Record<AgendaSession["type"], string> = {
  Keynote: "bg-navy text-white",
  Session: "bg-blue/10 text-blue ring-1 ring-inset ring-blue/20",
  Panel: "bg-violet/10 text-navy ring-1 ring-inset ring-violet/25",
  Workshop: "bg-cyan/10 text-navy ring-1 ring-inset ring-cyan/30",
  Poster: "bg-accent text-navy",
  Ceremony: "bg-white text-blue ring-1 ring-inset ring-blue/30",
  Break: "bg-surface text-muted-foreground",
};

/** Accessible day tabs (WAI-ARIA tabs pattern: arrow keys, Home/End). */
export function ProgrammeTabs({ days, idPrefix = "programme" }: { days: AgendaDay[]; idPrefix?: string }) {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % days.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + days.length) % days.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = days.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Programme by day"
        className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-card ring-1 ring-inset ring-border [scrollbar-width:none]"
      >
        {days.map((d, i) => {
          const selected = i === active;
          return (
            <button
              key={d.day}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "shrink-0 rounded-full px-5 py-2 text-left transition-colors sm:px-6",
                selected ? "bg-navy text-white" : "text-navy/70 hover:bg-surface hover:text-navy",
              )}
            >
              <span className="block font-display text-[15px] font-bold leading-tight">{d.day}</span>
              <span className={cn("block text-xs", selected ? "text-white/70" : "text-muted-foreground")}>{d.date}</span>
            </button>
          );
        })}
      </div>

      {days.map((d, i) => (
        <div
          key={d.day}
          role="tabpanel"
          id={`${idPrefix}-panel-${i}`}
          aria-labelledby={`${idPrefix}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className="mt-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/30"
        >
          <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            {d.sessions.map((s) => (
              <li key={`${s.time}-${s.title}`} className={cn(
                  "grid gap-2 px-5 py-5 transition-colors hover:bg-surface/50 sm:grid-cols-[6.5rem_1fr_auto] sm:items-center sm:gap-6 sm:px-6",
                  s.type === "Break" && "bg-surface/60",
                )}>
                <p className="flex items-center gap-2 text-sm font-semibold tabular-nums text-navy">
                  <Clock className="size-4 text-blue/70" aria-hidden />
                  <time>{s.time}</time>
                </p>
                <div>
                  <p className={cn("font-medium text-navy", s.type === "Break" && "font-normal text-muted-foreground")}>{s.title}</p>
                  {s.speaker && <p className="mt-0.5 text-sm text-muted-foreground">{s.speaker}</p>}
                </div>
                <Badge
                  size="sm"
                  className={cn(
                    "justify-self-start px-3 py-1 text-xs font-semibold sm:justify-self-end",
                    typeStyles[s.type],
                  )}
                >
                  <span className="sr-only">Session type: </span>
                  {s.type}
                </Badge>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
