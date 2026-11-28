"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DISPLAY_FONT } from "@/components/ui/display-font";

/*
 * Accent lines in the display font (see display-font.ts). Replaces the earlier handwritten notes:
 * no pen animation, no hand-drawn strokes, no tilt.
 */

/** A short accent line in the display font that fades up once when it scrolls into view. */
export function DisplayText({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.span
      className={cn("inline-block leading-tight text-tertiary-strong", DISPLAY_FONT, className)}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}
