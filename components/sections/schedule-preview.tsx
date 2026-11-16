"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { nextConference } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

/** Short descriptions shown under an expanded session row. */
const notes: Record<string, string> = {
  Break: "Our team is on hand at the registration desk from early morning to help with badges, questions and directions.",
  Ceremony: "A welcome from the organising committee and an overview of the programme ahead.",
  Keynote: "A plenary talk from one of this year’s keynote speakers, followed by audience Q&A.",
};

export function SchedulePreview() {
  const days = nextConference.agenda;
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    setActive(i);
    setOpen(0);
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % days.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + days.length) % days.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = days.length - 1;
    else return;
    e.preventDefault();
    select(n);
    tabRefs.current[n]?.focus();
  }

  const day = days[active];

  return (
    <section id="schedule" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading + stacked photos */}
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Schedule"
            title="Schedule and Agenda"
            description={`Stay on top of the ${nextConference.shortTitle} programme: a full rundown of keynotes, sessions, workshops and networking, from registration on the first morning to the closing ceremony.`}
          />
          <Link
            href={`/conferences/${nextConference.id}#programme`}
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-blue"
          >
            Full programme
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>

          <div className="relative mt-12 hidden h-72 sm:block">
            <div aria-hidden className="absolute left-10 top-10 size-72 rounded-full bg-blue/15 blur-3xl" />
            <div className="absolute left-0 top-0 size-44 overflow-hidden rounded-3xl shadow-xl">
              <Image src="/images/hall.jpg" alt="" fill sizes="176px" className="object-cover" />
            </div>
            <div className="absolute left-28 top-24 size-48 overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
              <Image src="/images/attend.jpg" alt="" fill sizes="192px" className="object-cover" />
            </div>
          </div>
        </div>

        {/* Right: day tabs + timeline */}
        <div className="lg:col-span-7">
          <div role="tablist" aria-label="Conference days" className="flex gap-6 overflow-x-auto border-b border-border [scrollbar-width:none] sm:gap-14">
            {days.map((d, i) => {
              const selected = i === active;
              return (
                <button
                  key={d.day}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`schedule-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="schedule-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className="relative shrink-0 pb-3 text-left"
                >
                  <span className={cn("block font-display text-base font-bold sm:text-xl", selected ? "text-navy" : "text-navy/35")}>
                    Day {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("block text-xs sm:text-sm", selected ? "text-muted-foreground" : "text-navy/30")}>{d.date}</span>
                  <span
                    aria-hidden
                    className={cn("absolute inset-x-0 -bottom-px h-0.5 rounded-full transition-colors", selected ? "bg-blue" : "bg-transparent")}
                  />
                </button>
              );
            })}
          </div>

          <ol id="schedule-panel" role="tabpanel" aria-labelledby={`schedule-tab-${active}`} className="mt-6 space-y-1">
            {day.sessions.map((s, i) => {
              const isOpen = i === open;
              const note = s.speaker ? `Presented by ${s.speaker}. ${notes.Keynote}` : notes[s.type];
              return (
                <li key={s.time + s.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={note ? isOpen : undefined}
                    disabled={!note}
                    className="flex w-full flex-col gap-1 rounded-xl px-3 py-3 text-left transition-colors enabled:hover:bg-surface disabled:cursor-default sm:grid sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-4 sm:py-3.5"
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{s.time}</span>
                    <span className={cn("font-display text-base font-bold sm:text-lg", isOpen ? "text-blue" : "text-navy")}>{s.title}</span>
                  </button>
                  {isOpen && note && (
                    <p className="px-3 pb-3 text-sm leading-relaxed text-muted-foreground sm:ml-[8rem] sm:max-w-lg">{note}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
