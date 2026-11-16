import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SpeakerDirectory } from "@/components/conference/speaker-directory";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { allSpeakers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Keynote, plenary and invited speakers presenting at our upcoming international conferences.",
};

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        eyebrow="Programme"
        title="Speakers"
        description="Meet the keynote, plenary and invited speakers leading sessions across our upcoming conferences."
        crumbs={[{ label: "Speakers" }]}
        image="/images/keynote.jpg"
      />

      <section aria-label="Speaker directory" className="bg-background py-14 sm:py-20 lg:py-24">
        <Container>
          <SpeakerDirectory speakers={allSpeakers} />
        </Container>
      </section>

      <section aria-labelledby="speak-cta" className="bg-surface py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 border border-border bg-card p-6 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">Call for speakers</p>
              <h2 id="speak-cta" className="mt-3 font-display text-2xl leading-tight text-navy sm:text-3xl">
                Have research to share? Join the programme.
              </h2>
              <p className="mt-3 text-muted-foreground">
                We welcome applications for oral, poster and workshop sessions at every conference.
              </p>
            </div>
            <Button href="/become-a-speaker" size="lg">
              Become a Speaker
              <ArrowRight aria-hidden />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
