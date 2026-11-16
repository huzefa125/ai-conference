import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, FileText, Image as ImageIcon, Mail, MonitorPlay, Presentation, Send, Users, Wrench,
} from "lucide-react";
import { conferences } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Call for Abstracts",
  description: "Presentation types, submission guidelines, review process and deadlines for submitting an abstract to our conferences.",
};

const types = [
  { icon: Presentation, title: "Oral presentation", meta: "15 min + 5 min Q&A", text: "Present original research in a themed scientific session chaired by a committee member." },
  { icon: ImageIcon, title: "Poster presentation", meta: "A0 portrait", text: "Display your work in the poster hall and discuss it with delegates during dedicated poster sessions." },
  { icon: MonitorPlay, title: "Virtual presentation", meta: "Pre-recorded or live", text: "Present remotely through the event platform, with live Q&A for hybrid and virtual conferences." },
  { icon: Wrench, title: "Workshop proposal", meta: "60 to 90 min", text: "Propose a hands-on or methods-focused session for a small group of participants." },
];

const guidelines = [
  { title: "Word limit", text: "Maximum 300 words for the abstract body, excluding title, authors and affiliations." },
  { title: "Structure", text: "Background, methods, results and conclusions. Review and case-study abstracts may use a free structure." },
  { title: "Formatting", text: "Upload as .doc, .docx or .pdf. Use a standard 12 pt font, single spacing and no images or tables in the body." },
  { title: "Authors", text: "List all authors and affiliations. Underline the presenting author, who must register for the conference." },
  { title: "Language", text: "All abstracts must be written in English. Spell out abbreviations on first use." },
  { title: "Originality", text: "Work should be original. Previously presented work is accepted only if substantially updated." },
];

const review = [
  { icon: Send, title: "Submit", text: "Send your abstract through the online form before the deadline." },
  { icon: ClipboardCheck, title: "Initial check", text: "The secretariat checks format, scope and completeness." },
  { icon: FileSearch, title: "Peer review", text: "At least two committee members review originality, rigour and relevance." },
  { icon: Mail, title: "Decision", text: "You receive the outcome and assigned presentation type by email." },
  { icon: Users, title: "Register and present", text: "The presenting author registers and is scheduled in the programme." },
];

const sample = [
  { label: "Title", text: "A concise, informative title in sentence case" },
  { label: "Authors", text: "A. Sample¹, B. Sample², C. Sample¹" },
  { label: "Affiliations", text: "¹Northbridge University, Country; ²Sample Research Institute, Country" },
  { label: "Background", text: "One or two sentences on the problem and why it matters." },
  { label: "Methods", text: "The design, data and approach used to address the question." },
  { label: "Results", text: "The main findings, with specific figures where possible." },
  { label: "Conclusions", text: "What the results mean and what should happen next." },
  { label: "Keywords", text: "Three to five keywords, separated by commas." },
];

export default function CallForAbstractsPage() {
  const upcoming = [...conferences].sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Present your research"
        title="Call for Abstracts"
        description="We invite researchers, clinicians, engineers and students to submit abstracts for oral, poster, virtual and workshop presentations at our upcoming conferences."
        crumbs={[{ label: "Call for Abstracts" }]}
        image="/images/lecture.jpg"
      >
        <div className="flex flex-col gap-3 min-[480px]:flex-row">
          <Button href="/call-for-abstracts/submit" variant="accent" size="lg">
            Submit an abstract
            <ArrowRight aria-hidden />
          </Button>
          <Button href="#guidelines" variant="outline-light" size="lg">
            Read the guidelines
          </Button>
        </div>
      </PageHero>

      {/* Intro + types */}
      <section aria-labelledby="types-title" className="bg-background py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">Who should submit</p>
              <h2 id="types-title" className="mt-3 text-balance font-display text-3xl leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
                Share your work with an international audience
              </h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Abstracts are welcome from established researchers and early-career scientists alike, across every
                discipline we cover. Accepted contributions are scheduled into themed sessions and may be considered for the conference
                proceedings.
              </p>
              <p>Students and researchers within five years of their PhD are eligible for the Young Researcher Award.</p>
            </div>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {types.map(({ icon: Icon, title, meta, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.05} className="h-full">
                  <article className="flex h-full flex-col border border-border bg-white p-6">
                    <span className="flex size-12 items-center justify-center border border-navy text-navy">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-navy">{title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue">{meta}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Guidelines + sample template */}
      <section id="guidelines" aria-labelledby="guidelines-title" className="bg-surface py-14 sm:py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">Guidelines</p>
            <h2 id="guidelines-title" className="mt-3 font-display text-3xl leading-[1.15] tracking-tight text-navy sm:text-4xl">
              Submission guidelines
            </h2>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {guidelines.map((g) => (
                <div key={g.title} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="flex items-center gap-2 font-medium text-navy">
                    <CheckCircle2 className="size-4 shrink-0 text-blue" aria-hidden />
                    {g.title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">{g.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="h-fit border border-border bg-white">
            <figcaption className="flex items-center justify-between gap-4 border-b border-border bg-navy px-6 py-4 text-white">
              <span className="flex items-center gap-2 font-display text-lg">
                <FileText className="size-5 text-blue-light" aria-hidden />
                Sample abstract template
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">Max 300 words</span>
            </figcaption>
            <dl className="divide-y divide-dashed divide-border px-6">
              {sample.map((s) => (
                <div key={s.label} className="py-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">{s.label}</dt>
                  <dd className="mt-1 font-display text-[15px] leading-relaxed text-navy/85">{s.text}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </Container>
      </section>

      {/* Review process */}
      <section aria-label="Review process" className="bg-background py-14 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading align="center" title="Review process" description="Every abstract follows the same transparent path from submission to programme." />
          <Reveal>
            <ol className="relative mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
              <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />
              {review.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="relative lg:px-5 lg:first:pl-0 lg:last:pr-0">
                  <span className="relative z-10 flex size-12 items-center justify-center border border-navy bg-white text-navy">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-blue">Step {i + 1}</p>
                  <h3 className="mt-2 text-xl text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Deadlines */}
      <section aria-labelledby="deadlines-title" className="bg-surface py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">Key deadlines</p>
              <h2 id="deadlines-title" className="mt-3 font-display text-3xl leading-[1.15] tracking-tight text-navy sm:text-4xl">
                Upcoming submission deadlines
              </h2>
            </div>
            <Button href="/conferences" variant="outline" className="self-start lg:self-auto">
              All conferences
              <ArrowRight aria-hidden />
            </Button>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {upcoming.map((c) => {
              const pick = c.deadlines.filter((d) => /abstract|notification/i.test(d.label));
              return (
                <li key={c.id} className="flex flex-col border border-border bg-white">
                  <div className="border-b border-border p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                      {c.discipline} · {c.mode}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-snug text-navy">
                      <Link href={`/conferences/${c.id}`} className="hover:text-blue">
                        {c.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.date} · {c.location}
                    </p>
                  </div>
                  <dl className="flex-1 divide-y divide-border px-6 text-sm">
                    {pick.map((d) => (
                      <div key={d.label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
                        <dt className="text-navy/85">{d.label}</dt>
                        <dd className="font-semibold tabular-nums text-navy">{d.date}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="border-t border-border p-4 sm:px-6">
                    <Link
                      href={`/call-for-abstracts/submit?conference=${c.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-blue"
                    >
                      Submit to {c.shortTitle}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">Sample deadlines. Confirm dates on each conference page.</p>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14 text-white sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <SectionHeading
            tone="dark"
            size="sm"
            title="Ready to submit your abstract?"
            description="It takes about ten minutes. Have your abstract text, author list and affiliations ready."
          />
          <Button href="/call-for-abstracts/submit" variant="light" size="lg" className="w-full min-[480px]:w-auto">
            Start your submission
            <ArrowRight aria-hidden />
          </Button>
        </Container>
      </section>
    </>
  );
}
