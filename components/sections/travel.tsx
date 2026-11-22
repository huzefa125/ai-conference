"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { AirplaneTiltIcon } from "@phosphor-icons/react";
import { iconFor } from "@/lib/icons";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

// Route stop labels, in the same order as TRAVEL.
const STOPS = ["Land", "Check in", "Arrive ready"];

// Boarding-pass fields. Times come from the Day 1 agenda (registration 08:30, opening keynote 09:30).
const FIELDS = [
  { label: "Passenger", value: "You" },
  { label: "Date", value: "18 Nov 2026" },
  { label: "Boarding", value: "08:30 IST" },
  { label: "Departs", value: "09:30 · Keynote" },
];

/** Deterministic barcode bars built from a string, so it renders the same on server and client. */
function Barcode({ seed }: { seed: string }) {
  const bars = Array.from({ length: 42 }, (_, i) => {
    const c = seed.charCodeAt(i % seed.length) + i * 7;
    return { w: (c % 3) + 1, gap: ((c >> 2) % 2) + 1 };
  });
  return (
    <div aria-hidden className="flex h-12 items-stretch">
      {bars.map((b, i) => (
        <span key={i} className="bg-white" style={{ width: b.w, marginRight: b.gap }} />
      ))}
    </div>
  );
}

/** ANY → HYD with a plane flying the arc between them. */
function FlightArc({ reduce }: { reduce: boolean }) {
  const arc = "M 8 70 Q 150 -20 292 70";
  return (
    <svg viewBox="0 0 300 80" className="h-full w-full overflow-visible" aria-hidden>
      <path d={arc} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
      <motion.path
        d={arc}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
      />
      <circle cx="8" cy="70" r="3.5" fill="#fff" />
      <circle cx="292" cy="70" r="3.5" fill="var(--primary)" />
      <g>
        {reduce ? null : (
          <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto" path={arc} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1" />
        )}
        <g transform={reduce ? "translate(150 25)" : undefined}>
          <path d="M 9 0 L -7 -2.2 L -7 2.2 Z" fill="#fff" />
          <path d="M 2 0 L -3 -8 L -5.5 -8 L -2 0 L -5.5 8 L -3 8 Z" fill="#fff" />
          <path d="M -6 0 L -9 -3.5 L -10.5 -3.5 L -9 0 L -10.5 3.5 L -9 3.5 Z" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

function BoardingPass({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="group relative grid text-white md:grid-cols-[1fr_auto_15rem]"
    >
      {/* Main ticket */}
      <div className="relative overflow-hidden bg-[var(--atlas-navy)] p-6 sm:p-8">
        {/* faint route grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative">
          <div className="flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em]">
            <span className="text-white/70">Atlas Global 2026</span>
            <span className="inline-flex items-center gap-2 text-primary">
              <AirplaneTiltIcon weight="fill" size={14} /> Boarding pass
            </span>
          </div>

          <div className="mt-8 grid grid-cols-[auto_minmax(4.5rem,1fr)_auto] items-end gap-3 sm:gap-6">
            <div>
              <p className="font-heading text-[clamp(2.4rem,11vw,4.5rem)] font-extrabold leading-none tracking-tight">ANY</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/60">Your city</p>
            </div>
            <div className="h-16 self-center sm:h-24">
              <FlightArc reduce={reduce} />
            </div>
            <div className="text-right">
              <p className="font-heading text-[clamp(2.4rem,11vw,4.5rem)] font-extrabold leading-none tracking-tight text-primary">HYD</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/60">Hyderabad, India</p>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-4">
            {FIELDS.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{f.label}</dt>
                <dd className="mt-1 font-heading text-base font-bold sm:text-lg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Perforation with punched notches */}
      <div aria-hidden className="relative hidden w-0 md:block">
        <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-background" />
        <span className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-background" />
        <span className="absolute inset-y-4 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-white/30" />
      </div>
      <div aria-hidden className="h-0 border-t-2 border-dashed border-white/30 bg-[var(--atlas-navy)] md:hidden" />

      {/* Tear-off stub: leans away on hover like it's about to be torn */}
      <div className="flex origin-top-left flex-col justify-between gap-6 bg-primary p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-2 md:group-hover:rotate-[2deg] sm:p-7">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Admit one</p>
          <p className="mt-2 font-heading text-4xl font-extrabold leading-none">HYD</p>
          <p className="mt-2 text-sm text-white/80">Seat: your pick of five tracks</p>
        </div>
        <div>
          <Barcode seed="ATLASGLOBAL2026HYD" />
          <Link
            href="/#tickets"
            className="group/cta mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white"
          >
            Get your pass
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/** The three travel tips as stops on a route that draws itself as you scroll. */
function Route({ reduce }: { reduce: boolean }) {
  const { travel: TRAVEL } = useContent();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);
  const planeX = useTransform(progress, (p) => `${p * 100}%`);
  const planeY = useTransform(progress, (p) => `${p * 100}%`);
  const [reached, setReached] = React.useState(reduce ? STOPS.length : 1);

  useMotionValueEvent(progress, "change", (p) => {
    setReached(Math.min(STOPS.length, Math.floor(p * (STOPS.length - 1) + 0.05) + 1));
  });

  return (
    <div ref={ref} className="relative mt-14 md:mt-20">
      {/* Horizontal track (desktop): runs between the first and last stop */}
      <div aria-hidden className="absolute left-[16.66%] right-[16.66%] top-[11px] hidden md:block">
        <div className="h-px w-full border-t-2 border-dashed border-border" />
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 top-0 h-[2px] origin-left bg-primary" />
        <motion.div style={{ left: planeX }} className="absolute -top-[11px] -translate-x-1/2 text-primary">
          <span className="flex h-6 w-6 items-center justify-center bg-background">
            <AirplaneTiltIcon weight="fill" size={22} className="rotate-45" />
          </span>
        </motion.div>
      </div>

      {/* Vertical track (mobile) */}
      <div aria-hidden className="absolute bottom-6 left-[11px] top-3 md:hidden">
        <div className="h-full w-px border-l-2 border-dashed border-border" />
        <motion.div style={{ scaleY: progress }} className="absolute inset-y-0 left-0 w-[2px] origin-top bg-primary" />
        <motion.div style={{ top: planeY }} className="absolute -left-[11px] -translate-y-1/2 text-primary">
          <span className="flex h-6 w-6 items-center justify-center bg-background">
            <AirplaneTiltIcon weight="fill" size={20} className="rotate-[135deg]" />
          </span>
        </motion.div>
      </div>

      <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
        {TRAVEL.map((t, i) => {
          const Icon = iconFor(t.icon);
          const on = i < reached;
          return (
            <li key={t.title} className="relative pl-12 md:pl-0 md:text-center">
              <span
                aria-hidden
                className={clsx(
                  "absolute left-0 top-0 flex h-6 w-6 items-center justify-center border-2 transition-colors duration-500 md:relative md:mx-auto",
                  on ? "border-primary bg-primary" : "border-border bg-background",
                )}
              >
                <span className={clsx("h-1.5 w-1.5 transition-colors duration-500", on ? "bg-white" : "bg-border")} />
              </span>
              <div
                className={clsx(
                  "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:mt-8",
                  on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-40",
                )}
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Stop 0{i + 1} · {STOPS[i]}
                </p>
                <div className="mt-3 flex items-center gap-3 md:justify-center">
                  <Icon weight="duotone" size={26} className="text-primary" />
                  <h3 className="font-heading text-xl font-bold text-foreground">{t.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mx-auto md:max-w-xs">{t.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Travel({ id = "travel", className = "" }: { id?: string; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <section id={id} className={clsx("w-full py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">Travel</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Plan your trip
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            Wherever you fly in from, here is everything you need to get to Hyderabad and settle in.
          </p>
        </div>

        <BoardingPass reduce={reduce} />
        <Route reduce={reduce} />
      </div>
    </section>
  );
}
