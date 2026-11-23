import type { CSSProperties } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

type Card = {
  variant: "perforated" | "notched";
  tag: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
};

export interface TicketCtaProps {
  id?: string;
  titleLead: string;
  titleMid: string;
  titleBrand: string;
  titleTail: string;
  text: string;
  cards: Card[];
  /** Event facts shown above the headline, e.g. dates and city. */
  meta: { label: string; value: string }[];
  /** Lowest ticket price, shown on the "notched" card when set. */
  fromPrice?: string;
}

/* Ticket silhouettes cut with CSS masks, so no images are needed.
   perforated: a column of round bites down both long edges.
   notched:    a quarter-circle bite out of each corner, like an admission stub. */
const bite = (at: string) => `radial-gradient(circle 9px at ${at}, #0000 96%, #000)`;
const corner = (at: string) => `radial-gradient(circle 20px at ${at}, #0000 96%, #000)`;

const SHAPES: Record<Card["variant"], CSSProperties> = {
  perforated: {
    mask: `${bite("0 50%")} 0 50% / 51% 26px repeat-y, ${bite("100% 50%")} 100% 50% / 51% 26px repeat-y`,
    WebkitMask: `${bite("0 50%")} 0 50% / 51% 26px repeat-y, ${bite("100% 50%")} 100% 50% / 51% 26px repeat-y`,
  },
  notched: {
    mask: [
      `${corner("0 0")} top left / 51% 51% no-repeat`,
      `${corner("100% 0")} top right / 51% 51% no-repeat`,
      `${corner("0 100%")} bottom left / 51% 51% no-repeat`,
      `${corner("100% 100%")} bottom right / 51% 51% no-repeat`,
    ].join(", "),
    WebkitMask: [
      `${corner("0 0")} top left / 51% 51% no-repeat`,
      `${corner("100% 0")} top right / 51% 51% no-repeat`,
      `${corner("0 100%")} bottom left / 51% 51% no-repeat`,
      `${corner("100% 100%")} bottom right / 51% 51% no-repeat`,
    ].join(", "),
  },
};

export default function TicketCta({
  id = "join",
  titleLead,
  titleMid,
  titleBrand,
  titleTail,
  text,
  cards,
  meta,
  fromPrice,
}: TicketCtaProps) {
  return (
    <section id={id} className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 border border-primary/15 bg-primary/[0.06] px-6 py-12 sm:px-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-14">
          {/* Left: event facts and headline */}
          <div>
            <span
              aria-hidden
              className="block h-5 w-5 rounded-full bg-[repeating-linear-gradient(90deg,var(--foreground)_0_2px,transparent_2px_4px)] ring-1 ring-foreground"
            />
            <dl className="mt-5 flex flex-wrap gap-x-12 gap-y-4 text-sm leading-snug text-foreground">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-muted-foreground">{m.label}</dt>
                  <dd className="font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-8 font-heading text-[2.6rem] font-extrabold leading-[1.02] tracking-tighter text-foreground sm:text-6xl lg:text-[4.25rem]">
              <em className="italic">{titleLead}</em> {titleMid}
              <br />
              <span className="text-primary">{titleBrand}</span> <em className="italic">{titleTail}</em>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>
          </div>

          {/* Right: two ticket-shaped cards */}
          <div className="flex flex-col gap-4">
            {cards.map((c) => {
              const perforated = c.variant === "perforated";
              return (
                <div
                  key={c.title}
                  className="drop-shadow-[0_18px_28px_rgba(15,23,42,0.14)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <article
                    style={SHAPES[c.variant]}
                    className={`px-9 py-9 text-center sm:px-14 ${
                      perforated ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] font-semibold uppercase tracking-widest ${
                        perforated ? "text-primary-foreground/70" : "text-accent-foreground/70"
                      }`}
                    >
                      {c.tag}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">{c.title}</h3>
                    <p
                      className={`mx-auto mt-3 max-w-md text-sm leading-relaxed ${
                        perforated ? "text-primary-foreground/80" : "text-accent-foreground/80"
                      }`}
                    >
                      {c.text}
                    </p>

                    {perforated ? (
                      <a
                        href={c.cta.href}
                        className="mt-6 inline-flex items-center gap-2 bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                      >
                        {c.cta.label}
                        <ArrowUpRightIcon weight="bold" size={14} />
                      </a>
                    ) : (
                      <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t-2 border-dashed border-accent-foreground/25 pt-6 sm:flex-row">
                        {fromPrice ? (
                          <p className="text-left">
                            <span className="block font-mono text-[11px] font-semibold uppercase tracking-widest text-accent-foreground/70">
                              Passes from
                            </span>
                            <span className="font-heading text-3xl font-extrabold tracking-tight">{fromPrice}</span>
                          </p>
                        ) : (
                          <span />
                        )}
                        <a
                          href={c.cta.href}
                          className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
                        >
                          {c.cta.label}
                          <ArrowUpRightIcon weight="bold" size={14} />
                        </a>
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
