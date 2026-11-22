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
        <div className="flex flex-col items-start justify-between gap-8 bg-primary px-6 py-10 text-primary-foreground shadow-[0_8px_40px_rgba(37,99,235,0.25)] sm:px-10 md:flex-row md:items-center md:py-12">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl text-balance">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
              {text}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={primary.href}
              className="inline-flex items-center justify-center gap-2 bg-card px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {primary.label}
              <ArrowRightIcon weight="bold" size={16} />
            </a>
            <a
              href={secondary.href}
              className="inline-flex items-center justify-center border-2 border-primary-foreground/40 px-7 py-3.5 text-sm font-medium transition-colors hover:border-primary-foreground hover:bg-white/10"
            >
              {secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
