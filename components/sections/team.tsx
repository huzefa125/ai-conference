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
  quote?: { text: string; name: string; role: string; photo: string };
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
  quote,
}: TeamProps) {
  return (
    <section id={id} className="relative w-full overflow-hidden py-12 md:py-20">
      {/* Decorative stroke, bottom right */}
      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 hidden text-border md:block"
        fill="none"
        height="154"
        viewBox="0 0 460 154"
        width="460"
      >
        <path
          d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="40"
        />
      </svg>

      <div className="relative z-10">
        {/* Heading */}
        <div className="container mx-auto mb-12 flex max-w-3xl flex-col items-center px-4 text-center">
          <span className="mb-6 grid h-12 w-12 place-items-center bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(37,99,235,0.3)]">
            <UsersThreeIcon weight="duotone" size={26} />
          </span>
          <h2 className="relative text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
            <svg
              aria-hidden
              className="absolute -right-10 -top-3 -z-10 w-20 text-primary/15 sm:w-24"
              fill="none"
              height="86"
              viewBox="0 0 108 86"
              width="108"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
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
                  <span className="absolute left-2 top-2 bg-card px-2 py-0.5 font-mono text-[11px] font-bold tracking-widest text-primary">
                    No. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Museum-style caption */}
                <figcaption className="flex items-start justify-between gap-2 border-t-2 border-foreground px-1.5 pb-1 pt-3 mt-2.5">
                  <div className="min-w-0">
                    <p className="text-base font-bold leading-snug text-foreground">{m.name}</p>
                    <p className="mt-0.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">{m.role}</p>
                  </div>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      aria-label={`${m.name} on LinkedIn`}
                      className="grid h-8 w-8 shrink-0 place-items-center bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <LinkedinLogoIcon weight="fill" size={16} />
                    </a>
                  )}
                </figcaption>
              </figure>
            ))}
          </Marquee>
        </div>

        {/* Note from the team */}
        {quote && (
          <figure className="container mx-auto mt-14 max-w-3xl px-4 text-center">
            <span aria-hidden className="block text-6xl font-bold leading-none text-primary/30">“</span>
            <blockquote className="-mt-2 text-lg font-medium leading-relaxed text-foreground md:text-xl">
              {quote.text}
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={quote.photo} alt="" className="h-14 w-14 rounded-full border-2 border-card object-cover shadow-[var(--shadow-subtle)]" />
              <span>
                <span className="block text-sm font-bold text-foreground">{quote.name}</span>
                <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">{quote.role}</span>
              </span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
