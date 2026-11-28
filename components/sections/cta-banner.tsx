"use client";

import * as React from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";

export interface CtaBannerProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export default function CtaBanner({
  id = "register",
  eyebrow = "Nov 18–20, 2026 · Hyderabad, India",
  title = "Join us at Atlas Global 2026.",
  text = "Pick a pass and reserve your seat, in person or online.",
  primary = { label: "See tickets", href: "#tickets" },
  secondary = { label: "View agenda", href: "#agenda" },
}: CtaBannerProps) {
  return (
    <section id={id} className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Obsidian card: hairline border + soft cobalt/cyan radial lighting (matches the dark testimonial block) */}
        <div className="relative isolate overflow-hidden border border-[color-mix(in_srgb,var(--atlas-cyan)_28%,var(--atlas-navy))] bg-[var(--atlas-navy)] px-6 py-12 text-white sm:px-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_100%_0%,rgba(0,82,255,0.38),transparent_70%),radial-gradient(45%_70%_at_0%_100%,rgba(0,184,217,0.22),transparent_70%)]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,var(--atlas-cyan),transparent)] opacity-60" />

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--atlas-cyan)]">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--atlas-cyan)]" />
                {eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white sm:text-base">{text}</p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={primary.href}
                className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {primary.label}
                <ArrowRightIcon weight="bold" size={16} />
              </a>
              <a
                href={secondary.href}
                className="inline-flex items-center justify-center border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[var(--atlas-cyan)] hover:text-[var(--atlas-cyan)]"
              >
                {secondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
