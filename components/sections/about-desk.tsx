import { CalendarDays, ShieldCheck, Video } from "lucide-react";
import { aboutDesk } from "@/lib/about-desk-data";
import { ScrollRevealText } from "./scroll-reveal-text";

const ICONS = [ShieldCheck, CalendarDays, Video];

export default function AboutDesk({ id = "overview" }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative w-full border-y border-border/60 bg-gradient-to-b from-card/40 via-card/80 to-transparent py-14 sm:py-18 lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollRevealText
            segments={aboutDesk.segments}
            className="text-[1.35rem] font-medium leading-[1.7] tracking-tight text-foreground sm:text-3xl sm:leading-[1.6] xl:text-[2.25rem] xl:leading-[1.6]"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border/60 pt-8 sm:grid-cols-3 sm:gap-6">
          {aboutDesk.pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={p.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/70 p-5 shadow-[0_4px_20px_-10px_rgba(15,23,42,0.08)] backdrop-blur-xs transition-colors hover:border-border hover:bg-card"
              >
                <div className="flex items-center justify-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-foreground">
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{p.label}</h3>
                </div>
                <p className="text-center text-base leading-relaxed text-muted-foreground sm:text-lg">{p.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
