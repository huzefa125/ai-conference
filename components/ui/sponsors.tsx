"use client";

import * as React from "react";
import { clsx } from "clsx";
import {
  ArrowRightIcon, CloudIcon, AtomIcon, DnaIcon, SunHorizonIcon, PlanetIcon, FlaskIcon,
  BirdIcon, GlobeHemisphereWestIcon, MountainsIcon, type IconProps,
} from "@phosphor-icons/react";
import { SPONSORS } from "@/lib/site-data";

const ICONS: Record<string, React.ComponentType<IconProps>> = {
  Cloud: CloudIcon, Atom: AtomIcon, Dna: DnaIcon, SunHorizon: SunHorizonIcon, Planet: PlanetIcon,
  Flask: FlaskIcon, Bird: BirdIcon, GlobeHemisphereWest: GlobeHemisphereWestIcon, Mountains: MountainsIcon,
};

export default function Sponsors({ id = "sponsors", className = "" }: { id?: string; className?: string }) {
  return (
    <section id={id} className={clsx("w-full py-16 md:py-20", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            SPONSORS
          </h2>
          <p className="mt-4 font-mono text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            The companies backing Atlas Global 2026.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl space-y-10">
          {SPONSORS.map((group, gi) => (
            <div key={group.tier}>
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
                {group.tier}
              </p>
              <div
                className={clsx(
                  "grid gap-4",
                  gi === 0 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                )}
              >
                {group.slots.map((s, i) => {
                  const Icon = s.icon ? ICONS[s.icon] : undefined;
                  return (
                    <div
                      key={`${group.tier}-${i}`}
                      className={clsx(
                        "group flex items-center justify-center gap-2.5 border border-border bg-card px-4 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground hover:shadow-[var(--shadow-hover)]",
                        gi === 0 ? "h-28" : "h-20"
                      )}
                    >
                      {s.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.logo} alt={s.name} className="max-h-10 w-auto object-contain grayscale transition group-hover:grayscale-0" />
                      ) : (
                        <>
                          {Icon && (
                            <Icon
                              weight="duotone"
                              size={gi === 0 ? 32 : 24}
                              className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                            />
                          )}
                          <span
                            className={clsx(
                              "font-mono font-bold tracking-tight",
                              gi === 0 ? "text-lg" : "text-sm"
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
            className="inline-flex items-center gap-2 border-2 border-border bg-card px-6 py-3.5 font-mono text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-secondary"
          >
            Become a sponsor
            <ArrowRightIcon weight="bold" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
