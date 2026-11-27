import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, CalendarBlankIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import PageShell from "@/components/layout/page-shell";
import { getContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Conferences | Atlas Global 2026",
  description: "Atlas Global 2026 in Hyderabad and the other conferences in the Atlas series.",
};

export default async function ConferencesPage() {
  const [flagship, ...others] = (await getContent()).conferences;

  return (
    <PageShell>
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Conferences</span>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Our <span className="text-primary">events</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Practical science conferences for the people doing the research. Start with our flagship in Hyderabad.
            </p>
          </div>

          {/* Flagship */}
          <div id={flagship.slug} className="mx-auto mt-12 grid max-w-6xl scroll-mt-24 overflow-hidden border border-border bg-card shadow-[var(--shadow-subtle)] lg:grid-cols-2">
            <div className="relative aspect-[16/10] bg-secondary lg:aspect-auto lg:min-h-[24rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flagship.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="w-fit bg-primary px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                {flagship.status}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{flagship.name}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{flagship.summary}</p>
              <div className="mt-6 space-y-2 text-sm text-foreground">
                <p className="flex items-center gap-2">
                  <CalendarBlankIcon size={18} weight="duotone" className="text-primary" /> {flagship.dates}
                </p>
                <p className="flex items-center gap-2">
                  <MapPinIcon size={18} weight="duotone" className="text-primary" /> {flagship.city}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#tickets" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Get tickets <ArrowRightIcon size={14} />
                </Link>
                <Link href="/#agenda" className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background">
                  View agenda
                </Link>
              </div>
            </div>
          </div>

          {/* Other events */}
          <h2 className="mx-auto mt-16 max-w-6xl text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">More conferences</h2>
          <div className="mx-auto mt-6 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <div key={c.slug} id={c.slug} className="flex scroll-mt-24 flex-col overflow-hidden border border-border bg-card shadow-[var(--shadow-subtle)]">
                <div className="relative aspect-[16/10] bg-secondary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[30%]" />
                  <span
                    className={cn(
                      "absolute left-3 top-3 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest",
                      c.status === "Upcoming" ? "bg-primary text-primary-foreground" : "bg-card/95 text-foreground"
                    )}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-foreground">{c.name}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon size={15} weight="duotone" className="text-primary" /> {c.city}
                    <span aria-hidden>·</span> {c.dates}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                  <Link href="/contact" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary hover:underline">
                    Get notified <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
