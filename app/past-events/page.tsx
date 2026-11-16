import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarDays, FileText, Globe2, MapPin, Presentation, Users } from "lucide-react";
import { pastEvents } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Past Events",
  description: "An archive of our previous international scientific conferences, summits and symposia.",
};

/* Demo figures for the archive highlights strip. */
const highlights = [
  { icon: Presentation, value: "42", label: "Conferences held" },
  { icon: Users, value: "18,600+", label: "Delegates welcomed" },
  { icon: Globe2, value: "74", label: "Countries represented" },
  { icon: FileText, value: "9,300+", label: "Abstracts presented" },
];

export default function PastEventsPage() {
  const locations = new Set(pastEvents.map((e) => e.location));
  return (
    <>
      <PageHero
        eyebrow="Archive"
        title="Past Events"
        description="A record of the meetings where our community has gathered to share research, debate ideas and build lasting collaborations."
        crumbs={[{ label: "Conferences", href: "/conferences" }, { label: "Past Events" }]}
        image="/images/hall.jpg"
      />

      <section aria-label="Highlights" className="relative z-10 -mt-10 sm:-mt-12">
        <Container>
          <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Icon className="size-5" aria-hidden />
                </span>
                <dt className="order-last mt-1 text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy tabular-nums sm:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-label="Event archive" className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Where we have met"
            title="Event archive"
            description={`${pastEvents.length} recent events across ${locations.size} locations, in person and online.`}
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {pastEvents.map((e, i) => (
              <li key={e.title}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                      <Image
                        src={e.image}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover grayscale-[30%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy backdrop-blur">
                        <CalendarDays className="size-3.5" aria-hidden />
                        {e.date}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="mb-5 font-display text-lg font-bold leading-snug text-navy">{e.title}</h3>
                      <dl className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-navy/80">
                        <div className="flex items-center gap-1.5">
                          <dt className="sr-only">Location</dt>
                          <MapPin className="size-4 shrink-0 text-blue" aria-hidden />
                          <dd>{e.location}</dd>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <dt className="sr-only">Attendees</dt>
                          <Users className="size-4 shrink-0 text-blue" aria-hidden />
                          <dd>{e.attendees} attendees</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-label="Upcoming events" className="bg-background pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
            <div aria-hidden className="absolute -left-24 -top-32 -z-10 size-80 rounded-full bg-blue/30 blur-[120px]" />
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <SectionHeading
                tone="dark"
                size="sm"
                title="Be part of the next chapter"
                description="Our upcoming conferences are open for abstracts and registration across six disciplines."
              />
              <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row">
                <Button href="/conferences" variant="light" size="lg">
                  Upcoming conferences
                  <ArrowRight aria-hidden />
                </Button>
                <Button href="/call-for-abstracts" variant="outline-light" size="lg">
                  Call for abstracts
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
