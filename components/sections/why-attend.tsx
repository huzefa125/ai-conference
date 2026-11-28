"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { iconFor } from "@/lib/icons";
import { useContent } from "@/components/providers/content-provider";

export default function WhyAttend({ id = "why", className = "" }: { id?: string; className?: string }) {
  const { whyAttend: WHY_ATTEND, venue: VENUE } = useContent();
  return (
    <section id={id} className={clsx("w-full py-12 md:py-20", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
          {/* Left: sticky intro */}
          <div className="relative isolate lg:sticky lg:top-28 lg:self-start">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-tertiary-ink">Why attend</span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Six reasons to be in the room
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              What you get from three days at Atlas Global.
            </p>

            <dl className="mt-8 grid max-w-md grid-cols-3 border border-border bg-card rounded-2xl">
              {VENUE.stats.map((s, i) => (
                <div key={s.label} className={clsx("px-3 py-4 text-center", i > 0 && "border-l border-border")}>
                  <dt className="text-2xl font-bold tracking-tight text-tertiary-strong sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">{s.label}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#tickets"
              className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_4px_20px_rgba(0,82,255,0.3)] transition-all hover:bg-primary/90 hover:shadow-[0_6px_28px_rgba(0,82,255,0.45)] rounded-full"
            >
              Get your ticket
              <ArrowRightIcon weight="bold" size={16} />
            </a>

          </div>

          {/* Right: numbered list */}
          <ol className="border-t border-border">
            {WHY_ATTEND.map((item, i) => {
              const Icon = iconFor(item.icon);
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                  className="group relative grid grid-cols-[2.75rem_1fr_auto] items-start gap-x-4 border-b border-border px-1 py-6 transition-colors hover:bg-secondary/60 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-6 sm:px-4 sm:py-8"
                >
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-tertiary transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="text-2xl font-bold tabular-nums text-foreground transition-colors group-hover:text-tertiary-strong sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-foreground sm:text-xl">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center bg-tertiary/10 text-tertiary-strong transition-colors group-hover:bg-tertiary-strong group-hover:text-white sm:h-12 sm:w-12">
                    <Icon weight="duotone" size={24} />
                  </span>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
