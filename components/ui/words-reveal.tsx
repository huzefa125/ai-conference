"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * A sentence whose words rise and fade in one after another, once, when it scrolls into view.
 * Time-based (not scroll-scrubbed), so it always finishes fully sharp. `highlight` words get the cobalt colour.
 */
export function WordsReveal({ text, highlight = [], className }: { text: string; highlight?: string[]; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const words = text.split(" ");
  const marked = new Set(highlight.flatMap((h) => h.split(" ")));

  return (
    <motion.p
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.035 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`inline-block ${marked.has(w.replace(/[.,]/g, "")) ? "text-primary" : ""}`}
          variants={{ hidden: { opacity: 0, y: "0.4em" }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}
