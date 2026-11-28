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
  // Tickets section is hidden for now, so the default primary action goes to the contact form (Tickets topic).
  primary = { label: "Get tickets", href: "/contact?topic=Tickets" },
  secondary = { label: "View agenda", href: "#agenda" },
}: CtaBannerProps) {
  return (
    <section id={id} className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Solid cobalt card, white text */}
        <div className="bg-primary px-6 py-14 text-center text-primary-foreground shadow-[0_18px_44px_-20px_rgba(0,82,255,0.55)] sm:px-12 md:py-20">

          {/* Centred: eyebrow, heading, text, then buttons, as one balanced block */}
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <div>
              <p className="flex items-center justify-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-white/80">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
                {eyebrow}
              </p>
              <h2 className="mt-4 text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.6rem]">{title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{text}</p>
            </div>

            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a
                href={primary.href}
                className="inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90 rounded-full"
              >
                {primary.label}
                <ArrowRightIcon weight="bold" size={16} />
              </a>
              <a
                href={secondary.href}
                className="inline-flex items-center justify-center border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 rounded-full"
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
