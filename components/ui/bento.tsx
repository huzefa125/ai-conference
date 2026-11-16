"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Layers, Cpu, Compass, Users } from "lucide-react";

export interface BentoTrackItem {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  audience?: string;
  image: string;
  icon?: React.ComponentType<{ className?: string }>;
  colSpan?: string;
  roundedClass?: string;
}

export interface FUIBentoGridDarkProps {
  id?: string;
  className?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  tracks?: BentoTrackItem[];
}

const DEFAULT_TRACKS: BentoTrackItem[] = [
  {
    id: "ai-frontiers",
    eyebrow: "RESEARCH & GOVERNANCE",
    title: "AI Frontiers",
    description:
      "Explore governance, ethics, societal impact, and frontier research—multimodal, agentic, and world models included.",
    audience: "Perfect for researchers, policy leaders, and senior strategists.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    icon: Sparkles,
    colSpan: "lg:col-span-3",
    roundedClass: "max-lg:rounded-t-3xl lg:rounded-tl-3xl",
  },
  {
    id: "ai-builders",
    eyebrow: "SYSTEMS & ENGINEERING",
    title: "AI Builders",
    description:
      "Learn how to ship agentic and multi-LLM systems with the right toolchains, fine-tuning, retrieval, and scaling patterns.",
    audience: "Perfect for software engineers, architects, and tech leads.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    icon: Terminal,
    colSpan: "lg:col-span-3",
    roundedClass: "lg:rounded-tr-3xl",
  },
  {
    id: "ai-stack",
    eyebrow: "INFRASTRUCTURE & MLOPS",
    title: "The AI Stack",
    description:
      "Dive deep into model design and training, distributed inference, data and evaluations, accelerators, and MLOps.",
    audience: "Perfect for ML researchers, ML/AI engineers, and infrastructure teams.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    icon: Layers,
    colSpan: "lg:col-span-2",
    roundedClass: "lg:rounded-bl-3xl",
  },
  {
    id: "applied-ai",
    eyebrow: "DEPLOYMENT & PRODUCT",
    title: "Applied AI",
    description:
      "See how real deployments work: workflow automation, edge/on-device intelligence, rigorous evaluation, and case studies.",
    audience: "Perfect for product managers, applied scientists, and solutions/operations leaders.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    icon: Cpu,
    colSpan: "lg:col-span-2",
  },
  {
    id: "ai-strategy",
    eyebrow: "LEADERSHIP & ADOPTION",
    title: "AI Strategy",
    description:
      "Lead enterprise adoption with governance, risk management, capability building, ROI frameworks, and culture change.",
    audience: "Perfect for executives, strategists, and transformation owners.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    icon: Compass,
    colSpan: "lg:col-span-2",
    roundedClass: "max-lg:rounded-b-3xl lg:rounded-br-3xl",
  },
];

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  audience,
  graphic,
  icon: Icon,
  fade = ["bottom"],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  audience?: React.ReactNode;
  graphic?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-xl",
        "bg-slate-950 text-white transform-gpu border border-white/10 shadow-lg ring-1 ring-white/10",
        "hover:border-primary/50 transition-colors duration-300"
      )}
    >
      {/* Background Graphic with Vignette / Dark Overlay */}
      <div className="relative h-[24rem] shrink-0 overflow-hidden">
        {graphic}
        {/* Darkening base overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-50% opacity-40" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-60% opacity-75" />
        )}
      </div>

      {/* Card Content */}
      <div className="relative p-6 sm:p-8 z-20 isolate mt-[-100px] flex-1 flex flex-col justify-between backdrop-blur-md bg-slate-950/80 border-t border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-primary uppercase">
            {Icon && <Icon className="w-3.5 h-3.5 text-primary" />}
            <span>{eyebrow}</span>
          </div>

          <h3 className="mt-2 text-2xl font-mono font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="mt-3 text-sm text-slate-300 font-mono leading-relaxed">
            {description}
          </p>
        </div>

        {audience && (
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-slate-400">
            <Users className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{audience}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function FUIBentoGridDark({
  id = "tracks",
  className = "",
  sectionEyebrow = "CONFERENCE PROGRAM",
  sectionTitle = "TRACKS",
  sectionSubtitle = "Five high-signal, zero-fluff technical tracks designed for founders, engineers, researchers, and enterprise executives.",
  tracks = DEFAULT_TRACKS,
}: FUIBentoGridDarkProps) {
  return (
    <section id={id} className={clsx("py-20 md:py-32 w-full", className)}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{sectionEyebrow}</span>
          </div>

          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            {sectionTitle}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground font-mono leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* 6-Column Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {tracks.map((track) => (
            <BentoCard
              key={track.title}
              eyebrow={track.eyebrow}
              title={track.title}
              description={track.description}
              audience={track.audience}
              icon={track.icon}
              className={clsx(track.colSpan, track.roundedClass)}
              graphic={
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${track.image})` }}
                />
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

