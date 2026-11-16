import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { nextConference as next } from "@/lib/data";
import { allSpeakers } from "@/lib/content";
import { SpeakerCutoutCard } from "@/components/conference/speaker-cutout-card";
import { HeroCountdown } from "./hero-countdown";

/** Hero with event title, date, register CTA, glass countdown and speaker cards that overlap into the next section. */
export function Hero() {
  const year = next.startDate.slice(0, 4);
  const featured = next.speakerSlugs
    .map((s) => allSpeakers.find((x) => x.slug === s))
    .filter((s) => s?.image)
    .concat(allSpeakers.filter((s) => s.image && !next.speakerSlugs.includes(s.slug)))
    .slice(0, 4);

  return (
    <section id="top" className="relative bg-white">
      {/* Dark photo band */}
      <div className="relative isolate overflow-hidden bg-navy-deep pb-40 text-white sm:pb-48 lg:pb-56">
        <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(7,13,24,0.97)_0%,rgba(7,13,24,0.88)_45%,rgba(7,13,24,0.55)_100%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-deep to-transparent" />

        <Container className="grid items-center gap-10 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-24">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">The {year} international conference</p>
            <h1 className="mt-5 font-display text-[2.25rem] font-bold leading-[1.1] tracking-[-0.025em] min-[400px]:text-[2.6rem] sm:text-5xl lg:text-[3.5rem]">
              {next.title} {year}
            </h1>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <div>
                <p className="text-lg font-semibold">{next.date}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/65">
                  <MapPin className="size-3.5" aria-hidden />
                  {next.location}
                </p>
              </div>
              <Button href={`/registration?conference=${next.id}`} variant="accent" size="lg">
                Register now
                <ArrowRight aria-hidden />
              </Button>
              <Link href={`/conferences/${next.id}`} className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
                Event details
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <HeroCountdown startDate={next.startDate} label={`The conference begins on ${next.date}.`} />
          </div>
        </Container>
      </div>

      {/* Speaker cards overlapping the photo band */}
      <Container className="relative -mt-32 pb-16 sm:-mt-40 sm:pb-20 lg:-mt-44">
        <h2 className="sr-only">Featured speakers</h2>
        <ul className="grid grid-cols-2 items-end gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((s) =>
            s ? (
              <li key={s.slug}>
                <SpeakerCutoutCard slug={s.slug} name={s.name} subtitle={s.focus} image={s.image} />
              </li>
            ) : null,
          )}
        </ul>
      </Container>
    </section>
  );
}
