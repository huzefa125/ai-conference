"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { CLAUDE_MARK } from "@/components/icons/brand-marks";
import { AnimatedMark } from "@/components/icons/animated-mark";

const EASE = [0.22, 1, 0.36, 1] as const;

// The statement, word by word. "AI" gets the animated blob gif beside it.
const WORDS = "Every keynote comes from people running AI in production, not just talking about it.".split(" ");


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
            <AnimatedMark
              mark={CLAUDE_MARK}
              show={show}
              reduce={reduce}
              className="absolute -right-10 top-1/2 h-52 w-52 -translate-y-1/2 sm:right-0 sm:h-64 sm:w-64 lg:-right-6 lg:h-72 lg:w-72"
            />
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
