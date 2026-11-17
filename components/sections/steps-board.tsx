"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { HOW_IT_WORKS } from "@/lib/how-it-works-data";
import { StepCard } from "./step-card";

const POSITIONS = [
  { className: "md:absolute md:left-[15%] md:top-0", rotate: 3 },
  { className: "md:absolute md:right-[15%] md:top-[120px]", rotate: -3 },
  { className: "md:absolute md:left-[15%] md:top-[450px]", rotate: 3 },
];

export function StepsBoard() {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative px-2 py-6 md:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px)",
            backgroundSize: "100% 32px",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent" />

        <div className="relative mx-auto max-w-[1000px] space-y-8 md:h-[820px] md:space-y-0">
          <svg
            aria-hidden
            viewBox="0 0 1000 820"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
          >
            <m.path
              d="M 290 150 C 500 150, 550 270, 710 270 C 850 270, 500 350, 290 450"
              fill="none"
              stroke="var(--primary)"
              strokeOpacity={0.5}
              strokeWidth={2}
              strokeDasharray="8 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              animate={reduce ? undefined : { strokeDashoffset: [0, -140] }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            />
          </svg>

          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepCard
              key={step.number}
              {...step}
              rotate={POSITIONS[i].rotate}
              className={`relative z-10 ${POSITIONS[i].className}`}
            />
          ))}
        </div>
      </div>
    </LazyMotion>
  );
}
