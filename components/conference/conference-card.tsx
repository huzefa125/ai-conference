import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conference } from "@/lib/data";

const modeStyles: Record<Conference["mode"], string> = {
  "In-person": "bg-navy text-white",
  Virtual: "bg-blue text-white",
  Hybrid: "bg-white text-navy",
};

/** Reusable event card. Future listing and archive pages can render this directly. */
export function ConferenceCard({ conference }: { conference: Conference }) {
  return (
    <article className="group flex h-full flex-col border border-border bg-background transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.45)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-navy">
        <Image
          src={conference.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-navy/25" />
        <span
          className={cn(
            "absolute left-4 top-4 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
            modeStyles[conference.mode],
          )}
        >
          {conference.mode}
        </span>
        <span className="absolute bottom-0 right-0 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Sample listing
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">{conference.discipline}</p>
        <h3 className="mt-3 font-serif text-xl leading-snug text-navy">{conference.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{conference.description}</p>

        <dl className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-navy/85">
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Date</dt>
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <dd>{conference.date}</dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Location</dt>
            <MapPin className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <dd>{conference.location}</dd>
          </div>
        </dl>

        <a
          href="#"
          className="mt-6 inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-navy transition-colors hover:text-blue"
        >
          View Conference Details
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          <span className="sr-only"> for {conference.title}</span>
        </a>
      </div>
    </article>
  );
}
