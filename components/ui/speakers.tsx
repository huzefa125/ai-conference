"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { UserIcon } from "@phosphor-icons/react";
import { TRACK_LABELS } from "@/lib/agenda-data";
import { SPEAKERS, type Speaker } from "@/lib/speakers-data";

export interface SpeakersProps {
  id?: string;
  className?: string;
  speakers?: Speaker[];
  title?: string;
  subtitle?: string;
}

export default function Speakers({
  id = "speakers",
  className = "",
  speakers = SPEAKERS,
  title = "SPEAKERS",
  subtitle = "Researchers, engineers and operators who build and run AI in production.",
}: SpeakersProps) {
  return (
    <section id={id} className={clsx("w-full py-16 md:py-20", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 2xl:gap-6 [&::-webkit-scrollbar]:hidden">
          {speakers.map((s, i) => (
            <SpeakerCard key={`${s.name}-${i}`} speaker={s} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
          More speakers are added as they confirm.
        </p>
      </div>
    </section>
  );
}

function SpeakerCard({ speaker: s, index }: { speaker: Speaker; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
      className="group flex w-[72%] shrink-0 snap-center flex-col md:w-auto md:shrink border border-border bg-card shadow-[var(--shadow-subtle)] transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-hover)]"
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {s.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={s.photo}
            alt={s.name}
            className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <UserIcon weight="duotone" size={72} />
          </div>
        )}
        {s.keynote && (
          <span className="absolute left-0 top-3 bg-primary px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
            Keynote
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-sm font-bold leading-snug text-foreground sm:text-base">
          {s.name}
        </h3>
        <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
          {s.role}, {s.company}
        </p>
        {s.track && (
          <p className="mt-3 border-t border-border pt-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
            {TRACK_LABELS[s.track]}
          </p>
        )}
      </div>
    </motion.article>
  );
}
