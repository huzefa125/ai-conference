"use client";

import * as React from "react";
import { clsx } from "clsx";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPinIcon, MicrophoneStageIcon } from "@phosphor-icons/react";
import {
  AGENDA,
  TRACK_LABELS,
  type AgendaDay,
  type Session,
  type TrackId,
} from "@/lib/agenda-data";

type Filter = "all" | TrackId;

const KIND_LABEL: Record<Session["kind"], string> = {
  keynote: "Keynote",
  talk: "Talk",
  workshop: "Workshop",
  panel: "Panel",
  break: "Break",
};

function endTime(start: string, minutes: number) {
  const [h, m] = start.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export interface AgendaProps {
  id?: string;
  className?: string;
  days?: AgendaDay[];
  title?: string;
  subtitle?: string;
}

export default function Agenda({
  id = "agenda",
  className = "",
  days = AGENDA,
  title = "AGENDA",
  subtitle = "Three days, five tracks. Pick a day, then filter by the track you care about.",
}: AgendaProps) {
  const [dayId, setDayId] = React.useState(days[0].id);
  const [filter, setFilter] = React.useState<Filter>("all");

  const day = days.find((d) => d.id === dayId) ?? days[0];

  // Keynotes, panels without a track and breaks are always shown.
  const sessions = day.sessions.filter(
    (s) => filter === "all" || !s.track || s.track === filter
  );

  // Scroll-linked timeline: a dot travels down the rail and fills the line as you scroll the list.
  const reduce = useReducedMotion();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [railH, setRailH] = React.useState(0);
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start 0.6", "end 0.6"] });
  const dotTop = useTransform(scrollYProgress, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);

  React.useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const measure = () => {
      const last = panel.querySelector("ul")?.lastElementChild as HTMLElement | null;
      if (!last) return;
      // first and last dots both sit 2.15rem into their rows, so the rail is exactly the last row's top offset
      setRailH(last.offsetTop);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(panel);
    return () => ro.disconnect();
  }, [dayId, filter]);

  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            {title}
          </h2>
          <p className="mt-4 font-mono text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Day tabs */}
        <div
          role="tablist"
          aria-label="Conference days"
          className="mx-auto mt-10 grid max-w-2xl grid-cols-3 border border-border bg-card"
        >
          {days.map((d, i) => {
            const active = d.id === dayId;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={active}
                aria-controls={`${id}-panel`}
                onClick={() => setDayId(d.id)}
                className={clsx(
                  "cursor-pointer px-3 py-3 text-left font-mono transition-colors sm:px-5",
                  i > 0 && "border-l border-border",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <span className="block text-[11px] font-semibold uppercase tracking-widest opacity-80">
                  {d.label}
                </span>
                <span className="block text-xs font-bold sm:text-base">{d.date}</span>
              </button>
            );
          })}
        </div>

        {/* Track filter */}
        <div
          className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter by track"
        >
          {(["all", ...Object.keys(TRACK_LABELS)] as Filter[]).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={clsx(
                  "cursor-pointer border px-3 py-1.5 font-mono text-xs font-medium transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {f === "all" ? "All tracks" : TRACK_LABELS[f]}
              </button>
            );
          })}
        </div>

        {/* Schedule */}
        <div
          id={`${id}-panel`}
          role="tabpanel"
          ref={panelRef}
          className="relative mx-auto mt-8 max-w-4xl border border-border bg-card shadow-[var(--shadow-subtle)]"
        >
          {!reduce && railH > 0 && (
            <div
              aria-hidden
              className="pointer-events-none absolute left-[1.15rem] top-[2.15rem] z-10 w-px sm:left-[1.65rem]"
              style={{ height: railH }}
            >
              {/* filled part of the line */}
              <motion.div className="absolute inset-x-0 top-0 w-px origin-top bg-primary" style={{ height: dotTop }} />
              {/* the travelling dot */}
              <motion.div
                className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-primary shadow-[0_0_0_4px_rgba(37,99,235,0.25)]"
                style={{ top: dotTop }}
              />
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.ul
              key={`${dayId}-${filter}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-border"
            >
              {sessions.map((s, i) => (
                <SessionRow key={`${s.time}-${s.title}`} session={s} first={i === 0} last={i === sessions.length - 1} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <p className="mx-auto mt-4 max-w-4xl text-center font-mono text-xs text-muted-foreground">
          Times are India Standard Time (IST). The program is subject to change.
        </p>
      </div>
    </section>
  );
}

function SessionRow({ session: s, first, last }: { session: Session; first: boolean; last: boolean }) {
  const isBreak = s.kind === "break";

  return (
    <li
      className={clsx(
        "group relative grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-1 py-5 pl-11 pr-4 sm:grid-cols-[7rem_1fr_auto] sm:pl-14 sm:pr-6",
        isBreak ? "bg-secondary/60" : "transition-colors hover:bg-secondary/40"
      )}
    >
      {/* Timeline rail: a line through every row with a dot at the start time */}
      <span
        aria-hidden
        className={clsx(
          "absolute left-[1.15rem] w-px bg-primary/30 sm:left-[1.65rem]",
          first ? "top-[2.15rem]" : "top-0",
          last ? "h-[2.15rem]" : "bottom-0"
        )}
      />
      <span
        aria-hidden
        className={clsx(
          "absolute left-[0.8rem] top-[1.8rem] h-[0.7rem] w-[0.7rem] rounded-full transition-transform duration-200 group-hover:scale-125 sm:left-[1.3rem]",
          isBreak
            ? "border-2 border-muted-foreground/50 bg-card"
            : "bg-primary ring-4 ring-primary/20"
        )}
      />
      {/* Time */}
      <div className="font-mono text-sm tabular-nums">
        <div className="text-base font-bold text-foreground">{s.time}</div>
        <div className="text-xs text-muted-foreground">{endTime(s.time, s.duration)}</div>
      </div>

      {/* Title + speaker */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={clsx(
              "font-mono text-[11px] font-semibold uppercase tracking-widest",
              isBreak ? "text-muted-foreground" : "text-primary"
            )}
          >
            {KIND_LABEL[s.kind]}
          </span>
          {s.track && (
            <span className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
              {TRACK_LABELS[s.track]}
            </span>
          )}
        </div>

        <h3
          className={clsx(
            "mt-1.5 font-mono text-base leading-snug sm:text-lg",
            isBreak ? "font-medium text-muted-foreground" : "font-bold text-foreground"
          )}
        >
          {s.title}
        </h3>

        {s.speaker && (
          <p className="mt-2 flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
            <MicrophoneStageIcon weight="duotone" size={16} className="shrink-0 text-primary" />
            {s.speaker}
          </p>
        )}
      </div>

      {/* Room */}
      {s.room && (
        <div className="col-start-2 flex items-center gap-1.5 font-mono text-sm text-muted-foreground sm:col-start-3 sm:self-start sm:justify-end">
          <MapPinIcon weight="duotone" size={16} className="shrink-0 text-primary" />
          {s.room}
        </div>
      )}
    </li>
  );
}
