import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight, History, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { ConferenceBrowser } from "@/components/conference/conference-browser";
import type { Mode } from "@/lib/data";

const modes: Mode[] = ["In-person", "Virtual", "Hybrid"];
const isMode = (value: unknown): value is Mode => typeof value === "string" && (modes as string[]).includes(value);

export const metadata: Metadata = {
  title: "Conferences",
  description: "Browse every upcoming international scientific conference by discipline, format and location.",
};

type SearchParams = PageProps<"/conferences">["searchParams"];

/** Reads ?mode= and ?discipline= at request time (inside Suspense, see cacheComponents). */
async function BrowserFromQuery({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const rawMode = Array.isArray(sp.mode) ? sp.mode[0] : sp.mode;
  const rawDiscipline = Array.isArray(sp.discipline) ? sp.discipline[0] : sp.discipline;
  const initialMode = isMode(rawMode) ? rawMode : undefined;
  /* key resets the client state when the ?mode= link is followed again from the nav */
  return <ConferenceBrowser key={`${initialMode ?? "all"}-${rawDiscipline ?? ""}`} initialMode={initialMode} initialDiscipline={rawDiscipline} />;
}

export default function ConferencesPage(props: PageProps<"/conferences">) {
  return (
    <>
      <PageHero
        eyebrow="Upcoming events"
        title="International Scientific Conferences"
        description="Find the right meeting for your research. Filter by discipline, attend in person, online or in a hybrid format, and search by topic or city."
        crumbs={[{ label: "Conferences" }]}
        image="/images/hall.jpg"
      />

      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <Suspense fallback={<ConferenceBrowser />}>
            <BrowserFromQuery searchParams={props.searchParams} />
          </Suspense>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep p-8 text-white sm:p-10 lg:p-12">
              <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-blue/30 blur-[120px]" />
              <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-blue-light">
                <Mic className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 max-w-md font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Call for abstracts is open</h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
                Submit oral, poster, virtual or workshop proposals to any upcoming conference. Reviews come back within three weeks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/call-for-abstracts/submit" variant="accent" size="lg">
                  Submit an abstract
                  <ArrowRight aria-hidden />
                </Button>
                <Button href="/call-for-abstracts" variant="outline-light" size="lg">
                  Guidelines
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 rounded-3xl border border-border bg-white p-8 shadow-card sm:p-10">
              <div>
                <span className="flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <History className="size-5" aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold tracking-[-0.03em] text-navy sm:text-3xl">Explore past events</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  See where our community has met before, and the conferences that shaped each field.
                </p>
              </div>
              <Button href="/past-events" variant="outline" className="self-start">
                View past events
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
