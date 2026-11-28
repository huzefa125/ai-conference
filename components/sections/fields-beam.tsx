"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { Atom, ChartSpline, Dna, Earth, Landmark, Users, type LucideIcon } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// The five tracks, in the same order as the tracks section.
const FIELDS: { label: string; icon: LucideIcon }[] = [
  { label: "Life Sciences", icon: Dna },
  { label: "Physical Sciences", icon: Atom },
  { label: "Earth & Climate", icon: Earth },
  { label: "Data & Methods", icon: ChartSpline },
  { label: "Science & Society", icon: Landmark },
];

// Beams bend toward the hub: top nodes curve down, bottom nodes curve up.
const CURVE = [-48, -24, 0, 24, 48];
const END_OFFSET = [-14, -7, 0, 7, 14];

const BEAM = {
  pathColor: "var(--foreground)",
  pathOpacity: 0.12,
  pathWidth: 2,
  gradientStartColor: "#0052ff",
  gradientStopColor: "#00b8d9",
};

function Node({
  ref,
  label,
  icon: Icon,
}: {
  ref: React.Ref<HTMLDivElement>;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <div className="relative z-10 flex w-[4.75rem] flex-col items-center gap-1.5 sm:w-28">
      <div
        ref={ref}
        className="grid size-12 place-items-center rounded-full border-2 border-border bg-card text-tertiary-strong shadow-[0_6px_20px_-10px_rgba(10,15,28,0.45)] sm:size-14"
      >
        <Icon aria-hidden className="size-5 sm:size-6" strokeWidth={2} />
      </div>
      <span className="text-center font-mono text-[12px] font-semibold uppercase leading-tight tracking-wider text-muted-foreground sm:text-[12px]">
        {label}
      </span>
    </div>
  );
}

/** Home page: the five tracks beam into Atlas Global, and Atlas Global beams out to the attendee. */
export default function FieldsBeam({ id = "fields" }: { id?: string }) {
  const reduce = useReducedMotion() ?? false;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hubRef = React.useRef<HTMLDivElement>(null);
  const youRef = React.useRef<HTMLDivElement>(null);
  const fieldRefs = [
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
  ];

  // Reduced motion: keep the connecting lines, drop the moving pulse.
  const beam = reduce ? { ...BEAM, gradientStartColor: "transparent", gradientStopColor: "transparent" } : BEAM;

  return (
    <section id={id} className="w-full py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-tertiary-ink">One programme</span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Five fields. <span className="text-primary">One room.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Biologists, physicists, earth scientists, statisticians and policy researchers share the same sessions,
            so methods travel between fields and you leave with collaborators outside your own.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto mt-10 flex h-[440px] max-w-3xl items-stretch justify-between sm:mt-14 sm:h-[480px]"
        >
          {/* Left: the five tracks */}
          <div className="flex flex-col justify-between">
            {FIELDS.map((f, i) => (
              <Node key={f.label} ref={fieldRefs[i]} label={f.label} icon={f.icon} />
            ))}
          </div>

          {/* Centre: Atlas Global */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-2">
            <div
              ref={hubRef}
              className="grid size-20 place-items-center rounded-full border-2 border-primary bg-card p-3 shadow-[0_12px_36px_-12px_rgba(0,82,255,0.55)] sm:size-28 sm:p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/atlas-logo.png" alt="Atlas Global" className="h-full w-full object-contain" />
            </div>
            <span className="font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink sm:text-xs">
              Atlas Global 2026
            </span>
          </div>

          {/* Right: you */}
          <div className="flex items-center">
            <Node ref={youRef} label="You + 1,000 researchers" icon={Users} />
          </div>

          {FIELDS.map((f, i) => (
            <AnimatedBeam
              key={f.label}
              containerRef={containerRef}
              fromRef={fieldRefs[i]}
              toRef={hubRef}
              curvature={CURVE[i]}
              endYOffset={END_OFFSET[i]}
              delay={i * 0.4}
              {...beam}
            />
          ))}
          <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={youRef} curvature={18} delay={0.6} {...beam} />
          <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={youRef} curvature={-18} delay={2.2} reverse {...beam} />
        </div>
      </div>
    </section>
  );
}
