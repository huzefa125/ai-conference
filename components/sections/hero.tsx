import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { conferences } from "@/lib/data";

export function Hero() {
  const next = conferences[0];
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Image
        src="/images/hero.jpg"
        alt="Keynote presentation in front of a large international conference audience"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Single directional navy treatment keeps text legible and the photo visible on the right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(11,18,32,0.96)_0%,rgba(11,18,32,0.86)_42%,rgba(11,18,32,0.45)_100%)]"
      />

      <Container className="flex min-h-[560px] flex-col justify-between pb-0 pt-16 sm:pt-24 lg:min-h-[640px]">
        <div className="max-w-3xl pb-16 lg:pb-24">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-light">
            <span className="h-px w-10 bg-blue-light" aria-hidden />
            International Scientific Conferences
          </p>
          <h1 className="font-serif text-[2.1rem] leading-[1.1] tracking-tight min-[400px]:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4rem]">
            Advancing Science Through Global Collaboration
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-lg">
            Bringing together researchers, scientists, academicians and industry leaders to exchange knowledge,
            present discoveries and shape the future of scientific innovation.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#conferences" variant="accent" size="lg" className="w-full sm:w-auto">
              Explore Conferences
              <ArrowRight aria-hidden />
            </Button>
            <Button href="#speakers" variant="outline-light" size="lg" className="w-full sm:w-auto">
              Become a Speaker
            </Button>
          </div>
        </div>

        {/* Next-event strip: adds scale and immediacy without extra chrome */}
        <div className="grid border-t border-white/15 bg-navy-deep/70 backdrop-blur-sm sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-light">
              Next conference
            </span>
            <span className="font-serif text-lg leading-snug">{next.title}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 py-4 text-sm text-white/80 sm:border-l sm:border-t-0 sm:pl-8">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-blue-light" aria-hidden />
              {next.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-blue-light" aria-hidden />
              {next.location}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
