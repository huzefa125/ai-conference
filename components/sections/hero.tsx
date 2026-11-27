"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { HAND_FONT } from "@/components/ui/handwritten";

const EASE = [0.22, 1, 0.36, 1] as const;

// Event window in IST. Drives the live status line in the blue date block.
const EVENT_START = new Date("2026-11-18T09:00:00+05:30").getTime();
const EVENT_END = new Date("2026-11-20T18:00:00+05:30").getTime();

// Stock photos already in /public/images. Swap for photos from your own events.
const SLIDES = [
  { src: "/images/stage.jpg", caption: "Main stage" },
  { src: "/images/panel.jpg", caption: "Working sessions" },
  { src: "/images/lecture.jpg", caption: "The hall" },
];
const SLIDE_MS = 5000;


/* ------------------------------------------------------------------ */

/** A headline line that rises out of a mask. */
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

/** Odometer digit: spins a full turn of 0-9, then lands on its value. */
function Digit({ value, delay, reduce }: { value: number; delay: number; reduce: boolean }) {
  const reel = [...Array.from({ length: 10 }, (_, i) => i), ...Array.from({ length: value + 1 }, (_, i) => i)];
  return (
    <span className="inline-block h-[0.92em] overflow-hidden align-top">
      <motion.span
        className="flex flex-col"
        initial={reduce ? false : { y: 0 }}
        animate={{ y: `-${(reel.length - 1) * 0.92}em` }}
        transition={{ duration: 1.5, delay, ease: [0.65, 0, 0.15, 1] }}
      >
        {reel.map((n, i) => (
          <span key={i} className="block h-[0.92em] leading-[0.92]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/** Countdown before the event, "live" during it, a wrap line after. Client-only to avoid hydration drift. */
function EventStatus() {
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  let content: React.ReactNode = null;
  if (now !== null) {
    if (now < EVENT_START) {
      const t = Math.floor((EVENT_START - now) / 1000);
      const p = (n: number) => String(n).padStart(2, "0");
      content = (
        <span className="tabular-nums">
          Starts in {Math.floor(t / 86400)}d {p(Math.floor((t % 86400) / 3600))}h {p(Math.floor((t % 3600) / 60))}m{" "}
          {p(t % 60)}s
        </span>
      );
    } else if (now <= EVENT_END) {
      const day = Math.min(3, Math.floor((now - EVENT_START) / 86400000) + 1);
      content = (
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-white" />
          </span>
          Live now · Day {day} of 3
        </span>
      );
    } else {
      content = <span>That&apos;s a wrap. Thank you, Hyderabad</span>;
    }
  }

  return (
    <p className="mt-4 min-h-4 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-white/80">{content}</p>
  );
}

/** Photo column: wipes up on load, then cycles slides with a sideways wipe and a slow push-in. */
function Photo({ reduce }: { reduce: boolean }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, reduce]);

  const slide = SLIDES[index];

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden bg-[var(--atlas-navy)]"
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.18 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: SLIDE_MS / 1000 + 1.5, ease: "linear" }}
          >
            <Image
              src={slide.src}
              alt={slide.caption}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />

      {/* Caption + progress */}
      <div className="absolute inset-x-5 bottom-5 text-white">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.caption}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {slide.caption}
            </motion.span>
          </AnimatePresence>
          <span className="tabular-nums text-white/70">
            0{index + 1} / 0{SLIDES.length}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show ${s.caption}`}
              onClick={() => setIndex(i)}
              className="relative h-[3px] cursor-pointer overflow-hidden bg-white/25"
            >
              {i < index && <span className="absolute inset-0 bg-white" />}
              {i === index && (
                <motion.span
                  key={index}
                  className="absolute inset-y-0 left-0 bg-white"
                  initial={{ width: reduce ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function AtlasHero() {
  const reduce = useReducedMotion() ?? false;
  const AVATARS = useContent().speakers.filter((s) => s.photo).slice(0, 3);
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    // Fills exactly one screen under the navbar (~8.75rem) on desktop.
    <section className="flex flex-col lg:h-[calc(100svh-8.75rem)] lg:min-h-[560px]">
      <div className="container mx-auto grid min-h-0 flex-1 gap-8 px-4 pb-8 pt-4 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-10">
        {/* Left: type */}
        <div className="relative isolate flex min-h-0 flex-col justify-center">
          <h1 className="font-heading text-[clamp(2.6rem,11.5vw,5.75rem)] font-extrabold lg:text-[clamp(3rem,min(6.4vw,10.5vh),7.5rem)] uppercase leading-[0.92] tracking-[-0.045em] text-foreground">
            <Line delay={0.05} reduce={reduce}>Atlas</Line>
            <Line delay={0.15} reduce={reduce}>Global</Line>
            <Line delay={0.25} reduce={reduce}>
              Summit{" "}
              <span className="text-primary" aria-label="2026">
                <span aria-hidden className="inline-flex tracking-[-0.06em]">
                  {[2, 0, 2, 6].map((d, i) => (
                    <Digit key={i} value={d} delay={0.45 + i * 0.1} reduce={reduce} />
                  ))}
                </span>
              </span>
            </Line>
          </h1>

          <div className="mt-[clamp(1.5rem,5vh,3.5rem)] flex flex-col gap-6 sm:flex-row sm:items-stretch">
            {/* Blue date block */}
            <motion.div
              initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="flex shrink-0 flex-col justify-between bg-primary px-5 py-4 text-white sm:w-52"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-white/80">18–20 Nov 2026</p>
              <p className="mt-2 font-heading text-[1.7rem] font-bold leading-none tracking-tight">Hyderabad</p>
              <EventStatus />
            </motion.div>

            {/* Copy + speakers */}
            <div className="flex flex-col justify-between gap-4">
              <motion.p {...rise(0.85)} className={`${HAND_FONT} max-w-sm -rotate-1 text-balance text-[1.45rem] font-semibold leading-[1.2] text-primary sm:text-[1.6rem]`}>
                Three days of practical talks, hands-on workshops and the people doing the research.
              </motion.p>

              <motion.div {...rise(1)}>
                <Link href="/#speakers" className="group inline-flex items-center gap-3">
                  <span className="flex">
                    {AVATARS.map((s, i) => (
                      <motion.span
                        key={i}
                        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.05 + i * 0.07 }}
                        className="-ml-3 transition-[margin] duration-300 first:ml-0 group-hover:-ml-1 group-hover:first:ml-0"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.photo} alt="" className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                      </motion.span>
                    ))}
                  </span>
                  <span className="font-heading text-base font-bold leading-tight text-foreground">
                    Meet the
                    <br />
                    speakers
                  </span>
                  <ArrowUpRight
                    className="h-6 w-6 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: photo fills the column height */}
        <div className="relative h-[60vw] max-h-[480px] min-h-0 lg:h-full lg:max-h-none">
          <Photo reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
