"use client";

import * as React from "react";
import { clsx } from "clsx";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { iconFor } from "@/lib/icons";
import { useContent } from "@/components/providers/content-provider";

export default function Sponsors({ id = "sponsors", className = "" }: { id?: string; className?: string }) {
  const { sponsors: SPONSORS } = useContent();
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            SPONSORS
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            The companies backing Atlas Global 2026.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl space-y-10">
          {SPONSORS.map((group, gi) => (
            <div key={group.tier}>
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-tertiary-ink">
                {group.tier}
              </p>
              <div
                className={clsx(
                  "grid gap-4",
                  gi === 0 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                )}
              >
                {group.slots.map((s, i) => {
                  const Icon = s.icon ? iconFor(s.icon) : undefined;
                  return (
                    <div
                      key={`${group.tier}-${i}`}
                      className={clsx(
                        "group flex items-center justify-center gap-3 border border-border bg-card px-4 text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:text-foreground hover:shadow-[var(--shadow-hover)]",
                        gi === 0 ? "h-36 sm:h-40" : "h-24 sm:h-28"
                      )}
                    >
                      {s.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.logo} alt={s.name} className="max-h-14 w-auto object-contain grayscale transition group-hover:grayscale-0" />
                      ) : (
                        <>
                          {Icon && (
                            <Icon
                              weight="duotone"
                              size={gi === 0 ? 44 : 30}
                              className="shrink-0 text-tertiary-strong/70 transition-colors group-hover:text-tertiary-strong"
                            />
                          )}
                          <span
                            className={clsx(
                              "font-bold tracking-tight",
                              gi === 0 ? "text-2xl" : "text-base"
                            )}
                          >
                            {s.name}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-secondary rounded-full"
          >
            Become a sponsor
            <ArrowRightIcon weight="bold" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
