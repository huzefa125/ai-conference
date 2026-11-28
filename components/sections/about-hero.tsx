"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { DisplayText } from "@/components/ui/display-text";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface AboutHeroProps {
  eyebrow: string;
  /** Headline, one entry per line. The last line is set in brand blue. */
  lines: string[];
  /** Short accent line (display font) under the headline. */
  note: string;
  text: string;
  stats: { value: string; label: string }[];
  image: string;
  caption: string;
  link: { label: string; href: string };
}

/** A headline line that rises out of a mask (same motion as the home hero). */
function Line({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** About page hero, built in the same language as the home hero: big uppercase type, a blue block, a full-height photo. */
export default function AboutHero({ eyebrow, lines, note, text, stats, image, caption, link }: AboutHeroProps) {
  const reduce = useReducedMotion() ?? false;
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section className="flex flex-col lg:h-[calc(100svh-8.75rem)] lg:min-h-[560px]">
      <div className="container mx-auto grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] gap-8 px-4 pb-8 pt-4 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-10">
        {/* Left: type */}
        <div className="relative isolate flex min-h-0 flex-col justify-center">

          <motion.span {...rise(0)} className="font-mono text-xs font-semibold uppercase tracking-widest text-tertiary-ink">
            {eyebrow}
          </motion.span>

          <h1 className="mt-4 font-heading text-[clamp(1.9rem,9vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-foreground lg:text-[clamp(2.4rem,min(4.2vw,7.6vh),4.9rem)]">
            {lines.map((l, i) => (
              <Line key={l} delay={0.05 + i * 0.1} reduce={reduce}>
                <span className={i === lines.length - 1 ? "text-primary" : undefined}>{l}</span>
              </Line>
            ))}
          </h1>

          {/* Accent line in the display font, after the headline lands */}
          <p className="mt-3 sm:mt-4">
            <DisplayText delay={1.0} className="text-[1.15rem] font-semibold sm:text-[1.4rem]">
              {note}
            </DisplayText>
          </p>

          <div className="mt-[clamp(1.25rem,4vh,3rem)] flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Blue stats block */}
            <motion.dl
              initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              // Sized by its content so "1,000+" never clips.
              className="grid shrink-0 grid-cols-3 bg-primary text-white sm:w-auto"
            >
              {stats.map((s, i) => (
                <div key={s.label} className={`whitespace-nowrap px-5 py-5 ${i > 0 ? "border-l border-white/20" : ""}`}>
                  <dt className="font-heading text-[1.7rem] font-bold leading-none tracking-tight">{s.value}</dt>
                  <dd className="mt-2 font-mono text-[12px] font-semibold uppercase tracking-widest text-white/80">{s.label}</dd>
                </div>
              ))}
            </motion.dl>

            {/* Copy + link */}
            <div className="flex flex-col justify-between gap-4">
              <motion.p {...rise(0.75)} className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                {text}
              </motion.p>
              <motion.div {...rise(0.9)}>
                <Link href={link.href} className="group inline-flex items-center gap-2 font-heading text-base font-bold text-foreground">
                  {link.label}
                  <ArrowUpRight
                    className="h-5 w-5 text-tertiary-strong transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: photo fills the column height, wipes up on load */}
        <motion.figure
          className="relative h-[60vw] max-h-[480px] min-h-0 overflow-hidden bg-[var(--atlas-navy)] lg:h-full lg:max-h-none"
          initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.15 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 6, ease: "linear" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={caption} className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
          <figcaption className="absolute inset-x-5 bottom-5 flex items-center justify-between font-mono text-[12px] uppercase tracking-widest text-white">
            <span>{caption}</span>
            <span className="text-white/70">Est. Hyderabad</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
