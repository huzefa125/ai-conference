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
          <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </motion.div>

        {/* Desktop: split cards that stick and stack as you scroll */}
        <div className="mx-auto hidden w-full max-w-6xl md:block">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={clsx(
                "sticky mb-14 grid grid-cols-2 items-center gap-10 border border-border p-10 shadow-[var(--shadow-subtle)]",
                f.bgColor,
              )}
              style={{ top: `calc(5.5rem + ${i * 14}px)` }}
            >
              <div className="flex flex-col justify-center">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">{f.eyebrow}</span>
                <h3 className="mt-3 text-3xl font-bold leading-tight text-foreground">{f.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/75">{f.description}</p>
              </div>
              <div className={clsx(i % 2 === 1 && "order-first")}>
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

        {/* Mobile: compact photo cards that also stick and stack as you scroll */}
        <div className="md:hidden">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="sticky relative isolate mb-5 flex min-h-[21rem] flex-col justify-end overflow-hidden border border-border bg-foreground shadow-[var(--shadow-subtle)]"
              style={{ top: `calc(4.5rem + ${i * 12}px)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.imageUrl} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/10" />
              <div className="p-5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#93b4ff]">{f.eyebrow}</span>
                <h3 className="mt-2 text-xl font-bold leading-tight text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/85">{f.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StickyFeatureSection;
