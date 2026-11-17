"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import type { RevealSegment } from "@/lib/about-desk-data";

type Unit = { key: string; segment: RevealSegment; text: string; trail?: string };

const TONES = {
  accent: "bg-primary/10 text-primary border border-primary/25",
  "accent-solid": "bg-primary text-white shadow-sm",
  maroon: "bg-secondary text-foreground border border-foreground/20",
  "maroon-solid": "bg-foreground text-white shadow-sm",
} as const;

function flatten(segments: RevealSegment[]): Unit[] {
  const units: Unit[] = [];
  segments.forEach((seg, si) => {
    if ("pill" in seg || "bold" in seg) {
      units.push({ key: `${si}`, segment: seg, text: seg.text });
      return;
    }
    seg.text
      .split(" ")
      .filter(Boolean)
      .forEach((w, wi) => {
        const prev = units[units.length - 1];
        // glue leading punctuation (".", ",") to the previous pill so it never wraps alone
        const m = wi === 0 && prev && "pill" in prev.segment ? w.match(/^([.,;:!?]+)(.*)$/) : null;
        if (m) {
          prev.trail = m[1];
          if (m[2]) units.push({ key: `${si}-${wi}`, segment: seg, text: m[2] });
          return;
        }
        units.push({ key: `${si}-${wi}`, segment: seg, text: w });
      });
  });
  return units;
}

function Word({ unit, progress, range, reduce }: { unit: Unit; progress: MotionValue<number>; range: [number, number]; reduce: boolean }) {
  const opacity = useTransform(progress, range, [0.3, 1]);
  const style = reduce ? undefined : { opacity };
  const seg = unit.segment;

  if ("pill" in seg) {
    const icon = seg.icon && (
      <span className="mx-0.5 inline-flex items-center align-middle sm:mx-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={seg.icon} alt={seg.iconAlt ?? ""} className={cn("inline-block h-[1.75em] w-[1.75em] shrink-0 object-contain", seg.iconClassName)} />
      </span>
    );
    return (
      <>
      <motion.span style={style} className="my-1 inline-block whitespace-nowrap">
        {seg.iconPosition === "left" && icon}
        <span className={cn("mx-0.5 inline-flex items-center rounded-full px-3 py-1.5 text-[0.82em] font-semibold leading-none align-middle sm:mx-1 sm:px-3.5 sm:py-1 sm:text-[0.85em]", TONES[seg.pill])}>
          {seg.text}
        </span>
        {seg.iconPosition !== "left" && icon}{unit.trail}
      </motion.span>{" "}
      </>
    );
  }
  if ("bold" in seg) {
    return <><motion.span style={style} className="font-semibold text-foreground">{seg.text}</motion.span>{" "}</>;
  }
  return (
    <>
      <motion.span style={style} className="whitespace-nowrap">{unit.text}</motion.span>{" "}
    </>
  );
}

export function ScrollRevealText({ segments, className }: { segments: RevealSegment[]; className?: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.35"] });
  const units = React.useMemo(() => flatten(segments), [segments]);

  return (
    <p ref={ref} className={className}>
      {units.map((u, i) => (
        <Word key={u.key} unit={u} progress={scrollYProgress} range={[i / units.length, (i + 1) / units.length]} reduce={reduce} />
      ))}
    </p>
  );
}
