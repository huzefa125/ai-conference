"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Mark = { viewBox: string; path: string; fillRule?: "evenodd" | "nonzero" };

/**
 * A brand mark as a large, faint decoration: the outline draws in, the brand-blue fill fades in,
 * then it keeps turning slowly and gently breathing. Used behind the keynote stats and in the hero.
 */
export function AnimatedMark({
  mark,
  show,
  reduce,
  className,
  delay = 0.4,
  spinSeconds = 60,
  strength = 1,
}: {
  mark: Mark;
  /** Start the entrance (e.g. when the section scrolls into view). */
  show: boolean;
  reduce: boolean;
  /** Size and position, e.g. "absolute right-0 top-0 h-72 w-72". */
  className?: string;
  delay?: number;
  spinSeconds?: number;
  /** Multiplies the fill and outline opacity. Thin, open marks (ChatGPT) need more than bold ones (Claude). */
  strength?: number;
}) {
  // Pad the view box by 4% so the breathing scale never clips the edges.
  const [x, y, w, h] = mark.viewBox.split(/\s+/).map(Number);
  const pad = Math.max(w, h) * 0.04;
  const viewBox = `${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`;

  return (
    <motion.svg
      aria-hidden
      viewBox={viewBox}
      className={`pointer-events-none ${className ?? ""}`}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: spinSeconds, ease: "linear", repeat: Infinity }}
    >
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <motion.path
          d={mark.path}
          fillRule={mark.fillRule}
          fill="var(--primary)"
          stroke="var(--primary)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }}
          animate={show ? { pathLength: 1, fillOpacity: 0.11 * strength, strokeOpacity: Math.min(1, 0.28 * strength) } : undefined}
          transition={{
            pathLength: { duration: 2, delay, ease: EASE },
            fillOpacity: { duration: 0.9, delay: delay + 1.5 },
            strokeOpacity: { duration: 0.9, delay: delay + 1.5 },
          }}
        />
      </motion.g>
    </motion.svg>
  );
}
