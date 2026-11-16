import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, Building2, CalendarDays, CheckCircle2, Clock, FileText, Globe2, Laptop, MapPin, MonitorPlay, Tag, Ticket, Users,
} from "lucide-react";
import { conferences, getConference, getDiscipline } from "@/lib/data";
import { getSpeaker, type Speaker } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/layout/page-hero";
import { ConferenceCard } from "@/components/conference/conference-card";
import { SpeakerCard } from "@/components/conference/speaker-card";
import { ProgrammeTabs } from "@/components/conference/programme-tabs";
import { SectionNav } from "@/components/conference/section-nav";

export function generateStaticParams() {
  return conferences.map((c) => ({ slug: c.id }));
}

export async function generateMetadata(props: PageProps<"/conferences/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const conference = getConference(slug);
  if (!conference) return { title: "Conference not found" };
  return {
    title: conference.shortTitle,
    description: `${conference.title}. ${conference.date}, ${conference.location}. ${conference.description}`,
    openGraph: { title: conference.title, description: conference.description, images: [conference.image] },
  };
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "topics", label: "Topics" },
  { id: "dates", label: "Dates" },
  { id: "programme", label: "Programme" },
  { id: "speakers", label: "Speakers" },
  { id: "venue", label: "Venue" },
  { id: "fees", label: "Fees" },
];

/* scroll-mt clears the sticky site header (72px) plus the section nav */
const sectionPad = "scroll-mt-32 py-16 sm:py-20 lg:py-28";

export default async function ConferencePage(props: PageProps<"/conferences/[slug]">) {
  const { slug } = await props.params;
  const conference = getConference(slug);
  if (!conference) notFound();

  const discipline = getDiscipline(conference.disciplineSlug);
  const speakers = conference.speakerSlugs.map(getSpeaker).filter((s): s is Speaker => Boolean(s));
  const related = [
    ...conferences.filter((c) => c.id !== conference.id && c.disciplineSlug === conference.disciplineSlug),
    ...conferences.filter((c) => c.id !== conference.id && c.disciplineSlug !== conference.disciplineSlug),
  ].slice(0, 3);
  const isVirtual = conference.mode === "Virtual" || !conference.venue.mapQuery;
  const registerHref = `/registration?conference=${conference.id}`;
  const submitHref = `/call-for-abstracts/submit?conference=${conference.id}`;
  const days = conference.agenda.length;
  const sessionCount = conference.agenda.reduce((n, d) => n + d.sessions.filter((s) => s.type !== "Break").length, 0);

  const facts = [
    { icon: CalendarDays, label: "Dates", value: conference.date },
    { icon: MapPin, label: "Location", value: conference.location },
    { icon: conference.mode === "Virtual" ? Laptop : conference.mode === "Hybrid" ? MonitorPlay : Users, label: "Format", value: conference.mode },
    { icon: Tag, label: "Discipline", value: conference.discipline },
    { icon: Clock, label: "Programme", value: `${days} days · ${sessionCount} sessions` },
    { icon: Globe2, label: "Language", value: "English" },
  ];

  const pill = "inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 ring-1 ring-inset ring-white/15 backdrop-blur";

  return (
    <>
      <PageHero
        eyebrow={conference.discipline}
        title={conference.title}
        description={conference.description}
        image={conference.image}
        crumbs={[
          { label: "Conferences", href: "/conferences" },
          ...(discipline ? [{ label: discipline.name, href: `/conferences/category/${discipline.slug}` }] : []),
          { label: conference.shortTitle },
        ]}
      >
        <ul className="flex flex-wrap items-center gap-2 text-sm text-white/90">
          <li className={pill}>
            <CalendarDays className="size-4 text-blue-light" aria-hidden />
            <span className="sr-only">Dates: </span>
            {conference.date}
          </li>
          <li className={pill}>
            <MapPin className="size-4 text-blue-light" aria-hidden />
            <span className="sr-only">Location: </span>
            {conference.location}
          </li>
          <li className="inline-flex items-center rounded-full bg-blue/30 px-3.5 py-1.5 font-semibold text-white ring-1 ring-inset ring-blue-light/30">
            <span className="sr-only">Format: </span>
            {conference.mode}
          </li>
        </ul>
        <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
          <Button href={registerHref} variant="accent" size="lg">
            <Ticket aria-hidden />
            Register Now
          </Button>
          <Button href={submitHref} variant="outline-light" size="lg">
            <FileText aria-hidden />
            Submit Abstract
          </Button>
        </div>
      </PageHero>

      <SectionNav items={sections} label={`${conference.shortTitle} sections`} />

      {/* Overview */}
      <section id="overview" aria-label="About the conference" className={`bg-background ${sectionPad}`}>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Overview" title="About the conference" />
            <p className="mt-6 max-w-prose text-base leading-relaxed text-navy/85 sm:text-lg">{conference.overview}</p>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-muted-foreground">
              Accepted abstracts are presented in oral, poster or workshop sessions and may be considered for the conference
              proceedings. Every delegate receives a certificate of attendance, and presenters also receive a certificate of presentation.
            </p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {["Peer-reviewed abstract programme", "Keynote and plenary lectures", "Young researcher forum and awards", "Networking with academia and industry"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-navy shadow-card"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
                      <CheckCircle2 className="size-4" aria-hidden />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <aside
            aria-labelledby="facts-title"
            className="h-fit overflow-hidden rounded-2xl border border-border bg-white shadow-card lg:sticky lg:top-40"
          >
            <h3 id="facts-title" className="px-6 pb-2 pt-6 font-display text-xl font-bold text-navy">
              Key facts
            </h3>
            <dl className="px-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3.5 px-3 py-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-navy">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="m-3 mt-2 grid gap-2 rounded-xl bg-surface p-3">
              <Button href={registerHref} variant="accent">
                Register Now
              </Button>
              <Button href={submitHref} variant="outline">
                Submit Abstract
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      {/* Topics */}
      <section id="topics" aria-label="Topics and tracks" className={`bg-surface ${sectionPad}`}>
        <Container>
          <SectionHeading
            align="center"
            title="Topics and tracks"
            description="Abstracts are invited across the following tracks. Choose the closest match when you submit."
          />
          <Reveal>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {conference.topics.map((topic, i) => (
                <li key={topic} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-card">
                  <span
                    className="flex size-10 items-center justify-center rounded-xl bg-blue/10 font-display text-sm font-bold tabular-nums text-blue"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="mt-5 font-display font-semibold leading-snug text-navy">{topic}</span>
                  <span className="sr-only">Track {i + 1}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Dates */}
      <section id="dates" aria-label="Important dates" className={`bg-background ${sectionPad}`}>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Timeline"
              title="Important dates"
              description="Plan your submission and registration around these deadlines. All deadlines close at 23:59 UTC."
            />
            <Button href={submitHref} variant="outline" className="mt-8">
              Submit your abstract
              <ArrowRight aria-hidden />
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
            <ol className="relative">
              <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-border" />
              {conference.deadlines.map((d, i) => (
                <li key={d.label} className="relative pb-8 pl-10">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1 size-[15px] rounded-full ${
                      i === 0 ? "bg-blue ring-4 ring-blue/15" : "border-2 border-blue bg-white"
                    }`}
                  />
                  <p className="text-sm font-semibold text-blue">
                    <time>{d.date}</time>
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-navy sm:text-xl">{d.label}</p>
                </li>
              ))}
              <li className="relative pl-10">
                <span aria-hidden className="absolute left-0 top-1 size-[15px] rounded-full bg-navy ring-4 ring-navy/10" />
                <p className="text-sm font-semibold text-blue">{conference.date}</p>
                <p className="mt-1 font-display text-lg font-bold text-navy sm:text-xl">Conference takes place</p>
              </li>
            </ol>
          </div>
        </Container>
      </section>

      {/* Programme */}
      <section id="programme" aria-label="Programme at a glance" className={`bg-surface ${sectionPad}`}>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <SectionHeading title="Programme at a glance" />
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg lg:justify-self-end">
              {days} days and {sessionCount} sessions. Times are local to the venue and may shift slightly as the programme is finalised.
            </p>
          </div>
          <div className="mt-10">
            <ProgrammeTabs days={conference.agenda} idPrefix={`${conference.id}-programme`} />
          </div>
        </Container>
      </section>

      {/* Speakers */}
      <section id="speakers" aria-label="Featured speakers" className={`bg-background ${sectionPad}`}>
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Speakers" title="Featured speakers" />
            <Button href="/speakers" variant="outline" className="self-start lg:self-auto">
              All speakers
              <ArrowRight aria-hidden />
            </Button>
          </div>
          {speakers.length > 0 ? (
            <ul className="mt-12 grid gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {speakers.map((s) => (
                <li key={s.slug}>
                  <SpeakerCard speaker={s} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-12 rounded-2xl border border-border bg-white p-8 text-center text-muted-foreground shadow-card">
              Speakers will be announced soon.
            </p>
          )}
        </Container>
      </section>

      {/* Venue */}
      <section id="venue" aria-label={isVirtual ? "Joining online" : "Venue and travel"} className={`bg-surface ${sectionPad}`}>
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14">
          <div>
            <SectionHeading title={isVirtual ? "Joining online" : "Venue and travel"} />
            <address className="mt-8 flex items-start gap-4 rounded-2xl border border-border bg-white p-5 not-italic shadow-card">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <Building2 className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-navy">{conference.venue.name}</span>
                <span className="mt-1 block text-sm text-navy/80">{conference.venue.address}</span>
                <span className="block text-sm text-navy/80">{conference.venue.city}</span>
              </span>
            </address>
            {isVirtual ? (
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                This is a fully virtual event. After registering you will receive a personal access link to the event
                platform, where you can watch live sessions, ask questions, visit the virtual poster hall and meet other delegates.
                Recordings stay available on demand after the event.
              </p>
            ) : (
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                The venue is well served by public transport and close to a range of hotels. Discounted accommodation
                details and visa invitation letters are available to registered delegates.
                {conference.mode === "Hybrid" && " Every session is also streamed live for delegates attending online."}
              </p>
            )}
          </div>
          {isVirtual ? (
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {[
                { icon: MonitorPlay, text: "Live-streamed keynotes and sessions" },
                { icon: Users, text: "Moderated Q&A and delegate chat" },
                { icon: FileText, text: "Virtual poster hall" },
                { icon: Laptop, text: "On-demand recordings after the event" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="rounded-2xl border border-border bg-white p-6 shadow-card">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-medium text-navy">{text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-white shadow-card sm:aspect-[16/10]">
              <iframe
                title={`Map showing the area around ${conference.venue.name}, ${conference.venue.city}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(conference.venue.mapQuery)}&output=embed`}
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </Container>
      </section>

      {/* Fees */}
      <section id="fees" aria-label="Registration fees" className={`bg-background ${sectionPad}`}>
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Registration"
              title="Registration fees"
              description="All fees are in USD and include the full programme, delegate kit and certificate. Register before the early bird deadline for the reduced rate."
            />
            <Button href="/registration" variant="link" className="mt-6">
              Full registration details
              <ArrowRight aria-hidden />
            </Button>
          </div>
          <div className="h-fit overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <caption className="sr-only">Registration fees for {conference.shortTitle}</caption>
                <thead className="bg-surface text-navy">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">
                      Category
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">
                      Early bird
                      <span className="block text-xs font-normal text-muted-foreground">
                        until {conference.deadlines.find((d) => /early bird/i.test(d.label))?.date ?? "early deadline"}
                      </span>
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">
                      Standard
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {conference.fees.map((f) => (
                    <tr key={f.category} className="transition-colors hover:bg-surface/60">
                      <th scope="row" className="px-5 py-5 font-medium text-navy sm:px-6">
                        {f.category}
                      </th>
                      <td className="px-5 py-5 font-semibold text-blue tabular-nums sm:px-6">{f.early}</td>
                      <td className="px-5 py-5 text-navy tabular-nums sm:px-6">{f.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section aria-label={`Join ${conference.shortTitle}`} className="bg-background pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14">
            <Image src={conference.image} alt="" fill sizes="100vw" className="-z-30 object-cover opacity-20" />
            <div aria-hidden className="bg-grid absolute inset-0 -z-20" />
            <div aria-hidden className="absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-blue/30 blur-[120px]" />
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-light ring-1 ring-inset ring-white/15">
                  <CalendarDays className="size-3.5" aria-hidden />
                  {conference.date}
                </p>
                <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
                  Join us at {conference.shortTitle}
                </h2>
                <p className="mt-4 text-white/70">Secure your place or share your research with an international audience.</p>
              </div>
              <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row">
                <Button href={registerHref} variant="light" size="lg">
                  Register Now
                </Button>
                <Button href={submitHref} variant="outline-light" size="lg">
                  Submit Abstract
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section aria-label="Related conferences" className="bg-surface py-16 sm:py-20 lg:py-28">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading title="Related conferences" size="sm" />
              <Link
                href="/conferences"
                className="inline-flex h-10 items-center gap-1.5 self-start rounded-full bg-blue/10 px-4 text-sm font-semibold text-blue transition-colors hover:bg-blue/15 sm:self-auto"
              >
                View all conferences
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.id}>
                  <ConferenceCard conference={c} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
