"use client";

import { motion, useReducedMotion } from "motion/react";
import { HAND_FONT, HandArrow, HandCircle, Handwritten } from "@/components/ui/handwritten";

export interface CoreValuesProps {
  id?: string;
  eyebrow: string;
  intro: string;
  /** Handwritten aside next to the intro. */
  note: string;
  values: { title: string; text: string }[];
}

/**
 * About page: "Our core values" with a hand-circled title, a pen-written aside and a grid of
 * numbered values (3 columns on desktop, 2 on tablets, 1 on phones). No horizontal scrolling.
 */
export default function CoreValues({ id = "values", eyebrow, intro, note, values }: CoreValuesProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id={id} className="w-full py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header: title left, intro + handwritten aside right */}
          <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
              <h2 className="mt-4 font-heading text-[clamp(2.2rem,9vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-foreground">
                Our core
                <br />
                <HandCircle delay={0.2} className="mt-2 px-1">
                  values
                </HandCircle>
              </h2>
            </div>

            <div className="min-w-0 lg:pb-3">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
              <div className="mt-4 flex items-start gap-1">
                <HandArrow delay={1.1} className="mt-3 h-9 w-10 shrink-0 rotate-[8deg] sm:h-14 sm:w-16" />
                <Handwritten delay={0.6} underline className="-rotate-2 text-[1.4rem] sm:text-[2.2rem]">
                  {note}
                </Handwritten>
              </div>
            </div>
          </div>

          {/* Values grid: shared borders via gap-px on a border-coloured background */}
          <ol className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.li
                key={v.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-card p-6 transition-colors duration-300 hover:bg-secondary/60 sm:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                />
                <span
                  aria-hidden
                  className={`${HAND_FONT} inline-block -rotate-6 text-4xl font-bold leading-none text-primary transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110 sm:text-5xl`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug text-foreground sm:text-xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{v.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
