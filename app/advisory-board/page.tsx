import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, Compass, Globe2, MapPin, Scale, Sparkles, UsersRound } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Monogram } from "@/components/conference/speaker-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { advisoryBoard } from "@/lib/content";

export const metadata: Metadata = {
  title: "Advisory Board",
  description: "Meet the international advisory board and scientific committee that guide our conference programmes.",
};

const responsibilities = [
  { icon: Compass, title: "Set scientific direction", text: "Advise on themes, tracks and emerging topics for each year’s programme." },
  { icon: ClipboardCheck, title: "Uphold review standards", text: "Define abstract and paper review criteria and oversee the peer-review process." },
  { icon: UsersRound, title: "Recommend speakers", text: "Nominate keynote and invited speakers who represent the best of each field." },
  { icon: Scale, title: "Safeguard integrity", text: "Guide policy on ethics, conflicts of interest and publication standards." },
  { icon: Globe2, title: "Widen participation", text: "Open doors to institutions and researchers in under-represented regions." },
  { icon: Sparkles, title: "Judge awards", text: "Serve on panels for best paper, best poster and young researcher awards." },
];

export default function AdvisoryBoardPage() {
  const countries = new Set(advisoryBoard.map((m) => m.country)).size;
  const figures = [
    { value: String(advisoryBoard.length), label: "Board members" },
    { value: String(countries), label: "Countries" },
    { value: "6", label: "Disciplines" },
    { value: "3 yrs", label: "Term of service" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Advisory Board"
        description="Senior scientists from around the world who shape our programmes, review standards and long-term direction."
        crumbs={[{ label: "About Us", href: "/about" }, { label: "Advisory Board" }]}
        image="/images/panel.jpg"
      />

      {/* Intro */}
      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              eyebrow="How we are governed"
              title="Independent scientific oversight"
              description="Our advisory board brings together researchers with deep expertise across every discipline we cover. Members serve three-year terms on a voluntary basis, and work alongside each conference’s scientific committee to keep standards high and programmes relevant."
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <dl className="grid grid-cols-2 gap-3 sm:gap-4">
              {figures.map((s) => (
                <div key={s.label} className="flex flex-col-reverse rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
                  <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
                  <dd className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Board grid */}
      <section aria-labelledby="board-heading" className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="board-heading" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-4xl lg:text-5xl">
              Meet the <span className="text-gradient">board</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {advisoryBoard.length} members from {countries} countries, covering every discipline in our programme.
            </p>
          </div>
          <Reveal>
            <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {advisoryBoard.map((m) => (
                <li key={m.name}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div className="flex items-start justify-between gap-3">
                      <Monogram name={m.name} className="size-16 shrink-0 rounded-2xl [&_span]:text-xl" />
                      <span className="rounded-full bg-blue/10 px-2.5 py-1 text-xs font-semibold text-blue">{m.role}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold leading-snug text-navy">{m.name}</h3>
                    <p className="mt-1 text-sm text-navy/80">{m.org}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" aria-hidden />
                      {m.country}
                    </p>
                    <p className="mt-auto pt-5">
                      <span className="sr-only">Expertise: </span>
                      <span className="inline-flex rounded-full bg-surface px-3 py-1 text-xs font-medium text-navy ring-1 ring-inset ring-border">
                        {m.expertise}
                      </span>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Role of the board */}
      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Responsibilities"
                title="Role of the board"
                description="The board meets quarterly and advises the organising team on the questions that matter most to the quality of our events."
              />
            </div>
          </div>
          <Reveal className="lg:col-span-8">
            <ol className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {responsibilities.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span aria-hidden className="font-display text-sm font-bold text-navy/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Join CTA */}
      <section aria-labelledby="join-heading" className="bg-background pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep px-6 py-12 text-white sm:px-12 sm:py-16">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
            <div aria-hidden className="absolute -right-24 -top-32 -z-10 size-96 rounded-full bg-blue/30 blur-[120px]" />
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold text-blue-light">Get involved</p>
                <h2 id="join-heading" className="mt-3 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Join the scientific committee
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                  We welcome experienced researchers who would like to review abstracts, chair sessions or help shape a
                  conference programme in their field.
                </p>
              </div>
              <Button href="/contact" variant="light" size="lg">
                Express your interest
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
