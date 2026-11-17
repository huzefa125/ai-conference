"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
  FlaskIcon,
  CodeIcon,
  StackIcon,
  RocketLaunchIcon,
  CompassToolIcon,
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
    id: "ai-frontiers",
    eyebrow: "Research & Governance",
    title: "AI Frontiers",
    description:
      "Governance, ethics, societal impact and frontier research, including multimodal, agentic and world models.",
    audience: "Researchers, policy leaders, senior strategists",
    icon: FlaskIcon,
    colSpan: "sm:col-span-1 lg:col-span-2",
  },
  {
    id: "ai-builders",
    eyebrow: "Systems & Engineering",
    title: "AI Builders",
    description:
      "Shipping agentic and multi-LLM systems: toolchains, fine-tuning, retrieval and scaling patterns.",
    audience: "Software engineers, architects, tech leads",
    icon: CodeIcon,
    colSpan: "sm:col-span-1 lg:col-span-2",
  },
  {
    id: "ai-stack",
    eyebrow: "Infrastructure & MLOps",
    title: "The AI Stack",
    description:
      "Model design and training, distributed inference, data and evaluation, accelerators and MLOps.",
    audience: "ML researchers, ML/AI engineers, infrastructure teams",
    icon: StackIcon,
    colSpan: "sm:col-span-1 lg:col-span-2",
  },
  {
    id: "applied-ai",
    eyebrow: "Deployment & Product",
    title: "Applied AI",
    description:
      "How real deployments work: workflow automation, on-device intelligence, evaluation and case studies.",
    audience: "Product managers, applied scientists, operations leaders",
    icon: RocketLaunchIcon,
    colSpan: "sm:col-span-1 lg:col-span-3",
  },
  {
    id: "ai-strategy",
    eyebrow: "Leadership & Adoption",
    title: "AI Strategy",
    description:
      "Leading enterprise adoption: governance, risk management, capability building, ROI and culture change.",
    audience: "Executives, strategists, transformation owners",
    icon: CompassToolIcon,
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
          <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            {Icon && <Icon weight="duotone" size={28} />}
          </div>
          <span className="font-mono text-sm font-medium text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>

        <h3 className="mt-1.5 font-mono text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h3>

        <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {audience && (
        <div className="mt-5 flex items-start gap-2 border-t border-border pt-4 font-mono text-xs text-foreground/70">
          <UsersThreeIcon weight="duotone" size={18} className="shrink-0 text-primary" />
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
  sectionSubtitle = "Five tracks for founders, engineers, researchers and enterprise leaders.",
  tracks = DEFAULT_TRACKS,
}: FUIBentoGridDarkProps) {
  return (
    <section id={id} className={clsx("w-full py-16 md:py-20", className)}>
      <div className="container mx-auto px-4">
        {/* Header, centered like the hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            {sectionTitle}
          </h2>
          <p className="mt-4 font-mono text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            {sectionSubtitle}
          </p>
        </div>

        {/* 3 + 2 grid, fits within one screen on desktop */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          {tracks.map((track, i) => (
            <BentoCard
              key={track.title}
              index={i}
              eyebrow={track.eyebrow}
              title={track.title}
              description={track.description}
              audience={track.audience}
              icon={track.icon}
              className={track.colSpan}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
