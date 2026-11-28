"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useContent } from "@/components/providers/content-provider";
import ScrollFaqAccordion from "@/components/ui/scroll-faq-accordion";

/**
 * FAQ in the chat style of ScrollFaqAccordion: question pills, answers open as cobalt bubbles while you scroll.
 * A contact prompt sits underneath for anything not covered. Used on the home and contact pages.
 */
export default function Faq({ id = "faq", className = "" }: { id?: string; className?: string }) {
  const { faqs: FAQS } = useContent();
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">FAQ</h2>
          <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
            Answers to the questions we get asked most.
          </p>
        </div>

        <ScrollFaqAccordion items={FAQS} className="mx-auto mt-12 max-w-3xl" />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-start justify-between gap-3 border border-border bg-card px-5 py-4 sm:flex-row sm:items-center sm:px-7 rounded-2xl">
          <p className="text-base text-foreground">Still have a question? The team replies within one business day.</p>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 rounded-full"
          >
            Contact the team
            <ArrowRightIcon weight="bold" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
