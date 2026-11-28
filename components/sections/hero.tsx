"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { DISPLAY_FONT } from "@/components/ui/display-font";

const EASE = [0.22, 1, 0.36, 1] as const;

// Event window in IST. Drives the live status line in the blue date block.
const EVENT_START = new Date("2026-11-18T09:00:00+05:30").getTime();
const EVENT_END = new Date("2026-11-20T18:00:00+05:30").getTime();

// Hero video (muted, looping). Re-encode with: ffmpeg -i in.mp4 -an -c:v libx264 -crf 26 -movflags +faststart out.mp4
const VIDEO_SRC = "/videos/hero-science.mp4";
// A frame from the DNA part of the clip: shown while the video loads and, for reduced motion, instead of it.
const VIDEO_POSTER = "/videos/hero-science-poster.jpg";


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
        className="flex flex-col items-center tabular-nums"
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
    <p className="mt-4 min-h-4 font-mono text-[12px] uppercase leading-relaxed tracking-widest text-white/80">{content}</p>
  );
}

/** Video column: wipes up on load, then plays the clip on a loop. Reduced motion keeps the still poster. */
function HeroVideo({ reduce }: { reduce: boolean }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Started from code (not the autoPlay attribute) so reduced motion can keep it paused without a hydration mismatch.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      return;
    }
    v.muted = true;
    v.play().catch(() => {
      /* Autoplay blocked (e.g. data saver): the poster stays visible. */
    });
  }, [reduce]);

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden bg-[var(--atlas-navy)]"
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
    >
      <video
        ref={videoRef}
        aria-hidden
        muted
        loop
        playsInline
        preload="auto"
        poster={VIDEO_POSTER}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />

      {/* Caption */}
      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between font-mono text-[12px] uppercase tracking-widest text-white">
        <span>Five fields · One room</span>
        <span className="text-white/70">Hyderabad 2026</span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function AtlasHero() {
  const reduce = useReducedMotion() ?? false;
  const { speakers, venue } = useContent();
  const AVATARS = speakers.filter((s) => s.photo).slice(0, 3);
  // Metadata strip under the hero, from the event details and stats in the site content.
  const detail = (label: string) => venue.details.find((d) => d.label === label)?.value;
  const capacity = venue.stats.find((s) => s.label === "Attendees")?.value;
  const META = [
    { label: "Dates", value: detail("Dates") ?? "To be announced" },
    { label: "Venue", value: detail("City") ?? "To be announced" },
    { label: "Capacity", value: capacity ? `${capacity} attendees` : "To be announced" },
    { label: "Format", value: detail("Format") ?? "Hybrid" },
  ];
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
          <h1 className="font-heading text-[clamp(2.1rem,9.5vw,4.25rem)] font-extrabold lg:text-[clamp(2.6rem,min(4.6vw,8.2vh),5.5rem)] uppercase leading-[0.98] tracking-[-0.02em] text-foreground">
            <Line delay={0.05} reduce={reduce}>Atlas</Line>
            <Line delay={0.15} reduce={reduce}>Global</Line>
            <Line delay={0.25} reduce={reduce}>
              Summit{" "}
              <span className="text-primary" aria-label="2026">
                <span aria-hidden className="inline-flex tracking-normal">
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
              <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-white/80">18–20 Nov 2026</p>
              <p className="mt-2 font-heading text-[1.7rem] font-bold leading-none tracking-tight">Hyderabad</p>
              <EventStatus />
            </motion.div>

            {/* Copy + speakers */}
            <div className="flex flex-col justify-between gap-4">
              <motion.p {...rise(0.85)} className={`${DISPLAY_FONT} max-w-sm text-balance text-[1.2rem] font-semibold leading-[1.3] text-tertiary-strong sm:text-[1.35rem]`}>
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
                    className="h-6 w-6 text-tertiary-strong transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: video fills the column height */}
        <div className="relative h-[60vw] max-h-[480px] min-h-0 lg:h-full lg:max-h-none">
          <HeroVideo reduce={reduce} />
        </div>
      </div>

      {/* Metadata strip: anchors the bottom of the hero */}
      <div className="container mx-auto px-4 pb-6 lg:pb-8">
        <motion.dl {...rise(1.1)} className="grid grid-cols-2 border-y border-border sm:grid-cols-4">
          {META.map((m, i) => (
            <div
              key={m.label}
              className={`py-4 sm:px-6 sm:first:pl-0 ${i % 2 === 1 ? "border-l border-border pl-4" : ""} ${i >= 2 ? "border-t border-border sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}
            >
              <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-tertiary-ink">{m.label}</dt>
              <dd className="mt-1 font-heading text-sm font-semibold text-foreground sm:text-base">{m.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
