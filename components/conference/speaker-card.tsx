import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type SpeakerCardData = {
  name: string;
  role: string;
  org: string;
  focus: string;
  image?: string;
  /** When present, the card links to /speakers/[slug]. */
  slug?: string;
};

/** Initials block used when a speaker or board member has no photograph. */
export function Monogram({ name, className }: { name: string; className?: string }) {
  const initials = name
    .replace(/^(Dr\.|Prof\.)\s+/, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div aria-hidden className={cn("flex items-center justify-center bg-navy font-serif text-white", className)}>
      <span className="text-[clamp(1.5rem,5vw,3rem)] tracking-wide">{initials}</span>
    </div>
  );
}

export function SpeakerCard({ speaker }: { speaker: SpeakerCardData }) {
  const inner = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt={`Portrait of ${speaker.name} (sample profile)`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top grayscale-[35%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <Monogram name={speaker.name} className="absolute inset-0 transition-colors duration-500 group-hover:bg-blue" />
        )}
        <span className="absolute left-0 top-4 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">
          Sample profile
        </span>
      </div>
      <div className="border-b-2 border-navy pb-5 pt-5 transition-colors group-hover:border-blue">
        <h3 className="font-serif text-xl text-navy">{speaker.name}</h3>
        <p className="mt-1 text-sm font-medium text-navy/85">{speaker.role}</p>
        <p className="text-sm text-muted-foreground">{speaker.org}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-blue">{speaker.focus}</p>
      </div>
    </>
  );
  return (
    <article className="group">
      {speaker.slug ? (
        <Link href={`/speakers/${speaker.slug}`} className="block">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </article>
  );
}
