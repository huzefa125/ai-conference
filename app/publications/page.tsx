import type { Metadata } from "next";
import Link from "next/link";
import { Archive, ArrowRight, ArrowUpRight, BookOpen, FileCheck2, Fingerprint, Globe, ScrollText } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { journals, proceedings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description: "Peer-reviewed journals, conference proceedings and author guidelines for researchers presenting at our events.",
};

const hubLinks = [
  {
    href: "/publications/journals",
    icon: BookOpen,
    title: "Journals",
    text: "Peer-reviewed titles across our core disciplines, most of them fully open access.",
    cta: "Browse journals",
  },
  {
    href: "/publications/proceedings",
    icon: ScrollText,
    title: "Proceedings",
    text: "The permanent, citable record of accepted work presented at each conference.",
    cta: "View the archive",
  },
  {
    href: "/publications/author-guidelines",
    icon: FileCheck2,
    title: "Author Guidelines",
    text: "How to prepare, format and submit your manuscript, and what happens in peer review.",
    cta: "Read the guidelines",
  },
];

const openAccess = [
  { icon: Fingerprint, text: "A persistent identifier for every article" },
  { icon: Globe, text: "Free to read from the day of publication" },
  { icon: Archive, text: "Full text deposited for long-term preservation" },
];

const issnLabel = (issn: string) => (issn === "Pending" ? "ISSN pending" : `ISSN ${issn}`);

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        title="Publications"
        description="Presented work is only the beginning. Our publishing programme gives research a lasting, citable home through journals and conference proceedings."
        crumbs={[{ label: "Publications" }]}
        image="/images/lab-2.jpg"
      />

      <section aria-labelledby="pub-hub" className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <h2 id="pub-hub" className="sr-only">
            Explore publications
          </h2>
          <ul className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {hubLinks.map(({ href, icon: Icon, title, text, cta }, i) => (
              <li key={href}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8"
                  >
                    <span className="flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-navy">{title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue">
                      {cta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Journals"
            title="Featured journals"
            description="A selection of the peer-reviewed titles associated with our conferences."
            align="center"
          />
          <ul className="mt-12 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
            {journals.slice(0, 3).map((j) => (
              <li key={j.slug} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-blue">{j.discipline}</p>
                  <Badge variant={j.access === "Open access" ? "blue" : "outline"} size="sm">
                    {j.access}
                  </Badge>
                </div>
                <h3 className="mt-4 flex-1 font-display text-xl font-bold leading-snug tracking-tight text-navy">{j.title}</h3>
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
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Button href="/publications/journals" variant="outline" size="lg">
              All journals
              <ArrowRight aria-hidden />
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading title="Recent proceedings" size="sm" description="The latest volumes from our conferences." />
            <ul className="mt-10 space-y-3">
              {proceedings.map((p) => (
                <li
                  key={p.title}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card sm:gap-5"
                >
                  <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue sm:flex">
                    <ScrollText className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-navy">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {p.volume} · {p.papers}
                    </p>
                  </div>
                  <Badge variant="soft" size="sm" className="shrink-0">
                    {p.year}
                  </Badge>
                </li>
              ))}
            </ul>
            <Button href="/publications/proceedings" variant="link" className="mt-6">
              Open the proceedings archive
              <ArrowUpRight aria-hidden />
            </Button>
          </div>

          <aside className="self-start rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10 lg:col-span-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
              <Globe className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">Open access by default</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Most of our journals publish under an open-access model, so your work reaches every reader without a paywall.
              Each journal page lists its current indexing coverage.
            </p>
            <ul className="mt-7 space-y-3">
              {openAccess.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[15px] text-navy">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-blue">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="pub-cta" className="bg-background pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
            <div aria-hidden className="absolute -right-24 -top-32 -z-10 size-96 rounded-full bg-blue/30 blur-[120px]" />
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 id="pub-cta" className="font-display text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">
                  Ready to publish your research?
                </h2>
                <p className="mt-4 text-white/70 sm:text-lg">
                  Read the author guidelines, then submit your manuscript to the journal that fits your work.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button href="/publications/author-guidelines" variant="accent" size="lg">
                  Submit a manuscript
                  <ArrowRight aria-hidden />
                </Button>
                <Button href="/publications/journals" variant="outline-light" size="lg">
                  Find a journal
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
