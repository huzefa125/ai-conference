"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/components/content-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

// The statement, word by word. "AI" gets the animated blob gif beside it.
const WORDS = "Every keynote comes from people running AI in production, not just talking about it.".split(" ");

// Claude symbol (from Claude_AI_symbol.svg), recoloured to the brand blue.
const CLAUDE_PATH =
  "m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z";

/** Blue Claude symbol: outline draws in, fill floods in, then it turns slowly and breathes. */
function Spark({ show, reduce }: { show: boolean; reduce: boolean }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="-4 -4 108 108"
      className="pointer-events-none absolute -right-10 top-1/2 h-52 w-52 -translate-y-1/2 sm:right-0 sm:h-64 sm:w-64 lg:-right-6 lg:h-72 lg:w-72"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 60, ease: "linear", repeat: Infinity }}
    >
      <motion.g
        style={{ transformOrigin: "50px 50px" }}
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <motion.path
          d={CLAUDE_PATH}
          fill="var(--primary)"
          stroke="var(--primary)"
          strokeWidth={0.6}
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }}
          animate={show ? { pathLength: 1, fillOpacity: 0.11, strokeOpacity: 0.28 } : undefined}
          transition={{
            pathLength: { duration: 2, delay: 0.4, ease: EASE },
            fillOpacity: { duration: 0.9, delay: 1.9 },
            strokeOpacity: { duration: 0.9, delay: 1.9 },
          }}
        />
      </motion.g>
    </motion.svg>
  );
}

/** Counts up to a value like "3", "5" or "1,000+" once `start` is true. */
function CountUp({ value, start, reduce }: { value: string; start: boolean; reduce: boolean }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const target = Number(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9,]/g, "");

  React.useEffect(() => {
    if (!start || reduce || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, target, {
      duration: target > 100 ? 1.8 : 1.1,
      delay: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        node.textContent = Math.round(n).toLocaleString("en-US") + suffix;
      },
    });
    return () => controls.stop();
  }, [start, reduce, target, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? value : `0${suffix}`}
    </span>
  );
}

export default function KeynoteIntro({ id = "overview" }: { id?: string }) {
  const { venue: VENUE } = useContent();
  const reduce = useReducedMotion() ?? false;

  // One observer on the whole section drives every entrance, so nothing hidden inside a mask can get stuck.
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const show = inView || reduce;

  const imageRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section ref={sectionRef} id={id} className="relative w-full overflow-hidden py-12 sm:py-20 lg:py-28">
      <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
        {/* Photo */}
        <motion.div
          ref={imageRef}
          initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
          animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--atlas-navy)] lg:aspect-[4/3]"
        >
          <motion.div style={{ y: imageY }} className="absolute inset-x-0 -inset-y-[10%]">
            <Image
              src="/images/hall.jpg"
              alt="Audience watching a keynote"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Session tag, from the Day 1 agenda */}
          <motion.div {...enter(0.9)} className="absolute bottom-0 left-0 bg-background px-5 py-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Day 1 · 09:30 · Main Hall
            </p>
            <p className="mt-1 font-heading text-base font-bold text-foreground">Opening keynote</p>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <div className="relative">
          <motion.p {...enter(0.1)} className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Keynote speakers
          </motion.p>

          <h2 className="mt-4 text-balance font-heading text-[clamp(1.55rem,6.2vw,2.4rem)] font-extrabold uppercase leading-[1.18] tracking-tight text-foreground lg:text-[clamp(1.6rem,2.6vw,2.6rem)]">
            {WORDS.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className="inline-flex items-center"
                  initial={reduce ? false : { y: "110%" }}
                  animate={show ? { y: "0%" } : undefined}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.035, ease: EASE }}
                >
                  {w === "AI" ? (
                    <span className="inline-flex items-center gap-2 bg-primary py-0.5 pl-3 pr-1 text-white">
                      AI
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/bloub-default-cycle.gif" alt="" className="h-[1.1em] w-[1.1em] rounded-full bg-white object-cover" />
                    </span>
                  ) : (
                    w
                  )}
                  {i < WORDS.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div {...enter(0.7)} className="mt-7">
            <Link
              href="/#speakers"
              className="group relative inline-flex items-center gap-2 overflow-hidden bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white"
            >
              <span className="absolute inset-0 -translate-x-full bg-[var(--atlas-navy)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
              <span className="relative">Meet the speakers</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats over the spark */}
          <div className="relative mt-12 py-8 sm:mt-14">
            <Spark show={show} reduce={reduce} />
            <dl className="relative flex items-end justify-between gap-4 sm:justify-start sm:gap-12 lg:gap-10 xl:gap-14">
              {VENUE.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-2">
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">{s.label}</dt>
                  <dd className="font-heading text-[clamp(2.1rem,9vw,3.75rem)] font-extrabold leading-none tracking-tight text-primary lg:text-[clamp(2.5rem,4.2vw,3.75rem)]">
                    <CountUp value={s.value} start={show} reduce={reduce} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
