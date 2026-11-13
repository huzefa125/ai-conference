import Image from "next/image";

export type Speaker = { name: string; role: string; org: string; focus: string; image: string };

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={speaker.image}
          alt={`Portrait of ${speaker.name} (sample profile)`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top grayscale-[35%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
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
    </article>
  );
}
