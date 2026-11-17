"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
  ChalkboardTeacherIcon, WrenchIcon, TargetIcon, HandshakeIcon, BroadcastIcon, NotebookIcon, type IconProps,
} from "@phosphor-icons/react";
import { WHY_ATTEND } from "@/lib/site-data";

const ICONS: Record<string, React.ComponentType<IconProps>> = {
  ChalkboardTeacher: ChalkboardTeacherIcon, Wrench: WrenchIcon, Target: TargetIcon,
  Handshake: HandshakeIcon, Broadcast: BroadcastIcon, Notebook: NotebookIcon,
};

// Bento layout: one entry per WHY_ATTEND item, in order.
// `span` places the tile on the 2-col mobile grid and the 4-col desktop grid.
const TILES = [
  { span: "col-span-2 md:row-span-2", tone: "dark", big: true },
  { span: "col-span-1", tone: "card" },
  { span: "col-span-1", tone: "primary" },
  { span: "col-span-2", tone: "sage" },
  { span: "col-span-1", tone: "sand" },
  { span: "col-span-1 md:col-span-3", tone: "card" },
] as const;

const TONES = {
  dark: { box: "bg-foreground text-white border-foreground", title: "text-white", text: "text-white/75", icon: "text-[#93b4ff]" },
  primary: { box: "bg-primary text-white border-primary", title: "text-white", text: "text-white/85", icon: "text-white" },
  card: { box: "bg-card border-border", title: "text-foreground", text: "text-muted-foreground", icon: "text-primary" },
  sage: { box: "bg-accent border-border", title: "text-accent-foreground", text: "text-accent-foreground/80", icon: "text-accent-foreground" },
  sand: { box: "bg-secondary border-border", title: "text-foreground", text: "text-muted-foreground", icon: "text-primary" },
} as const;

export default function WhyAttend({ id = "why", className = "" }: { id?: string; className?: string }) {
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            WHY ATTEND
          </h2>
          <p className="mt-4 font-mono text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            What you get from three days at Atlas Global.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[minmax(13rem,auto)] md:grid-cols-4">
          {WHY_ATTEND.map((item, i) => {
            const Icon = ICONS[item.icon];
            const tile = TILES[i % TILES.length];
            const t = TONES[tile.tone];
            const big = "big" in tile && tile.big;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className={clsx(
                  "group relative flex flex-col justify-between overflow-hidden border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:p-6",
                  tile.span,
                  t.box,
                  big ? "min-h-[15rem]" : "min-h-[12rem]",
                )}
              >
                <Icon weight="duotone" size={big ? 56 : 36} className={clsx("transition-transform duration-300 group-hover:scale-110", t.icon)} />
                <div className="mt-5">
                  <h3 className={clsx("font-mono font-bold leading-tight", big ? "text-2xl md:text-3xl" : "text-base sm:text-lg", t.title)}>
                    {item.title}
                  </h3>
                  <p className={clsx("mt-2 font-mono leading-relaxed", big ? "text-base" : "text-sm", t.text)}>{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
