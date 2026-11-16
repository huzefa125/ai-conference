"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { disciplines } from "@/lib/data";

/**
 * Split section: photo + stat card on the left, a dark panel on the right that scrolls
 * vertically through the disciplines with a "1 of 6" progress rail.
 */
export function ResearchAreas() {
  const scroller = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const total = disciplines.length;

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollTop / el.clientHeight);
    setIndex(Math.min(total - 1, Math.max(0, i)));
  }

  return (
    <section id="disciplines" aria-labelledby="disciplines-heading" className="grid bg-navy-deep lg:grid-cols-2">
      {/* Left: photo + stat card */}
      <div className="relative min-h-[22rem] lg:min-h-[36rem]">
        <Image src="/images/lecture.jpg" alt="Researcher presenting equations on a whiteboard" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-navy-deep/25" />
        <div className="absolute bottom-0 left-0 flex w-64 bg-white sm:w-72">
          <div className="flex-1 p-6">
            <p className="font-display text-4xl font-bold tracking-tight text-navy">{total}</p>
            <p className="mt-1 text-sm text-muted-foreground">Disciplines and topics</p>
            <div className="my-4 h-px bg-border" />
            <p id="disciplines-heading" className="font-display text-base font-bold leading-snug text-navy">
              One conference series for the whole of science
            </p>
          </div>
          <Link href="/conferences" aria-label="Browse all conferences" className="flex size-14 shrink-0 items-center justify-center bg-blue text-white transition-colors hover:bg-navy">
            <ArrowUpRight className="size-5" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Right: vertical slider */}
      <div className="relative isolate text-white">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
        <div
          ref={scroller}
          onScroll={onScroll}
          tabIndex={0}
          role="region"
          aria-label="Disciplines, scroll for more"
          className="h-[30rem] snap-y snap-mandatory overflow-y-auto [scrollbar-width:none] focus-visible:outline-offset-[-4px] lg:h-[36rem] [&::-webkit-scrollbar]:hidden"
        >
          {disciplines.map(({ slug, name, description, icon: Icon }) => (
            <article key={slug} className="flex h-full snap-start flex-col justify-center px-6 py-10 pr-20 sm:px-12 sm:pr-28 lg:px-16">
              <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{name}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-white/70">{description}</p>
              <Link
                href={`/conferences/category/${slug}`}
                className="group mt-7 inline-flex items-center gap-1.5 self-start text-sm font-bold text-white hover:text-blue-light"
              >
                Learn more
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                <span className="sr-only"> about {name}</span>
              </Link>
            </article>
          ))}
        </div>

        {/* Progress rail */}
        <div aria-hidden className="pointer-events-none absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-3 sm:right-10">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tabular-nums text-white/85">
            {index + 1} of {total}
          </span>
          <span className="relative h-40 w-0.5 rounded-full bg-white/15">
            <span
              className="absolute inset-x-0 top-0 rounded-full bg-white transition-all duration-300"
              style={{ height: `${100 / total}%`, transform: `translateY(${index * 100}%)` }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
