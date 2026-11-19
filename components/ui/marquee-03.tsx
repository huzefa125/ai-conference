import { clsx } from "clsx";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-03-utils/marquee";
import { REVIEWS, type Review } from "@/lib/testimonials-data";

const ReviewCard = ({ profile, name, username, body }: Review) => {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <Card className="relative w-full max-w-sm cursor-default overflow-hidden rounded-none border border-border bg-card p-5 shadow-[var(--shadow-subtle)] transition-colors hover:border-primary/50">
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex flex-row items-center gap-3">
          {profile ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="h-10 w-10 rounded-full object-cover" width="40" height="40" alt="" src={profile} />
          ) : (
            <span
              aria-hidden
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary"
            >
              {initials}
            </span>
          )}
          <div className="flex min-w-0 flex-col">
            <p className="font-mono text-sm font-bold text-foreground">{name}</p>
            <p className="font-mono text-xs text-muted-foreground">{username}</p>
          </div>
        </div>
        <p className="font-mono text-sm leading-relaxed text-foreground/85">{body}</p>
      </CardContent>
    </Card>
  );
};

export interface TestimonialsMarqueeProps {
  id?: string;
  className?: string;
  reviews?: Review[];
  title?: string;
  subtitle?: string;
}

export default function TestimonialsMarquee({
  id = "reviews",
  className = "",
  reviews = REVIEWS,
  title = "WHAT ATTENDEES SAY",
  subtitle = "Notes from the people who have been in the room.",
}: TestimonialsMarqueeProps) {
  const column = (n: 1 | 2 | 3) => reviews.filter((_, i) => i % 3 === n - 1);

  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 font-mono text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="relative mx-auto mt-10 flex h-[34rem] w-full max-w-6xl flex-row items-center justify-center overflow-hidden">
          <div className="flex h-full w-full flex-row items-center justify-center gap-4">
            {/* Mobile: one column with every review */}
            <Marquee pauseOnHover vertical className="flex h-full flex-1 [--duration:50s] sm:hidden">
              {reviews.map((r) => (
                <ReviewCard key={r.name} {...r} />
              ))}
            </Marquee>
            {/* sm and up: columns alternate direction */}
            <Marquee pauseOnHover vertical className="hidden h-full flex-1 [--duration:40s] sm:flex">
              {column(1).map((r) => (
                <ReviewCard key={r.name} {...r} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="hidden h-full flex-1 [--duration:40s] sm:flex">
              {column(2).map((r) => (
                <ReviewCard key={r.name} {...r} />
              ))}
            </Marquee>
            <Marquee pauseOnHover vertical className="hidden h-full flex-1 [--duration:40s] lg:flex">
              {column(3).map((r) => (
                <ReviewCard key={r.name} {...r} />
              ))}
            </Marquee>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
        </div>
      </div>
    </section>
  );
}
