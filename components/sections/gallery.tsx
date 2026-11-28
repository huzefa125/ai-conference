"use client";

import * as React from "react";
import { clsx } from "clsx";
import { useContent } from "@/components/providers/content-provider";
import TailwindImageAccordion from "@/components/sections/image-accordion";

export default function Gallery({ id = "gallery", className = "" }: { id?: string; className?: string }) {
  const { experience: EXPERIENCE } = useContent();
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            THE EXPERIENCE
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            Main stage, workshops and the conversations in between.
          </p>
        </div>

        <TailwindImageAccordion items={EXPERIENCE} className="mt-12 md:max-w-6xl" />
      </div>
    </section>
  );
}
