"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { conferences } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConferenceCard } from "@/components/conference/conference-card";

const ALL = "All";
const categories = [ALL, ...Array.from(new Set(conferences.map((c) => c.discipline)))];

export function Conferences() {
  const [active, setActive] = React.useState(ALL);
  const visible = active === ALL ? conferences : conferences.filter((c) => c.discipline === active);

  return (
    <section id="conferences" className="bg-background py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="2027 Programme"
            title="Explore Upcoming Conferences"
            description="Discover opportunities to connect, collaborate and share your research with the global scientific community."
          />
          <Button href="#" variant="outline" size="lg" className="hidden self-start lg:inline-flex lg:self-auto">
            View All Conferences
            <ArrowRight aria-hidden />
          </Button>
        </div>

        <div role="group" aria-label="Filter conferences by discipline" className="mt-10 flex flex-wrap gap-2 border-b border-border pb-6">
          {categories.map((cat) => {
            const isActive = cat === active;
            const count = cat === ALL ? conferences.length : conferences.filter((c) => c.discipline === cat).length;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(cat)}
                className={cn(
                  "inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-border text-navy/80 hover:border-navy hover:text-navy",
                )}
              >
                {cat}
                <span className={cn("text-xs", isActive ? "text-white/70" : "text-muted-foreground")}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((c) => (
              <motion.li
                key={c.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <ConferenceCard conference={c} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-8 text-xs text-muted-foreground">
          Sample listings with placeholder dates, venues and descriptions. Replace with confirmed event data.
        </p>

        <Button href="#" variant="outline" size="lg" className="mt-8 w-full lg:hidden">
          View All Conferences
          <ArrowRight aria-hidden />
        </Button>
      </Container>
    </section>
  );
}
