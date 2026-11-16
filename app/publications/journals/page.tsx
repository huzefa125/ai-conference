import type { Metadata } from "next";
import { ArrowRight, BookOpen, Clock, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { journals } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journals",
  description: "Peer-reviewed journals across artificial intelligence, life sciences, engineering, materials, environmental and pharmaceutical research.",
};

const promises = [
  { icon: Users, title: "Two independent reviewers", text: "Every manuscript that passes the editorial check is reviewed single-blind by at least two experts." },
  { icon: Clock, title: "First decision in 6 to 8 weeks", text: "Editors track each submission so you are never left waiting without an update." },
  { icon: ShieldCheck, title: "Authors keep copyright", text: "Open-access articles are published under a Creative Commons licence that permits reuse with credit." },
];

const issnLabel = (issn: string) => (issn === "Pending" ? "ISSN pending" : `ISSN ${issn}`);

export default function JournalsPage() {
  return (
    <>
      <PageHero
        title="Journals"
        description="Peer-reviewed titles across our core disciplines, open to original research, reviews and extended conference papers."
        crumbs={[{ label: "Publications", href: "/publications" }, { label: "Journals" }]}
        image="/images/lab.jpg"
      />

      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={`${journals.length} titles`}
              title="Find the right journal"
              description="Each journal welcomes original research, reviews and extended versions of conference papers. Read the author guidelines before you submit."
            />
            <Button href="/publications/author-guidelines" variant="outline" size="lg" className="self-start lg:self-auto">
              Author guidelines
              <ArrowRight aria-hidden />
            </Button>
          </div>

          <ul className="mt-12 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {journals.map((j, i) => (
              <li key={j.slug}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                        <BookOpen className="size-6" strokeWidth={1.75} aria-hidden />
                      </span>
                      <Badge variant={j.access === "Open access" ? "blue" : "outline"} size="sm">
                        {j.access}
                      </Badge>
                    </div>
                    <p className="mt-6 text-xs font-semibold text-blue">{j.discipline}</p>
                    <h2 className="mt-2 flex-1 font-display text-xl font-bold leading-snug tracking-tight text-navy sm:text-[1.35rem]">
                      {j.title}
                    </h2>
                    <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-surface px-4 py-3">
                        <dt className="text-xs text-muted-foreground">Identifier</dt>
                        <dd className="mt-0.5 font-medium text-navy">{issnLabel(j.issn)}</dd>
                      </div>
                      <div className="rounded-xl bg-surface px-4 py-3">
                        <dt className="text-xs text-muted-foreground">Frequency</dt>
                        <dd className="mt-0.5 font-medium text-navy">{j.frequency}</dd>
                      </div>
                    </dl>
                    <Button href="/publications/author-guidelines" variant="outline" className="mt-7 w-full sm:w-auto sm:self-start">
                      Submit manuscript
                      <ArrowRight aria-hidden />
                      <span className="sr-only">to {j.title}</span>
                    </Button>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="journal-promises" className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <h2 id="journal-promises" className="mx-auto max-w-2xl text-center font-display text-3xl font-bold tracking-[-0.03em] text-navy sm:text-4xl">
            What every author can expect
          </h2>
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
            {promises.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl bg-white p-7 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
