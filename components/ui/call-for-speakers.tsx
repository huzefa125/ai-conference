"use client";

import * as React from "react";
import { clsx } from "clsx";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useContent } from "@/components/content-provider";

export default function CallForSpeakers({ id = "cfp", className = "" }: { id?: string; className?: string }) {
  const { cfp: CFP } = useContent();
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-10 border border-border bg-card p-6 shadow-[var(--shadow-subtle)] sm:p-10 lg:grid-cols-2 lg:gap-14">
          {/* Copy + CTA */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground uppercase text-balance">
              {CFP.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{CFP.text}</p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href={CFP.href}
                className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all hover:bg-primary/90 hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)]"
              >
                {CFP.cta}
                <ArrowRightIcon weight="bold" size={16} />
              </a>
              <span className="font-mono text-xs text-muted-foreground">{CFP.note}</span>
            </div>
          </div>

          {/* Steps */}
          <ol className="divide-y divide-border border border-border">
            {CFP.steps.map((s, i) => (
              <li key={s.label} className="flex items-start gap-4 p-5">
                <span className="text-2xl font-bold leading-none text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-base font-bold text-foreground">{s.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
