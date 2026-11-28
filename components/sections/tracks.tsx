"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
  DnaIcon,
  AtomIcon,
  GlobeHemisphereWestIcon,
  ChartLineIcon,
  UsersThreeIcon,
  type IconProps,
} from "@phosphor-icons/react";

type TrackIcon = React.ComponentType<IconProps>;

export interface BentoTrackItem {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  audience?: string;
  icon?: TrackIcon;
  colSpan?: string;
}

export interface FUIBentoGridDarkProps {
  id?: string;
  className?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  tracks?: BentoTrackItem[];
}

const DEFAULT_TRACKS: BentoTrackItem[] = [
  {
    id: "life-sciences",
    eyebrow: "Biology & Biomedicine",
    title: "Life Sciences",
    description:
      "Genomics, cell and molecular biology, ecology and plant science, with a focus on lab methods, reagents and results that replicate.",
    audience: "Biologists, lab leads, postdocs and PhD researchers",
    icon: DnaIcon,
    colSpan: "sm:col-span-1 lg:col-span-2",
  },
  {
    id: "physical-sciences",
    eyebrow: "Physics, Chemistry & Materials",
    title: "Physical Sciences",
    description:
      "Experimental and theoretical work in physics, chemistry and materials: instruments, measurement, shared facilities and what broke along the way.",
    audience: "Physicists, chemists, materials scientists, instrument specialists",
    icon: AtomIcon,
    colSpan: "sm:col-span-1 lg:col-span-2",
  },
  {
    id: "earth-climate",
    eyebrow: "Fieldwork & Observation",
    title: "Earth & Climate",
    description:
      "Climate, hydrology, oceans, soils and air quality: fieldwork, long-term monitoring, sensor networks and working with messy environmental records.",
    audience: "Earth and environmental scientists, field researchers, monitoring teams",
    icon: GlobeHemisphereWestIcon,
    colSpan: "sm:col-span-1 lg:col-span-2",
  },
  {
    id: "data-methods",
    eyebrow: "Statistics & Reproducibility",
    title: "Data & Methods",
    description:
      "Study design, statistics, research software and data management: the practical work of making results others can check and reuse.",
    audience: "Statisticians, research software engineers, data stewards, method-minded researchers",
    icon: ChartLineIcon,
    colSpan: "sm:col-span-1 lg:col-span-3",
  },
  {
    id: "science-society",
    eyebrow: "Funding, Policy & Open Science",
    title: "Science & Society",
    description:
      "How research gets funded, published, shared and used: open data, peer review, research careers, policy advice and public engagement.",
    audience: "Research leaders, funders, science policy staff, communicators",
    icon: UsersThreeIcon,
    colSpan: "sm:col-span-2 lg:col-span-3",
  },
];

export function BentoCard({
  className = "",
  index,
  eyebrow,
  title,
  description,
  audience,
  icon: Icon,
}: {
  className?: string;
  index: number;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  audience?: React.ReactNode;
  icon?: TrackIcon;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={clsx(
        className,
        "group relative flex flex-col justify-between p-6 sm:p-7",
        "bg-card text-card-foreground border border-border shadow-[var(--shadow-subtle)]",
        "transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-hover)]"
      )}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center bg-tertiary/10 text-tertiary-strong transition-colors duration-300 group-hover:bg-tertiary-strong group-hover:text-white">
            {Icon && <Icon weight="duotone" size={28} />}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-5 font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">
          {eyebrow}
        </p>

        <h3 className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {audience && (
        <div className="mt-5 flex items-start gap-2 border-t border-border pt-4 font-mono text-xs text-foreground">
          <UsersThreeIcon weight="duotone" size={18} className="shrink-0 text-tertiary-strong" />
          <span>{audience}</span>
        </div>
      )}
    </motion.div>
  );
}

export default function FUIBentoGridDark({
  id = "tracks",
  className = "",
  sectionTitle = "TRACKS",
  sectionSubtitle = "Five tracks for researchers working at the bench, in the field and on the data.",
  tracks = DEFAULT_TRACKS,
}: FUIBentoGridDarkProps) {
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        {/* Header, centered like the hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            {sectionSubtitle}
          </p>
        </div>

        {/* 3 + 2 grid, fits within one screen on desktop */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
          {tracks.map((track, i) => (
            <BentoCard
              key={track.title}
              index={i}
              eyebrow={track.eyebrow}
              title={track.title}
              description={track.description}
              audience={track.audience}
              icon={track.icon}
              className={clsx("w-[85%] shrink-0 snap-center sm:w-auto sm:shrink", track.colSpan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
