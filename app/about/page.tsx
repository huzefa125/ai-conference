import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  MapPinIcon,
} from "@phosphor-icons/react/ssr";
import PageShell from "@/components/layout/page-shell";
import AboutHero from "@/components/sections/about-hero";
import CoreValues from "@/components/sections/core-values";
import TicketCta from "@/components/sections/ticket-cta";
import Team from "@/components/sections/team";
import { ScrollRevealText } from "@/components/sections/scroll-reveal-text";
import { getContent } from "@/lib/content";
import { iconFor } from "@/lib/icons";


export const metadata: Metadata = {
  title: "About | Atlas Global 2026",
  description: "Why we run Atlas Global, what we stand for and how the programme is built.",
};

export default async function AboutPage() {
  const { about: ABOUT, venue: VENUE, tickets: TICKETS } = await getContent();
  const { hero, story, values, team, process, city, passes } = ABOUT;
  const detail = (label: string) => VENUE.details.find((d) => d.label === label)?.value ?? "";
  const prices = TICKETS.map((t) => t.price).filter((p): p is number => typeof p === "number");
  const fromPrice = prices.length ? `$${Math.min(...prices)}` : undefined;
  const rest = story.paragraphs.slice(1);

  return (
    <PageShell>
      {/* Hero: same language as the home hero (uppercase type, blue block, full-height photo) */}
      <AboutHero
        eyebrow={hero.eyebrow}
        lines={hero.lines}
        note={hero.note}
        text={hero.text}
        stats={VENUE.stats}
        image={story.banner}
        caption={hero.caption}
        link={hero.link}
      />

      {/* Story */}
      <section id="story" className="w-full scroll-mt-24 py-14 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Our story</span>
              <h2 className="mt-3 text-3xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {story.title}
              </h2>
              <div className="mt-6 border-l-4 border-primary pl-5">
                <ScrollRevealText
                  segments={story.leadSegments}
                  className="text-xl font-medium leading-[1.6] text-foreground sm:text-2xl sm:leading-[1.6]"
                />
              </div>
              <div className="mt-6 space-y-4">
                {rest.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md pb-12 lg:max-w-none">
              <div className="relative aspect-[4/5] w-[78%] overflow-hidden border border-border bg-muted shadow-[var(--shadow-subtle)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={story.image} alt="Atlas Global audience" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 aspect-square w-[52%] overflow-hidden border-4 border-background bg-muted shadow-[var(--shadow-hover)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={story.image2} alt="Workshop session" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core values: hand-circled title, pen-written aside, numbered grid */}
      <CoreValues
        eyebrow={ABOUT.valuesIntro.eyebrow}
        intro={ABOUT.valuesIntro.text}
        note={ABOUT.valuesIntro.note}
        values={values}
      />

      {/* Team: marquee of framed portraits */}
      <Team members={team} />

      {/* Process: bordered steps, same grid language as the rest of the site */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {process.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
              Every talk on the agenda goes through the same three steps.
            </p>
          </div>

          <ol className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
            {process.steps.map((s, i) => (
              <li key={s.label} className="group relative bg-card p-6 transition-colors hover:bg-secondary/50 sm:p-8">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold tracking-tight text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {i < process.steps.length - 1 && (
                    <ArrowRightIcon
                      aria-hidden
                      weight="bold"
                      size={20}
                      className="hidden text-muted-foreground/50 transition-colors group-hover:text-primary md:block"
                    />
                  )}
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">{s.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-6 flex max-w-6xl flex-col items-start justify-between gap-4 border border-border bg-secondary/60 px-6 py-5 sm:flex-row sm:items-center">
            <p className="text-sm text-foreground sm:text-base">Have something specific to teach? The call for speakers is open.</p>
            <Link
              href="/#cfp"
              className="inline-flex shrink-0 items-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Submit a proposal
              <ArrowRightIcon weight="bold" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Hyderabad: city photo + numbered list of reasons */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* Photo with caption */}
            <figure className="relative min-h-[22rem] overflow-hidden border border-border bg-secondary shadow-[var(--shadow-subtle)] lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={city.image} alt="Charminar, Hyderabad" className="absolute inset-0 h-full w-full object-cover" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/85 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <span className="inline-flex items-center gap-1.5 bg-primary px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest">
                  <MapPinIcon weight="fill" size={12} />
                  Host city · 2026
                </span>
                <p className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">Hyderabad</p>
                <p className="mt-1 text-sm text-white/75">{city.coords}</p>
              </figcaption>
            </figure>

            {/* Title + reasons */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Why <span className="underline decoration-primary decoration-4 underline-offset-[10px]">Hyderabad</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{city.text}</p>

              <ol className="mt-8 border-t border-border">
                {city.facts.map((f, i) => {
                  const Icon = iconFor(f.icon);
                  return (
                    <li key={f.title} className="group flex gap-5 border-b border-border py-5">
                      <span className="w-8 shrink-0 pt-0.5 text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                      </div>
                      <Icon weight="duotone" size={26} className="hidden shrink-0 text-primary/40 transition-colors group-hover:text-primary sm:block" />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA: headline + two ticket-shaped cards */}
      <TicketCta
        {...passes}
        meta={[
          { label: passes.eyebrow, value: detail("Dates") },
          { label: "Where", value: detail("City") },
          { label: "Format", value: detail("Format") },
        ]}
        fromPrice={fromPrice}
      />
    </PageShell>
  );
}
