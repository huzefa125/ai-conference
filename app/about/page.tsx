import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Compass,
  Eye,
  Globe2,
  Handshake,
  Lightbulb,
  Presentation,
  Scale,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Stats } from "@/components/sections/stats";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Monogram } from "@/components/conference/speaker-card";
import { cn } from "@/lib/utils";
import { advisoryBoard } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Who we are, what we stand for and how ${site.name} brings the international research community together.`,
};

const values = [
  { icon: ShieldCheck, title: "Scientific integrity", text: "Transparent peer review, clear standards and honest reporting at every event." },
  { icon: Globe2, title: "Global inclusion", text: "Programmes that welcome researchers from every region, career stage and institution." },
  { icon: Handshake, title: "Collaboration", text: "Formats designed for conversation, so meetings turn into lasting partnerships." },
  { icon: Lightbulb, title: "Curiosity", text: "Room for emerging ideas and interdisciplinary work alongside established fields." },
  { icon: Scale, title: "Accessibility", text: "Hybrid participation, fair fees and student concessions wherever possible." },
  { icon: Sprout, title: "Early-career support", text: "Mentoring, awards and dedicated forums for the next generation of scientists." },
];

const timeline = [
  { year: "2016", title: "A London symposium", text: "Forty researchers meet for a one-day symposium on applied materials. It sells out in three weeks." },
  { year: "2018", title: "First international congress", text: "Delegates from 34 countries attend our first three-day congress in Vienna." },
  { year: "2020", title: "Programmes go online", text: "Every conference moves online, and attendance from Africa and South Asia triples." },
  { year: "2022", title: "Hybrid by default", text: "In-person events return with live streaming, remote Q&A and virtual poster halls." },
  { year: "2024", title: "Journals and proceedings", text: "Six partner journals and indexed proceedings give presented work a citable home." },
  { year: "2026", title: "Six disciplines, one community", text: "More than 20 conferences a year across six disciplines and four continents." },
];

const services = [
  {
    icon: Presentation,
    title: "Conferences",
    text: "International meetings across six disciplines, in person, online and hybrid. Each one is shaped by its own scientific committee.",
    href: "/conferences",
  },
  { icon: BookOpen, title: "Publications", text: "Proceedings and partner journals that give presented work a lasting, citable record.", href: "/publications" },
  { icon: Handshake, title: "Partnerships", text: "Universities, societies and industry partners that strengthen every programme.", href: "/partners" },
  { icon: Award, title: "Awards", text: "Recognition for outstanding papers, posters and early-career researchers.", href: "/#awards" },
];

export default function AboutPage() {
  const boardPreview = advisoryBoard.slice(0, 4);
  const boardCountries = new Set(advisoryBoard.map((m) => m.country)).size;

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A meeting place for the global research community"
        description="We organise international scientific conferences that connect researchers, academicians and industry professionals across disciplines."
        crumbs={[{ label: "About Us" }]}
        image="/images/about.jpg"
      />

      {/* Who we are */}
      <section aria-labelledby="who-heading" className="bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue/8 px-3 py-1 text-xs font-semibold text-blue ring-1 ring-inset ring-blue/15">
              <span aria-hidden className="size-1.5 rounded-full bg-current" />
              Our story
            </p>
            <h2 id="who-heading" className="mt-5 text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-4xl lg:text-5xl">
              Ten years of bringing research into the room
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              <p>
                {site.name} began in 2016 as a one-day symposium in London, organised by a small group of materials
                scientists who wanted a friendlier, more rigorous place to share early results. The first meeting sold
                out in three weeks, and the next year we were asked to run two more.
              </p>
              <p>
                Today we run more than 20 conferences a year across artificial intelligence, life sciences,
                engineering, chemistry, environmental science and pharmaceutical research. Every event is shaped by an
                independent scientific committee and supported by partner institutions in over 90 countries.
              </p>
              <p>
                We are still a small team. Our editors, programme managers and event staff work from London and
                Singapore, and most of us came to events work from research.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="relative pb-10 sm:pb-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
                <Image
                  src="/images/about-2.jpg"
                  alt="Delegates listening to a presentation at an international conference"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-4 max-w-[15rem] rounded-2xl border border-border bg-card p-5 shadow-lift sm:-bottom-8 sm:-left-8">
                <p className="font-display text-4xl font-extrabold tracking-tight text-navy">2016</p>
                <p className="mt-1 text-sm text-muted-foreground">Founded in London. A decade of international meetings.</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section id="mission" aria-labelledby="mission-heading" className="scroll-mt-28 bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <h2 id="mission-heading" className="sr-only">
            Mission and vision
          </h2>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card sm:p-10">
                <span className="flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Compass className="size-5" aria-hidden />
                </span>
                <p className="mt-6 text-xs font-semibold text-blue">Our mission</p>
                <h3 className="mt-2 text-balance font-display text-2xl font-bold leading-snug tracking-tight text-navy sm:text-3xl">
                  Trusted platforms where scientific ideas are shared openly, tested rigorously and put to work.
                </h3>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
                  We design every programme so that researchers can present, question and collaborate, and so that good
                  work reaches the people who can build on it.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2">
              <article className="relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-navy-deep p-7 text-white sm:p-10">
                <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
                <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-blue/30 blur-[120px]" />
                <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-blue-light">
                  <Eye className="size-5" aria-hidden />
                </span>
                <p className="mt-6 text-xs font-semibold text-blue-light">Our vision</p>
                <h3 className="mt-2 text-balance font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                  A connected research community where every discovery finds its audience.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Any researcher, wherever they work, should have a fair route to an international audience,
                  collaborators and publication.
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section aria-labelledby="values-heading" className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            title="What we stand for"
            description="The principles that guide how we select programmes, work with partners and welcome delegates."
          />
          <Reveal>
            <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {values.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="2016 to today"
            title="Our journey"
            description="From a single London symposium to an annual programme on four continents."
          />
          <Reveal>
            <ol className="relative mt-12 space-y-10 pl-8 sm:mt-16 lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 lg:pl-0 lg:pt-12">
              <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-0.5 rounded-full bg-gradient-to-b from-blue via-violet to-cyan lg:inset-x-0 lg:bottom-auto lg:top-[7px] lg:h-0.5 lg:w-auto lg:bg-gradient-to-r" />
              {timeline.map((t, i) => (
                <li key={t.year} className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-8 top-1.5 size-4 rounded-full border-[3px] border-surface bg-blue ring-1 ring-blue/30 lg:-top-12 lg:left-0",
                      i === timeline.length - 1 && "bg-violet ring-violet/30",
                    )}
                  />
                  <p className="font-display text-3xl font-extrabold tracking-tight text-navy">{t.year}</p>
                  <h3 className="mt-2 text-base font-semibold text-navy">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <Stats />

      {/* What we do: bento */}
      <section className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <SectionHeading title="What we do" />
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:justify-self-end">
              Four ways we support researchers before, during and after each conference.
            </p>
          </div>
          <Reveal>
            <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:grid-rows-2">
              {services.map(({ icon: Icon, title, text, href }, i) => {
                const big = i === 0;
                return (
                  <li key={title} className={cn(big && "sm:col-span-2 lg:row-span-2")}>
                    <article
                      className={cn(
                        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7",
                        big && "min-h-[18rem] sm:p-9",
                      )}
                    >
                      {big && (
                        <>
                          <Image
                            src="/images/hall.jpg"
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="-z-10 object-cover opacity-15 transition duration-700 group-hover:scale-105"
                          />
                          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-card via-card/85 to-card/30" />
                        </>
                      )}
                      <span className="relative flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className={cn("relative mt-6 font-display font-bold text-navy", big ? "mt-auto pt-16 text-3xl tracking-tight" : "text-xl")}>
                        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                          {title}
                        </Link>
                      </h3>
                      <p className={cn("relative mt-2 flex-1 leading-relaxed text-muted-foreground", big ? "max-w-md flex-none text-base" : "text-sm")}>
                        {text}
                      </p>
                      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-blue">
                        Explore {title.toLowerCase()}
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </article>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Leadership teaser */}
      <section aria-labelledby="leadership-heading" className="bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue/8 px-3 py-1 text-xs font-semibold text-blue ring-1 ring-inset ring-blue/15">
              <span aria-hidden className="size-1.5 rounded-full bg-current" />
              Leadership
            </p>
            <h2 id="leadership-heading" className="mt-5 text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-4xl">
              Guided by an international <span className="text-gradient">advisory board</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Senior scientists from {boardCountries} countries shape our scientific programmes, review standards and
              long-term direction.
            </p>
            <Button href="/advisory-board" className="mt-8">
              Meet the advisory board
              <ArrowRight aria-hidden />
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ul className="grid gap-4 min-[480px]:grid-cols-2 sm:gap-6">
              {boardPreview.map((m) => (
                <li key={m.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5">
                  <Monogram name={m.name} className="size-16 shrink-0 rounded-2xl [&_span]:text-xl" />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold leading-snug text-navy">{m.name}</p>
                    <p className="text-sm font-medium text-blue">{m.role}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {m.org}, {m.country}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
