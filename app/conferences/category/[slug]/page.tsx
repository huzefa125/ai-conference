import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarX2, Hash } from "lucide-react";
import { conferences, disciplines, getDiscipline } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/layout/page-hero";
import { ConferenceCard } from "@/components/conference/conference-card";

export function generateStaticParams() {
  return disciplines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/conferences/category/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const discipline = getDiscipline(slug);
  if (!discipline) return { title: "Discipline not found" };
  return { title: `${discipline.name} Conferences`, description: discipline.description };
}

export default async function DisciplinePage(props: PageProps<"/conferences/category/[slug]">) {
  const { slug } = await props.params;
  const discipline = getDiscipline(slug);
  if (!discipline) notFound();

  const list = conferences
    .filter((c) => c.disciplineSlug === discipline.slug)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const topics = Array.from(new Set(list.flatMap((c) => c.topics))).sort((a, b) => a.localeCompare(b));
  const others = disciplines.filter((d) => d.slug !== discipline.slug);
  const Icon = discipline.icon;

  return (
    <>
      <PageHero
        eyebrow="Discipline"
        title={`${discipline.name} Conferences`}
        description={discipline.description}
        image={discipline.image}
        crumbs={[{ label: "Conferences", href: "/conferences" }, { label: discipline.name }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-blue-light ring-1 ring-inset ring-white/15">
            <Icon className="size-5" aria-hidden />
          </span>
          <p className="text-sm text-white/80">
            <span className="font-semibold text-white">{list.length}</span> upcoming {list.length === 1 ? "conference" : "conferences"}
            {topics.length > 0 && (
              <>
                {" · "}
                <span className="font-semibold text-white">{topics.length}</span> research topics
              </>
            )}
          </p>
        </div>
      </PageHero>

      <section aria-label="Upcoming conferences" className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={`${list.length} ${list.length === 1 ? "event" : "events"} scheduled`}
              title="Upcoming conferences"
              description={`Meetings in ${discipline.name.toLowerCase()} open for abstracts and registration.`}
            />
            <Button href="/conferences" variant="outline" className="self-start lg:self-auto">
              All conferences
              <ArrowRight aria-hidden />
            </Button>
          </div>

          {list.length > 0 ? (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {list.map((c) => (
                <li key={c.id}>
                  <ConferenceCard conference={c} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 flex flex-col items-center rounded-3xl border border-border bg-white px-6 py-16 text-center shadow-card">
              <span className="flex size-14 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <CalendarX2 className="size-6" aria-hidden />
              </span>
              <p className="mt-5 font-display text-2xl font-bold tracking-[-0.03em] text-navy">No conferences scheduled yet</p>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                New {discipline.name.toLowerCase()} events will be announced soon. Browse other disciplines in the meantime.
              </p>
              <Button href="/conferences" className="mt-6">
                Browse all conferences
              </Button>
            </div>
          )}
        </Container>
      </section>

      {topics.length > 0 && (
        <section aria-label="Research topics" className="bg-surface py-16 sm:py-20 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <SectionHeading
                title={`What we cover in ${discipline.name}`}
                description={`Tracks drawn from the scientific programmes of our ${discipline.name.toLowerCase()} conferences.`}
              />
              <Button href="/call-for-abstracts" variant="accent" className="mt-8">
                Submit an abstract
                <ArrowRight aria-hidden />
              </Button>
            </div>
            <Reveal>
              <ul className="flex flex-wrap gap-2.5 rounded-3xl border border-border bg-white p-5 shadow-card sm:p-7">
                {topics.map((t) => (
                  <li
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-navy ring-1 ring-inset ring-border"
                  >
                    <Hash className="size-3.5 shrink-0 text-blue" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      )}

      <section aria-label="Other disciplines" className={`${topics.length > 0 ? "bg-background" : "bg-surface"} py-16 sm:py-20 lg:py-28`}>
        <Container>
          <SectionHeading eyebrow="Keep exploring" title="Explore other disciplines" size="sm" align="center" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {others.map((d) => {
              const DIcon = d.icon;
              const count = conferences.filter((c) => c.disciplineSlug === d.slug).length;
              return (
                <li key={d.slug}>
                  <Link
                    href={`/conferences/category/${d.slug}`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-lift"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                      <DIcon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold text-navy">{d.name}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{d.description}</span>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue">
                        {count} {count === 1 ? "conference" : "conferences"}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
