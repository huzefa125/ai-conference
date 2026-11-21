"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { CalendarBlankIcon, MapPinIcon, BuildingsIcon, BroadcastIcon } from "@phosphor-icons/react";
import { useContent } from "@/components/content-provider";

const DETAIL_ICONS = [CalendarBlankIcon, MapPinIcon, BuildingsIcon, BroadcastIcon];

export default function Venue({ id = "about", className = "" }: { id?: string; className?: string }) {
  const { venue: VENUE } = useContent();
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text + details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              {VENUE.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground uppercase text-balance">
              {VENUE.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {VENUE.intro}
            </p>

            <dl className="mt-8 grid grid-cols-1 border border-border bg-card sm:grid-cols-2">
              {VENUE.details.map((d, i) => {
                const Icon = DETAIL_ICONS[i];
                return (
                  <div
                    key={d.label}
                    className={clsx(
                      "flex items-start gap-3 p-4 border-border",
                      i > 0 && "border-t",
                      i === 1 && "sm:border-t-0 sm:border-l",
                      i === 3 && "sm:border-l"
                    )}
                  >
                    <Icon weight="duotone" size={22} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {d.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-bold text-foreground">{d.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative min-h-[18rem] overflow-hidden border border-border bg-muted shadow-[var(--shadow-subtle)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VENUE.image}
              alt="Hyderabad"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Stats strip */}
        <div id="highlights" className="mt-8 grid grid-cols-3 border border-border bg-card shadow-[var(--shadow-subtle)]">
          {VENUE.stats.map((s, i) => (
            <div key={s.label} className={clsx("px-3 py-6 text-center sm:py-8", i > 0 && "border-l border-border")}>
              <div className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
