"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Chat-style FAQ: questions as pills on the left, answers as cobalt speech bubbles on the right.
 * Adapted from the Ruixen "scroll FAQ accordion" (no pinning, no GSAP). Every question starts closed and
 * opens only when clicked; the answer bubble slides open.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export default function ScrollFaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  // All questions start closed.
  const [open, setOpen] = React.useState<string[]>([]);

  return (
    <Accordion.Root type="multiple" value={open} onValueChange={setOpen} className={cn("space-y-7", className)}>
      {items.map((item, i) => {
        const id = `q-${i}`;
        const isOpen = open.includes(id);
        return (
          <div key={item.q}>
            <Accordion.Item value={id}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center gap-3 text-left">
                  <span
                    className={cn(
                      "inline-flex items-center gap-3 rounded-2xl rounded-bl-sm px-5 py-3.5 text-base font-semibold transition-colors duration-300 sm:text-lg",
                      isOpen ? "bg-primary/10 text-primary" : "bg-secondary text-foreground group-hover:bg-primary/10",
                    )}
                  >
                    <span className="font-mono text-sm font-semibold text-tertiary-ink">{String(i + 1).padStart(2, "0")}</span>
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                      isOpen ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground",
                    )}
                  >
                    {isOpen ? <Minus aria-hidden className="h-4 w-4" /> : <Plus aria-hidden className="h-4 w-4" />}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content forceMount asChild>
                <motion.div
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  variants={{ open: { height: "auto", opacity: 1 }, closed: { height: 0, opacity: 0 } }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                  aria-hidden={!isOpen}
                >
                  <div className="ml-8 mt-3 flex justify-end sm:ml-24">
                    <p className="max-w-xl rounded-2xl rounded-br-sm bg-primary px-5 py-3.5 text-base leading-relaxed text-primary-foreground shadow-[0_10px_30px_-14px_rgba(0,82,255,0.6)]">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        );
      })}
    </Accordion.Root>
  );
}
