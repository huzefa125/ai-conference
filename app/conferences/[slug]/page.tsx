import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowRight,
  Baby,
  Brain,
  ArrowUpRight,
  Check,
  Handshake,
  Mic,
  Presentation,
  CircleCheck,
  HeartPulse,
  Ribbon,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import PageShell from "@/components/layout/page-shell";
import Tone from "@/components/layout/tone";
import CtaBanner from "@/components/sections/cta-banner";
import ScrollFaqAccordion from "@/components/ui/scroll-faq-accordion";
import { WordsReveal } from "@/components/ui/words-reveal";
import {
  PUBLISHED_CONFERENCES,
  getPublishedConference,
  groupOf,
  type ConferencePage,
  type GroupIcon,
} from "@/lib/data/conference-pages";
import { ABSTRACTS, FAQS, ORGANIZER, REGISTRATION } from "@/lib/data/conference-common";

/*
 * Conference detail page, in the same design language as the home page (cobalt, cyan, obsidian,
 * bold uppercase headings, mono labels, hairline borders).
 *
 * Two modes, from `status` in lib/data/conference-pages.ts:
 * - "concluded": a past edition. Recap, highlights, programme, who attended, resources on request and a
 *   "next edition" call to action. No registration or abstract submission.
 * - "upcoming" (default): registration, abstract submission and FAQ.
 * Unknown facts (dates, city, fees, speakers) are never invented: they read "to be added/announced".
 */

export function generateStaticParams() {
  return PUBLISHED_CONFERENCES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/conferences/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = getPublishedConference(slug);
  if (!c) return { title: `Conference not found | ${ORGANIZER}` };
  return { title: c.seo.title, description: c.seo.description, keywords: c.seo.keywords };
}

import { DISPLAY_FONT } from "@/components/ui/display-font";
const contactLink = (topic: string) => `/contact?topic=${encodeURIComponent(topic)}`;
const SUBMIT = contactLink("Posters and abstracts");
const REGISTER = contactLink("Tickets");
const NOTIFY = contactLink("Something else");

const ICONS: Record<GroupIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  activity: Activity,
  brain: Brain,
  ribbon: Ribbon,
  baby: Baby,
  "heart-pulse": HeartPulse,
};

export default function ConferencePageRoute(props: PageProps<"/conferences/[slug]">) {
  return (
    <PageShell>
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <ConferenceContent params={props.params} />
      </Suspense>
    </PageShell>
  );
}

async function ConferenceContent({ params }: { params: PageProps<"/conferences/[slug]">["params"] }) {
  const { slug } = await params;
  const c = getPublishedConference(slug);
  if (!c) notFound();
  const group = groupOf(c.slug);
  const concluded = c.status === "concluded";

  return (
    <>
      <Hero c={c} group={group.title} icon={ICONS[group.icon]} concluded={concluded} />
      {concluded ? <ConcludedBody c={c} /> : <UpcomingBody c={c} />}
    </>
  );
}

/* Shared building blocks ---------------------------------------------------------------------------- */

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}

function Button({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "outline" }) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_4px_20px_rgba(0,82,255,0.28)] transition-colors hover:bg-primary/90"
          : "inline-flex items-center justify-center gap-2 border border-foreground px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
      }
    >
      {children}
      {variant === "primary" && <ArrowRight aria-hidden className="h-4 w-4" />}
    </Link>
  );
}

/* Hero ---------------------------------------------------------------------------------------------- */

function Hero({ c, group, icon: Icon, concluded }: { c: ConferencePage; group: string; icon: LucideIcon; concluded: boolean }) {
  const meta = [
    { label: "Status", value: concluded ? "Concluded" : "Abstracts open" },
    { label: concluded ? "Held" : "Dates", value: c.dates || (concluded ? "Dates to be added" : "To be announced") },
    { label: "Venue", value: c.city || (concluded ? "To be added" : "To be announced") },
    { label: "Format", value: "Hybrid" },
    { label: "Sessions", value: `${c.sessions.length} scientific sessions` },
  ];
  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        <nav aria-label="Breadcrumb" className="pt-6 font-mono text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
          <Link href="/conferences" className="hover:text-tertiary-strong">
            Conferences
          </Link>{" "}
          / <span className="text-tertiary-ink">{group}</span>
        </nav>

        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:py-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={
                  concluded
                    ? "inline-flex items-center gap-1.5 bg-[var(--atlas-navy)] px-3 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary"
                    : "inline-flex items-center gap-1.5 bg-primary px-3 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-widest text-primary-foreground"
                }
              >
                {concluded ? <CircleCheck aria-hidden className="h-3.5 w-3.5" /> : <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-tertiary" />}
                {concluded ? "Concluded" : "Upcoming"}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">
                <Icon aria-hidden className="h-4 w-4" />
                {c.field} · Hybrid conference
              </span>
            </div>

            <h1 className="mt-6 font-heading text-[clamp(1.8rem,5.2vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
              {c.name}
            </h1>
            <p className={`${DISPLAY_FONT} mt-5 max-w-xl text-balance text-[1.15rem] font-semibold leading-[1.35] text-tertiary-strong sm:text-[1.35rem]`}>
              {c.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {concluded ? (
                <>
                  <Button href={NOTIFY}>Get notified about the next edition</Button>
                  <Button href="#recap" variant="outline">
                    View the recap
                  </Button>
                </>
              ) : (
                <>
                  <Button href={REGISTER}>Register</Button>
                  <Button href={SUBMIT} variant="outline">
                    Submit abstract
                  </Button>
                </>
              )}
            </div>
          </div>

          <figure className="relative h-[60vw] max-h-[460px] overflow-hidden bg-[var(--atlas-navy)] lg:h-[460px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt="Delegates at an Atlas conference session" className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
            <figcaption className="absolute inset-x-5 bottom-5 flex items-center justify-between font-mono text-[12px] uppercase tracking-widest text-white">
              <span>{concluded ? "Edition recap" : "Abstract submissions open"}</span>
              <span className="text-tertiary">{c.shortName}</span>
            </figcaption>
          </figure>
        </div>

        {/* Metadata strip, as on the home hero */}
        <dl className="grid grid-cols-2 border-y border-border sm:grid-cols-3 lg:grid-cols-5">
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={`py-4 sm:px-5 ${i % 2 === 1 ? "border-l border-border pl-4" : ""} ${i >= 2 ? "border-t border-border" : ""} sm:border-t-0 sm:[&:not(:nth-child(3n+1))]:border-l lg:[&:not(:first-child)]:border-l lg:first:pl-0 ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-tertiary-ink">{m.label}</dt>
              <dd className="mt-1 font-heading text-base font-semibold text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* Concluded edition --------------------------------------------------------------------------------- */

function ConcludedBody({ c }: { c: ConferencePage }) {
  return (
    <>
      {/* Recap: one compact block (no filler stats, stock photos or on-request cards) */}
      <section id="recap" className="w-full scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">Edition recap</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl">
              Thank you for <span className="text-primary">joining us.</span>
            </h2>
            {/* Words rise in once when the section appears (always ends fully sharp) */}
            <span aria-hidden className="mx-auto mt-6 block h-1 w-14 bg-tertiary" />
            <div className="mt-6">
              <WordsReveal
                className="text-balance text-xl font-medium leading-[1.55] text-foreground sm:text-2xl sm:leading-[1.55]"
                text={`The ${c.name} has concluded. Thank you to every speaker, delegate, session chair and partner who took part, in the room and online.`}
                highlight={["Thank you"]}
              />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{c.about}</p>
          </div>
        </div>
      </section>

      <Tone tone="white">
        <Programme c={c} eyebrow="What was covered" title="The programme" />
      </Tone>

      <TakePart />
      <Tone tone="white">
        <RelatedConferences current={c.slug} />
      </Tone>

      <CtaBanner
        id="next-edition"
        eyebrow={`${c.field} · Next edition`}
        title="The next edition is being planned."
        text="Leave your details and we will tell you as soon as dates, venue and the call for abstracts are announced."
        primary={{ label: "Get notified", href: NOTIFY }}
        secondary={{ label: "Contact the team", href: "/contact" }}
      />
    </>
  );
}

/* Upcoming edition ---------------------------------------------------------------------------------- */

function UpcomingBody({ c }: { c: ConferencePage }) {
  return (
    <>
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHead eyebrow="About the conference" title={<>Why it <span className="text-primary">matters.</span></>} />
            <div>
              <p className="text-lg leading-relaxed text-foreground">{c.about}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {c.whyAttend.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-base leading-relaxed text-foreground">
                    <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-tertiary-strong" strokeWidth={2.5} />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Programme c={c} eyebrow="Scientific programme" title="Scientific sessions" />

      <Tone tone="white">
        <section className="w-full py-16 md:py-20">
          <div className="container mx-auto px-4">
            <SectionHead eyebrow="Who should attend" title="Built for your role" />
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {c.whoShouldAttend.map((r) => (
                <li key={r} className="border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground rounded-2xl">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Tone>

      {/* Abstracts + registration */}
      <section id="abstracts" className="w-full scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Call for abstracts" title="Submit your abstract" text={ABSTRACTS.why} />
          <ul className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden">
            {ABSTRACTS.categories.map((r) => (
              <li key={r.category} className="bg-card p-6">
                <p className="font-heading text-lg font-bold text-foreground">{r.category}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.format}</p>
                <p className="mt-3 font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">{r.duration}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={SUBMIT}>Submit abstract</Button>
          </div>
        </div>
      </section>

      <Tone tone="white">
        <section id="registration" className="w-full scroll-mt-24 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <SectionHead eyebrow="Registration" title="Registration" text="Fees and deadlines are announced with the programme." />
            <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2 rounded-2xl overflow-hidden">
              {[
                { title: "In person", items: REGISTRATION.inPerson },
                { title: "Virtual", items: REGISTRATION.virtual },
              ].map((b) => (
                <div key={b.title} className="bg-card p-7">
                  <h3 className="font-heading text-xl font-bold text-foreground">{b.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {b.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-base text-foreground">
                        <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-tertiary-strong" strokeWidth={2.5} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button href={REGISTER}>Register</Button>
            </div>
          </div>
        </section>
      </Tone>

      <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Questions" title="FAQ" />
          <ScrollFaqAccordion items={FAQS} className="mt-10 max-w-3xl" />
        </div>
      </section>

      <Tone tone="white">
        <RelatedConferences current={c.slug} />
      </Tone>

      <CtaBanner
        id="register"
        eyebrow={`${c.field} · ${c.dates || "Dates to be announced"}`}
        title={`Present your work at the ${c.name}.`}
        text="Submit an abstract or register your place, in person or online."
        primary={{ label: "Register", href: REGISTER }}
        secondary={{ label: "Submit abstract", href: SUBMIT }}
      />
    </>
  );
}

/* Be part of the next edition (concluded) ---------------------------------------------------------- */

function TakePart() {
  const ways = [
    { icon: Mic, title: "Speak", text: "Propose a talk, workshop or symposium for the next edition's programme.", cta: "Propose a talk", href: contactLink("Speaking") },
    { icon: Presentation, title: "Present a poster", text: "Share your research as an oral or poster presentation once the call for abstracts opens.", cta: "Register interest", href: SUBMIT },
    { icon: Handshake, title: "Sponsor or exhibit", text: "Put your organisation in front of the clinicians, researchers and educators who attend.", cta: "Ask about sponsorship", href: contactLink("Sponsorship") },
  ];
  return (
    <section className="w-full py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">Next edition</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Be part of the <span className="text-primary">next one.</span>
          </h2>
          <span aria-hidden className="mx-auto mt-6 block h-1 w-14 bg-tertiary" />
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3 rounded-2xl overflow-hidden">
          {ways.map(({ icon: WIcon, title, text, cta, href }) => (
            <li key={title} className="group relative flex flex-col bg-card p-7 text-center sm:p-9">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-tertiary transition-transform duration-300 group-hover:scale-x-100" />
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-tertiary/10 text-tertiary-strong transition-colors group-hover:bg-tertiary-strong group-hover:text-white">
                <WIcon aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">{text}</p>
              <Link href={href} className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:text-tertiary-strong">
                {cta}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Interlinking: other conferences (both modes) ------------------------------------------------------ */

function RelatedConferences({ current }: { current: string }) {
  const others = PUBLISHED_CONFERENCES.filter((x) => x.slug !== current);
  if (!others.length) return null;
  return (
    <section aria-labelledby="related-heading" className="w-full py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">Explore more</p>
            <h2 id="related-heading" className="mt-3 font-heading text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl">
              Other conferences
            </h2>
          </div>
          <Link href="/conferences" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-tertiary-strong">
            All conferences
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {others.map((o) => {
            const OIcon = ICONS[groupOf(o.slug).icon];
            const concluded = o.status === "concluded";
            return (
              <li key={o.slug}>
                <Link
                  href={`/conferences/${o.slug}`}
                  className="group flex h-full flex-col border border-border bg-card p-6 transition-[border-color,translate,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-hover)] sm:p-8 rounded-2xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">
                      <OIcon aria-hidden className="h-4 w-4" />
                      {o.field}
                    </span>
                    <span
                      className={
                        concluded
                          ? "font-mono text-[12px] font-semibold uppercase tracking-widest text-muted-foreground"
                          : "bg-primary px-2 py-0.5 font-mono text-[12px] font-semibold uppercase tracking-widest text-primary-foreground"
                      }
                    >
                      {concluded ? "Concluded" : "Upcoming"}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">{o.name}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">{o.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    View conference
                    <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* Programme (both modes) ---------------------------------------------------------------------------- */

function Programme({ c, eyebrow, title }: { c: ConferencePage; eyebrow: string; title: string }) {
  return (
    <section id="programme" className="w-full scroll-mt-24 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHead eyebrow={eyebrow} title={title} />
        <ol className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden">
          {c.sessions.map((s, i) => (
            <li key={s.title} className="group relative flex gap-4 bg-card p-6">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-tertiary transition-transform duration-300 group-hover:scale-x-100" />
              <span className="font-mono text-sm font-semibold text-tertiary-ink">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className="font-heading text-lg font-bold leading-snug text-foreground">{s.title}</p>
                {s.text && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>}
              </div>
            </li>
          ))}
          {/* Fill the last row so the grid has no grey hole */}
          {c.sessions.length % 3 !== 0 && (
            <li aria-hidden className="hidden bg-card lg:block" style={{ gridColumn: `span ${3 - (c.sessions.length % 3)}` }} />
          )}
        </ol>
      </div>
    </section>
  );
}
