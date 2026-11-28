import { LinkedinLogoIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { Marquee } from "@/components/ui/marquee";

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
}

export interface TeamProps {
  id?: string;
  title?: string;
  subtitle?: string;
  members: TeamMember[];
}

/**
 * Team marquee in the Atlas theme: each member is a framed print with a
 * museum-style caption label. Scrolls sideways, pauses on hover.
 */
export default function Team({
  id = "team",
  title = "The team",
  subtitle = "The people who plan the programme, the partners and your three days.",
  members,
}: TeamProps) {
  return (
    <section id={id} className="relative w-full overflow-hidden py-12 md:py-20">
      <div className="relative z-10">
        {/* Heading */}
        <div className="container mx-auto mb-12 flex max-w-3xl flex-col items-center px-4 text-center">
          <span className="mb-6 grid h-12 w-12 place-items-center bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(0,82,255,0.3)]">
            <UsersThreeIcon weight="duotone" size={26} />
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">{subtitle}</p>
        </div>

        {/* Marquee of framed portraits */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

          <Marquee pauseOnHover className="py-4 [--duration:45s] [--gap:1.5rem]">
            {members.map((m, i) => (
              <figure
                key={m.name}
                className="group w-60 shrink-0 border border-border bg-card p-2.5 shadow-[var(--shadow-subtle)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[var(--shadow-hover)] sm:w-64"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <span className="absolute left-2 top-2 bg-card px-2 py-0.5 font-mono text-[12px] font-bold tracking-widest text-tertiary-strong">
                    No. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Museum-style caption */}
                <figcaption className="flex items-start justify-between gap-2 border-t-2 border-foreground px-1.5 pb-1 pt-3 mt-2.5">
                  <div className="min-w-0">
                    <p className="text-base font-bold leading-snug text-foreground">{m.name}</p>
                    <p className="mt-0.5 font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">{m.role}</p>
                  </div>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      aria-label={`${m.name} on LinkedIn`}
                      className="grid h-8 w-8 shrink-0 place-items-center bg-tertiary/10 text-tertiary-strong transition-colors hover:bg-tertiary-strong hover:text-white"
                    >
                      <LinkedinLogoIcon weight="fill" size={16} />
                    </a>
                  )}
                </figcaption>
              </figure>
            ))}
          </Marquee>
        </div>

      </div>
    </section>
  );
}
