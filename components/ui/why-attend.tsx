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

        <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ATTEND.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className="group bg-card p-6 transition-colors hover:bg-secondary/50 sm:p-8"
              >
                <Icon weight="duotone" size={32} className="text-primary" />
                <h3 className="mt-5 font-mono text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
