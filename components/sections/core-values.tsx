"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { HAND_FONT, HandArrow, HandCircle, Handwritten } from "@/components/ui/handwritten";

export interface CoreValuesProps {
  id?: string;
  eyebrow: string;
  intro: string;
  /** Handwritten aside next to the intro. */
  note: string;
  values: { title: string; text: string }[];
}

/** True from the `lg` breakpoint up (matches Tailwind's 1024px). */
function useDesktop() {
  const [desktop, setDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/**
 * About page: "Our core values" as a horizontal row of numbered cards.
 * - Desktop: the section pins while you scroll, and the vertical scroll slides the row sideways.
 * - Phones/tablets (and reduced motion): a swipeable row that snaps card by card.
 */
export default function CoreValues({ id = "values", eyebrow, intro, note, values }: CoreValuesProps) {
  const reduce = useReducedMotion() ?? false;
  const desktop = useDesktop();
  const pin = desktop && !reduce;

  const sectionRef = React.useRef<HTMLElement>(null);
  const frameRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLOListElement>(null);

  // How far the row has to travel so the last card ends flush with the frame.
  const distance = useMotionValue(0);
  React.useEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) return;
    const measure = () => distance.set(pin ? Math.max(0, track.scrollWidth - frame.clientWidth) : 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [pin, distance]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const { scrollXProgress } = useScroll({ container: trackRef });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());
  const pinnedBar = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const swipeBar = useTransform(scrollXProgress, [0, 1], [0.12, 1]);

  return (
    <section
      ref={sectionRef}
      id={id}
      // Extra height on desktop is the scroll "runway" that drives the sideways slide.
      className={pin ? "relative h-[300vh]" : "relative"}
    >
      <div className={pin ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-14 md:py-24"}>
        <div className="container mx-auto px-4">
          <div ref={frameRef} className="mx-auto max-w-6xl">
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

            {/* Horizontal row of value cards */}
            <motion.ol
              ref={trackRef}
              style={pin ? { x } : undefined}
              className={
                pin
                  ? "mt-10 flex gap-5 xl:mt-14"
                  : "-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              }
            >
              {values.map((v, i) => (
                <li
                  key={v.title}
                  className="group relative flex w-[80vw] max-w-[340px] shrink-0 snap-start flex-col border border-border bg-card p-7 shadow-[var(--shadow-subtle)] transition-colors duration-300 hover:bg-secondary/60 sm:w-[340px] sm:p-8 lg:w-[380px] lg:max-w-none lg:p-9"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden
                      className={`${HAND_FONT} inline-block -rotate-6 text-5xl font-bold leading-none text-primary transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110 lg:text-6xl`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} / {String(values.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-snug text-foreground sm:text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{v.text}</p>
                </li>
              ))}
            </motion.ol>

            {/* Progress: follows the page scroll when pinned, the swipe otherwise */}
            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-[3px] flex-1 overflow-hidden bg-border">
                <motion.span
                  className="absolute inset-0 origin-left bg-primary"
                  style={{ scaleX: pin ? pinnedBar : swipeBar }}
                />
              </div>
              <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {pin ? "Scroll" : "Swipe"} →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
