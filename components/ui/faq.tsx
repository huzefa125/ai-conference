"use client";

import * as React from "react";
import { clsx } from "clsx";
import * as Accordion from "@radix-ui/react-accordion";
import { PlusIcon } from "@phosphor-icons/react";
import { FAQS } from "@/lib/site-data";

export default function Faq({ id = "faq", className = "" }: { id?: string; className?: string }) {
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            FAQ
          </h2>
          <p className="mt-4 font-mono text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            Answers to the questions we get asked most.
          </p>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="mx-auto mt-10 max-w-3xl divide-y divide-border border border-border bg-card shadow-[var(--shadow-subtle)]"
        >
          {FAQS.map((f, i) => (
            <Accordion.Item key={f.q} value={`item-${i}`}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left font-mono text-sm font-bold text-foreground transition-colors hover:bg-secondary/50 sm:px-6 sm:text-base">
                  {f.q}
                  <PlusIcon
                    weight="bold"
                    size={18}
                    className="shrink-0 text-primary transition-transform duration-200 group-data-[state=open]:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden px-5 pb-5 font-mono text-sm leading-relaxed text-muted-foreground sm:px-6">
                {f.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
