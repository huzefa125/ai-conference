"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Monogram } from "@/components/conference/speaker-card";

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;
  const go = React.useCallback((d: number) => setIndex((i) => (i + d + count) % count), [count]);

  // Gentle auto-advance; pauses on hover/focus and when reduced motion is preferred.
  React.useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [paused, reduce, go]);

  const t = testimonials[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Attendee testimonials"
      className="bg-surface py-14 sm:py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading title="What Our Delegates Say" description="Sample testimonials shown for layout. Replace with real feedback from past attendees." />
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex size-12 items-center justify-center border border-navy/25 text-navy transition-colors hover:bg-navy hover:text-white"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex size-12 items-center justify-center border border-navy/25 text-navy transition-colors hover:bg-navy hover:text-white"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <p className="ml-3 text-sm tabular-nums text-muted-foreground" aria-live="polite">
              {index + 1} / {count}
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <Quote aria-hidden className="absolute -top-2 left-0 size-16 text-blue/15 sm:size-20" strokeWidth={1} />
          <div className="relative min-h-[18rem] sm:min-h-[16rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pt-10"
              >
                <blockquote className="font-serif text-2xl leading-snug text-navy sm:text-3xl">“{t.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <Monogram name={t.name} className="size-14 shrink-0 [&>span]:text-lg" />
                  <div>
                    <p className="font-medium text-navy">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue">{t.event}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex gap-2" role="group" aria-label="Choose testimonial">
            {testimonials.map((x, i) => (
              <button
                key={x.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="group flex h-6 flex-1 items-center"
              >
                <span className={cn("h-0.5 w-full transition-colors", i === index ? "bg-navy" : "bg-border group-hover:bg-navy/40")} />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
