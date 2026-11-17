"use client";

import * as React from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";

export default function CtaBanner({ id = "register" }: { id?: string }) {
  return (
    <section id={id} className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-8 bg-primary px-6 py-10 text-primary-foreground shadow-[0_8px_40px_rgba(37,99,235,0.25)] sm:px-10 md:flex-row md:items-center md:py-12">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              Nov 18–20, 2026 · Hyderabad, India
            </p>
            <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl text-balance">
              Join us at Atlas Global 2026.
            </h2>
            <p className="mt-3 font-mono text-sm leading-relaxed text-primary-foreground/80">
              Pick a pass and reserve your seat, in person or online.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#tickets"
              className="inline-flex items-center justify-center gap-2 bg-card px-7 py-3.5 font-mono text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              See tickets
              <ArrowRightIcon weight="bold" size={16} />
            </a>
            <a
              href="#agenda"
              className="inline-flex items-center justify-center border-2 border-primary-foreground/40 px-7 py-3.5 font-mono text-sm font-medium transition-colors hover:border-primary-foreground hover:bg-white/10"
            >
              View agenda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
