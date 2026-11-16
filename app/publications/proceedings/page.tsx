import type { Metadata } from "next";
import { ArrowRight, ScrollText } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { proceedings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proceedings",
  description: "The archive of published conference proceedings, and how accepted presentations become part of the permanent record.",
};

const steps = [
  { title: "Present at the conference", text: "Deliver your accepted oral or poster presentation at the event." },
  { title: "Submit the full paper", text: "Send the complete manuscript, prepared to the author guidelines, after the event." },
  { title: "Peer review", text: "Independent reviewers assess the paper and may request revisions." },
  { title: "Revise and accept", text: "Address reviewer comments. The editors confirm final acceptance." },
  { title: "Publish in proceedings", text: "The paper appears in the volume with a persistent identifier." },
];

export default function ProceedingsPage() {
  const years = Array.from(new Set(proceedings.map((p) => p.year))).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <PageHero
        title="Conference Proceedings"
        description="The permanent, citable record of accepted work presented at our conferences, organised by year."
        crumbs={[{ label: "Publications", href: "/publications" }, { label: "Proceedings" }]}
        image="/images/lecture.jpg"
      />

      <section aria-labelledby="archive-heading" className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="archive-heading" className="font-display text-3xl font-bold tracking-[-0.03em] text-navy sm:text-4xl">
              Proceedings archive
            </h2>
            <nav aria-label="Jump to year" className="flex flex-wrap gap-2">
              {years.map((y) => (
                <a
                  key={y}
                  href={`#year-${y}`}
                  className="inline-flex h-10 items-center rounded-full border border-border bg-white px-5 text-sm font-medium text-navy transition-colors hover:border-navy/40 hover:bg-accent"
                >
                  {y}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 space-y-12 sm:mt-14">
            {years.map((y) => {
              const items = proceedings.filter((p) => p.year === y);
              return (
                <section key={y} id={`year-${y}`} aria-labelledby={`year-${y}-heading`} className="scroll-mt-28">
                  <div className="flex items-baseline gap-3">
                    <h3 id={`year-${y}-heading`} className="font-display text-2xl font-bold tracking-tight text-navy">
                      {y}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {items.length} {items.length === 1 ? "volume" : "volumes"}
                    </span>
                  </div>
                  <ul className="mt-5 grid gap-4 sm:gap-5 lg:grid-cols-2">
                    {items.map((p) => (
                      <li
                        key={p.title}
                        className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:gap-5"
                      >
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                          <ScrollText className="size-6" strokeWidth={1.75} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium leading-snug text-navy">{p.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {p.volume} · {p.papers}
                          </p>
                        </div>
                        <Button href="#" variant="outline" size="sm" className="self-start sm:self-auto">
                          View volume
                          <span className="sr-only">: {p.title}</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="From presentation to proceedings"
            description="How an accepted conference contribution becomes a published, citable paper."
            align="center"
          />
          <ol className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-card">
                    <span
                      className="flex size-10 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-5 font-display text-base font-bold text-navy">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex justify-center">
            <Button href="/publications/author-guidelines" size="lg">
              Read the author guidelines
              <ArrowRight aria-hidden />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
