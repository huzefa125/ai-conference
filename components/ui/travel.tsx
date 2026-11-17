"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { AirplaneTiltIcon, BedIcon, WheelchairIcon, type IconProps } from "@phosphor-icons/react";
import { TRAVEL } from "@/lib/site-data";

const ICONS: Record<string, React.ComponentType<IconProps>> = {
  AirplaneTilt: AirplaneTiltIcon,
  Bed: BedIcon,
  Wheelchair: WheelchairIcon,
};

export default function Travel({ id = "travel", className = "" }: { id?: string; className?: string }) {
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            PLAN YOUR TRIP
          </h2>
          <p className="mt-4 font-mono text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            Everything you need to get to Hyderabad and settle in.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {TRAVEL.map((t, i) => {
            const Icon = ICONS[t.icon];
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border border-border bg-card p-6 shadow-[var(--shadow-subtle)] transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-hover)] sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
                  <Icon weight="duotone" size={28} />
                </div>
                <h3 className="mt-5 font-mono text-lg font-bold text-foreground">{t.title}</h3>
                <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
