"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { STICKY_FEATURES, type StickyFeature } from "@/lib/sticky-cards-data";

export interface StickyFeatureSectionProps {
  id?: string;
  className?: string;
  features?: StickyFeature[];
  title?: string;
  subtitle?: string;
}

export function StickyFeatureSection({
  id = "days",
  className = "",
  features = STICKY_FEATURES,
  title = "YOUR THREE DAYS",
  subtitle = "From the main stage to the workshop floor, here is how the days run.",
}: StickyFeatureSectionProps) {
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 font-mono text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </motion.div>

        {/* Cards stick near the top and stack as you scroll */}
        <div className="mx-auto w-full max-w-6xl">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={clsx(
                "mb-6 grid md:sticky grid-cols-1 items-center gap-6 border border-border p-6 shadow-[var(--shadow-subtle)] md:mb-14 md:grid-cols-2 md:gap-10 md:p-10",
                f.bgColor,
              )}
              style={{ top: `calc(5.5rem + ${i * 14}px)` }} // applies only where md:sticky is active
            >
              <div className="flex flex-col justify-center">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                  {f.eyebrow}
                </span>
                <h3 className="mt-3 font-mono text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-4 font-mono text-base leading-relaxed text-foreground/75">{f.description}</p>
              </div>
              <div className={clsx(i % 2 === 1 && "md:order-first")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.imageUrl}
                  alt={f.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full border border-border object-cover shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StickyFeatureSection;
