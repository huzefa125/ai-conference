"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowRightIcon, PlusIcon } from "@phosphor-icons/react";
import { useContent } from "@/components/providers/content-provider";

/**
 * FAQ: numbered, easy-to-scan questions. The open question gets a Hyper Cobalt bar and a faint tint,
 * and a contact prompt sits underneath for anything not covered.
 */
export default function Faq({ id = "faq", className = "" }: { id?: string; className?: string }) {
  const { faqs: FAQS } = useContent();
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">FAQ</h2>
          <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
            Answers to the questions we get asked most.
          </p>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          defaultValue="item-0"
          className="mx-auto mt-10 max-w-3xl divide-y divide-border border border-border bg-card shadow-[var(--shadow-subtle)]"
        >
          {FAQS.map((f, i) => (
            <Accordion.Item
              key={f.q}
              value={`item-${i}`}
              className="relative transition-colors data-[state=open]:bg-accent before:absolute before:inset-y-0 before:left-0 before:w-1 before:origin-top before:scale-y-0 before:bg-primary before:transition-transform data-[state=open]:before:scale-y-100"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left text-base font-bold text-foreground transition-colors hover:text-primary sm:gap-5 sm:px-7 sm:text-lg">
                  <span className="w-7 shrink-0 font-mono text-sm font-semibold text-tertiary-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-border bg-card transition-colors group-data-[state=open]:border-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
                    <PlusIcon weight="bold" size={14} className="transition-transform duration-200 group-data-[state=open]:rotate-45" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden pb-6 pl-[3.75rem] pr-5 text-base leading-relaxed text-muted-foreground sm:pl-[4.75rem] sm:pr-16">
                {f.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mx-auto mt-6 flex max-w-3xl flex-col items-start justify-between gap-3 border border-border bg-card px-5 py-4 sm:flex-row sm:items-center sm:px-7">
          <p className="text-base text-foreground">Still have a question? The team replies within one business day.</p>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact the team
            <ArrowRightIcon weight="bold" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
