import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, Lightbulb, MapPin, Mic2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ConferenceCard } from "@/components/conference/conference-card";
import { Monogram, SpeakerCard } from "@/components/conference/speaker-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { conferences } from "@/lib/data";
import { allSpeakers, getSpeaker } from "@/lib/content";

export function generateStaticParams() {
  return allSpeakers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/speakers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const speaker = getSpeaker(slug);
  if (!speaker) return { title: "Speaker not found" };
  return {
    title: speaker.name,
    description: `${speaker.name}, ${speaker.role} at ${speaker.org}. ${speaker.kind} speaker on ${speaker.focus.toLowerCase()}.`,
  };
}

export default async function SpeakerProfilePage(props: PageProps<"/speakers/[slug]">) {
  const { slug } = await props.params;
  const speaker = getSpeaker(slug);
  if (!speaker) notFound();

  const speakingAt = conferences.filter((c) => c.speakerSlugs.includes(speaker.slug));
  const others = allSpeakers.filter((s) => s.slug !== speaker.slug).slice(0, 3);

  const details = [
    { icon: Building2, label: "Organisation", value: speaker.org },
    { icon: MapPin, label: "Country", value: speaker.country },
    { icon: Lightbulb, label: "Research focus", value: speaker.focus },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${speaker.kind} speaker`}
        title={speaker.name}
        description={`${speaker.role}, ${speaker.org}`}
        crumbs={[{ label: "Speakers", href: "/speakers" }, { label: speaker.name }]}
        image="/images/stage.jpg"
      />

      {/* Profile */}
      <section aria-label="Speaker profile" className="bg-background py-14 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden bg-surface lg:max-w-none">
                {speaker.image ? (
                  <Image
                    src={speaker.image}
                    alt={`Portrait of ${speaker.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 30vw, 384px"
                    className="object-cover object-top"
                  />
                ) : (
                  <Monogram name={speaker.name} className="absolute inset-0" />
                )}
                <span className="absolute left-0 top-4 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">
                  Sample profile
                </span>
              </div>
              <dl className="mx-auto mt-6 max-w-sm space-y-4 border-t border-border pt-6 lg:max-w-none">
                <div>
                  <dt className="sr-only">Speaker type</dt>
                  <dd>
                    <Badge variant={speaker.kind === "Keynote" ? "default" : "soft"} size="sm" className="uppercase tracking-[0.12em]">
                      {speaker.kind}
                    </Badge>
                  </dd>
                </div>
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
                      <dd className="mt-0.5 text-sm text-navy">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">Biography</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-navy sm:text-4xl">About {speaker.name}</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{speaker.bio}</p>

            <article aria-labelledby="talk-title" className="mt-12 bg-navy p-6 text-white sm:p-10">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-light">
                <Mic2 className="size-4" aria-hidden />
                Featured talk
              </p>
              <h3 id="talk-title" className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
                {speaker.talk.title}
              </h3>
              <p className="mt-5 border-t border-white/15 pt-5 text-[15px] leading-relaxed text-white/80">{speaker.talk.abstract}</p>
            </article>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/speakers" variant="outline">
                <ArrowLeft aria-hidden />
                All speakers
              </Button>
              <Button href="/registration">
                Register to attend
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Speaking at */}
      <section aria-labelledby="speaking-at" className="bg-surface py-14 sm:py-20 lg:py-24">
        <Container>
          <h2 id="speaking-at" className="font-display text-3xl tracking-tight text-navy sm:text-4xl">
            Speaking at
          </h2>
          {speakingAt.length > 0 ? (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {speakingAt.map((c) => (
                <li key={c.id}>
                  <ConferenceCard conference={c} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 border border-dashed border-border bg-card p-6 text-muted-foreground">
              Sessions for this speaker will be announced soon.{" "}
              <Link href="/conferences" className="font-semibold text-blue hover:underline">
                Browse upcoming conferences
              </Link>
              .
            </p>
          )}
        </Container>
      </section>

      {/* Other speakers */}
      <section aria-labelledby="other-speakers" className="bg-background py-14 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="other-speakers" className="font-display text-3xl tracking-tight text-navy sm:text-4xl">
              Other speakers
            </h2>
            <Link href="/speakers" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-blue">
              View all speakers
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <SpeakerCard speaker={s} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
