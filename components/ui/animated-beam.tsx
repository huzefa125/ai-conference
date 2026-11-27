"use client";

import { type RefObject, useEffect, useId, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/*
 * A curved line between two elements inside a container, with a gradient pulse travelling along it.
 * Adapted from the Magic UI animated beam: React 19 ref types, a fixed default duration (no random
 * value during render, which breaks hydration), and it also re-measures when either end resizes.
 */
export interface AnimatedBeamProps {
  className?: string;
  /** The positioned (relative) element the beam is drawn in. */
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Bend of the curve in px; positive bends up, negative bends down. */
  curvature?: number;
  /** Run the pulse from `toRef` back to `fromRef`. */
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  // The gradient slides along x; reversed beams slide the other way.
  const gradient = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] };

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const a = fromRef.current;
      const b = toRef.current;
      if (!container || !a || !b) return;

      const box = container.getBoundingClientRect();
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      setSize({ width: box.width, height: box.height });

      const startX = ra.left - box.left + ra.width / 2 + startXOffset;
      const startY = ra.top - box.top + ra.height / 2 + startYOffset;
      const endX = rb.left - box.left + rb.width / 2 + endXOffset;
      const endY = rb.top - box.top + rb.height / 2 + endYOffset;
      const controlY = startY - curvature;
      setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`);
    };

    const observer = new ResizeObserver(update);
    for (const el of [containerRef.current, fromRef.current, toRef.current]) if (el) observer.observe(el);
    update();
    return () => observer.disconnect();
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg
      aria-hidden
      fill="none"
      width={size.width}
      height={size.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${size.width} ${size.height}`}
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={gradient}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0 }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
