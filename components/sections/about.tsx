import Image from "next/image";
import { ArrowRight, BookOpenCheck, Globe2, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  { icon: Handshake, title: "Scientific collaboration" },
  { icon: BookOpenCheck, title: "Knowledge dissemination" },
  { icon: Globe2, title: "International research networking" },
];

export function About() {
  return (
    <section id="about" className="bg-surface py-10 sm:py-14 lg:py-16">
      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md lg:aspect-[4/3]">
            <Image
              src="/images/about.jpg"
              alt="Modern conference hall prepared for an international scientific meeting"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <SectionHeading size="sm" title="Connecting Knowledge. Inspiring Innovation." />
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We organise international scientific conferences and academic events that bring researchers, academicians
            and industry professionals together. Placeholder introduction: replace with the organisation’s own history
            and scope.
          </p>

          <div className="mt-5 grid gap-4 border-y border-border py-5 sm:grid-cols-2 sm:gap-8">
            <div>
              <h3 className="text-base font-semibold text-navy">Our Mission</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Trusted platforms where scientific ideas are shared openly, tested rigorously and put to work.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-navy">Our Vision</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                A connected research community where every discovery finds its audience.
              </p>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {pillars.map(({ icon: Icon, title }) => (
              <li key={title} className="flex items-center gap-2 text-sm font-medium text-navy">
                <Icon className="size-4 text-blue" aria-hidden />
                {title}
              </li>
            ))}
          </ul>

          <Button href="#" className="mt-6">
            Discover Our Organization
            <ArrowRight aria-hidden />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
