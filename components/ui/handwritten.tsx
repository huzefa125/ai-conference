"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/*
 * Handwritten notes in blue "ink": the site's one informal voice.
 *
 * <Handwritten>  writes itself left to right while a fountain pen travels along the line.
 * <HandCircle>   draws a loose hand-drawn loop around whatever it wraps.
 * <HandArrow>    draws a curly arrow (shaft first, then the head).
 *
 * Everything starts when it scrolls into view (once), after an optional `delay`,
 * and renders finished and still for people who prefer reduced motion.
 */

const INK = "var(--primary)";

/** Caveat (loaded in app/layout.tsx) with handwriting fallbacks. Use for any handwritten text. */
export const HAND_FONT = "font-[family-name:var(--font-caveat),'Segoe_Print','Bradley_Hand',cursive]";

function useInk<T extends Element>() {
  const reduce = useReducedMotion() ?? false;
  const ref = React.useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return { ref, reduce, go: inView || reduce };
}

/** One stroke that draws itself. */
function Stroke({
  d,
  go,
  reduce,
  delay,
  duration,
  width = 2.5,
}: {
  d: string;
  go: boolean;
  reduce: boolean;
  delay: number;
  duration: number;
  width?: number;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={INK}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      animate={go ? { pathLength: 1, opacity: 1 } : undefined}
      transition={{
        pathLength: { duration, delay, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.01, delay },
      }}
    />
  );
}

/** A small fountain pen; its nib tip sits at the bottom centre of the box. */
function PenGlyph() {
  return (
    <svg viewBox="0 0 32 64" className="h-full w-full overflow-visible drop-shadow-[0_6px_8px_rgba(15,23,42,0.25)]">
      <g transform="rotate(28 16 64)">
        <rect x="9" y="-6" width="14" height="42" rx="5" className="fill-foreground" />
        <rect x="9" y="28" width="14" height="4" className="fill-primary" />
        <rect x="21.5" y="-2" width="2.6" height="20" rx="1.3" fill="#94a3b8" />
        <path d="M10 36H22L20 46H12Z" fill="#1e293b" />
        <path d="M12 46H20L16 64Z" fill="#cbd5e1" />
        <path d="M16 51V62" stroke="#0f172a" strokeWidth="0.9" />
        <circle cx="16" cy="51" r="1.3" fill="#0f172a" />
      </g>
    </svg>
  );
}

export function Handwritten({
  children,
  delay = 0,
  underline = false,
  className,
}: {
  children: string;
  delay?: number;
  /** Adds a hand-drawn underline once the words are written. */
  underline?: boolean;
  className?: string;
}) {
  const { ref, reduce, go } = useInk<HTMLSpanElement>();
  // Roughly the speed of real handwriting, clamped so long notes don't drag.
  const write = Math.min(2.4, Math.max(0.9, children.length * 0.06));
  const land = 0.25; // pen comes down
  const lift = 0.45; // pen lifts away
  const total = land + write + lift;

  return (
    <span ref={ref} className={cn("relative inline-block font-semibold", HAND_FONT, " leading-none text-primary", className)}>
      <motion.span
        className="inline-block whitespace-nowrap px-[0.12em] py-[0.2em]"
        initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={go ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={{ duration: write, delay: delay + land, ease: "linear" }}
      >
        {children}
      </motion.span>

      {underline && (
        <svg
          aria-hidden
          viewBox="0 0 200 16"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-[0.12em] left-0 h-[0.32em] w-full overflow-visible"
        >
          <Stroke d="M3 10C50 4 100 14 150 7S190 6 197 9" go={go} reduce={reduce} delay={delay + land + write} duration={0.5} />
        </svg>
      )}

      {/* The pen: lands, travels with the writing, then lifts off and fades */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute bottom-[0.28em] left-0 z-10 block h-[1.7em] w-[0.85em] -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={
            go
              ? { left: ["0%", "0%", "100%", "100%"], opacity: [0, 1, 1, 0], y: [-10, 0, 0, -18] }
              : undefined
          }
          transition={{ duration: total, delay, times: [0, land / total, (land + write) / total, 1], ease: "linear" }}
        >
          {/* Small wobble while the nib is on the paper */}
          <motion.span
            className="block h-full w-full origin-bottom"
            animate={go ? { y: [0, -1.5, 0.5, -1, 0], rotate: [0, -3, 2, -2, 0] } : undefined}
            transition={{ duration: 0.28, repeat: Math.ceil(total / 0.28), ease: "easeInOut" }}
          >
            <PenGlyph />
          </motion.span>
        </motion.span>
      )}
    </span>
  );
}

/** Draws a loose loop around its children, like circling a word on paper. */
export function HandCircle({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, reduce, go } = useInk<HTMLSpanElement>();
  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -left-[6%] -top-[18%] h-[136%] w-[112%] overflow-visible"
      >
        <Stroke
          d="M34 14C84 0 168 2 192 30C212 60 124 78 62 72C12 66-2 42 20 22C40 6 96 2 128 8"
          go={go}
          reduce={reduce}
          delay={delay}
          duration={0.9}
          width={3}
        />
      </svg>
    </span>
  );
}

/** A curly arrow pointing down and to the left. Flip it with `-scale-x-100` to point right. */
export function HandArrow({ delay = 0, className }: { delay?: number; className?: string }) {
  const { ref, reduce, go } = useInk<SVGSVGElement>();
  return (
    <svg ref={ref} aria-hidden viewBox="0 0 80 60" className={cn("pointer-events-none overflow-visible", className)}>
      <Stroke d="M76 6C52 2 32 12 36 26C40 38 56 32 48 22C40 12 20 28 10 52" go={go} reduce={reduce} delay={delay} duration={0.7} />
      <Stroke d="M10 52L7 40M10 52L21 46" go={go} reduce={reduce} delay={delay + 0.7} duration={0.25} />
    </svg>
  );
}
