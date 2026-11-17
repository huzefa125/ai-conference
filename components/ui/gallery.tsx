"use client";

import * as React from "react";
import { clsx } from "clsx";
import { EXPERIENCE } from "@/lib/site-data";
import TailwindImageAccordion from "@/components/ui/tailwind-image-accordion";

export default function Gallery({ id = "gallery", className = "" }: { id?: string; className?: string }) {
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            THE EXPERIENCE
          </h2>
          <p className="mt-4 font-mono text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            Main stage, workshops and the conversations in between.
          </p>
        </div>

        <TailwindImageAccordion items={EXPERIENCE} className="mt-12 md:max-w-6xl" />
      </div>
    </section>
  );
}
