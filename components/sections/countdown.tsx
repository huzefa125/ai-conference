"use client";

import * as React from "react";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { nextConference } from "@/lib/data";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/** Google Calendar "add event" link for the next conference (all-day span). */
function calendarHref() {
  const ymd = (d: Date) => d.toISOString().slice(0, 10).replaceAll("-", "");
  const start = new Date(nextConference.startDate);
  // Google's all-day end date is exclusive, so use the day after the last agenda day.
  const end = new Date(start.getTime() + nextConference.agenda.length * 86_400_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: nextConference.title,
    dates: `${ymd(start)}/${ymd(end)}`,
    location: nextConference.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function Countdown() {
  const target = React.useMemo(() => new Date(nextConference.startDate).getTime(), []);
  // null until mounted so server and client markup match.
  const [parts, setParts] = React.useState<Parts | null>(null);

  React.useEffect(() => {
    const tick = () => setParts(diff(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units: { label: string; value?: number }[] = [
    { label: "Days", value: parts?.days },
    { label: "Hours", value: parts?.hours },
    { label: "Minutes", value: parts?.minutes },
    { label: "Seconds", value: parts?.seconds },
  ];

  return (
    <section aria-labelledby="countdown-heading" className="border-b border-border bg-white">
      <Container className="grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[1fr_auto_auto] lg:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">Countdown to {nextConference.shortTitle}</p>
          <h2 id="countdown-heading" className="mt-2 font-serif text-2xl leading-snug text-navy sm:text-[1.75rem]">
            Early bird registration is open
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {nextConference.date} · {nextConference.location}
          </p>
        </div>

        {/* aria-hidden on the ticking digits; screen readers get a single static summary instead */}
        <div>
          <p className="sr-only">The conference begins on {nextConference.date}.</p>
          <ol aria-hidden className="grid grid-cols-4 border border-border">
            {units.map((u, i) => (
              <li
                key={u.label}
                className={"flex min-w-[4.25rem] flex-col items-center px-3 py-4 sm:min-w-[5.5rem] sm:px-5 " + (i > 0 ? "border-l border-border" : "")}
              >
                <span className="font-serif text-3xl tabular-nums text-navy sm:text-4xl">
                  {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]">
                  {u.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button href={`/registration?conference=${nextConference.id}`} size="lg">
            Register Now
            <ArrowRight aria-hidden />
          </Button>
          <a
            href={calendarHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-navy/25 px-6 text-sm font-medium text-navy transition-colors hover:border-navy"
          >
            <CalendarPlus className="size-4" aria-hidden />
            Add to calendar
            <span className="sr-only">(opens Google Calendar in a new tab)</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
