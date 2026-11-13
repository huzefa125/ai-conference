import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpeakerCard } from "@/components/conference/speaker-card";
import { speakers } from "@/lib/data";

export function Speakers() {
  return (
    <section id="speakers" className="bg-surface py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Featured Speakers"
            title="Meet the Minds Shaping Tomorrow"
            description="Sample profiles shown for layout. Names, affiliations and photographs are illustrative placeholders."
          />
          <Button href="#" variant="outline" size="lg" className="self-start lg:self-auto">
            View All Speakers
            <ArrowRight aria-hidden />
          </Button>
        </div>
        <Reveal>
          <div className="mt-10 sm:mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {speakers.map((s) => (
              <SpeakerCard key={s.name} speaker={s} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
