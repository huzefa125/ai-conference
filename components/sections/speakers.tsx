"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { allSpeakers } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SpeakerCutoutCard } from "@/components/conference/speaker-cutout-card";
import { SectionHeading } from "@/components/ui/section-heading";

const groups = [
  { label: "Keynote Speaker", match: (k: string) => k === "Keynote" },
  { label: "Invited Speaker", match: (k: string) => k !== "Keynote" },
];

export function Speakers() {
  const [group, setGroup] = React.useState(0);
  const track = React.useRef<HTMLUListElement>(null);
  const list = allSpeakers.filter((s) => groups[group].match(s.kind));

  function scrollBy(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 260) + 16), behavior: "smooth" });
  }

  return (
    <section id="speakers" className="overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Speaker"
            title="We Invite Amazing Speakers"
            description="Leading researchers and practitioners share the work shaping their fields, with plenty of time for questions and conversation."
          />
          <div role="group" aria-label="Speaker type" className="mt-10 space-y-4">
            {groups.map((g, i) => {
              const active = i === group;
              return (
                <button
                  key={g.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setGroup(i);
                    track.current?.scrollTo({ left: 0 });
                  }}
                  className={cn(
                    "flex items-center gap-3 text-left font-display transition-colors",
                    active ? "text-lg font-bold text-navy" : "text-base font-semibold text-navy/45 hover:text-navy",
                  )}
                >
                  <span aria-hidden className={cn("h-0.5 rounded-full bg-current transition-all", active ? "w-8" : "w-5")} />
                  {g.label}
                </button>
              );
            })}
          </div>
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous speakers"
              className="flex size-11 items-center justify-center rounded-full border border-border text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next speakers"
              className="flex size-11 items-center justify-center rounded-full border border-border text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <Link href="/speakers" className="ml-3 text-sm font-bold text-blue hover:underline">
              All speakers
            </Link>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul
            ref={track}
            aria-live="polite"
            className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto py-6 pr-4 [scrollbar-width:none] sm:-mr-8 sm:pr-8 lg:-mr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] [&::-webkit-scrollbar]:hidden"
          >
            {list.map((s) => (
              <li key={s.slug} className="w-[14rem] shrink-0 snap-start sm:w-[16rem]">
                <SpeakerCutoutCard slug={s.slug} name={s.name} subtitle={s.focus} image={s.image} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
