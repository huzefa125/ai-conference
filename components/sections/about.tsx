import Image from "next/image";
import { ArrowRight, BookOpenCheck, Globe2, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  { icon: Handshake, title: "Scientific collaboration", text: "Cross-disciplinary forums where research groups find collaborators." },
  { icon: BookOpenCheck, title: "Knowledge dissemination", text: "Proceedings and publications that carry ideas beyond the venue." },
  { icon: Globe2, title: "International research networking", text: "A community spanning institutions, regions and career stages." },
];

export function About() {
  return (
    <section id="about" className="bg-surface py-14 sm:py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-square">
              <Image
                src="/images/about.jpg"
                alt="Modern conference hall prepared for an international scientific meeting"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-0 hidden w-2/5 border-8 border-surface sm:block">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/about-2.jpg"
                  alt="Researchers attending a conference session"
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <SectionHeading
            eyebrow="About the Organisation"
            title="Connecting Knowledge. Inspiring Innovation."
          />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We organise international scientific conferences and academic events that bring researchers, academicians
            and industry professionals into the same room. Placeholder introduction: replace with the organisation’s
            own history, accreditation and scope.
          </p>

          <div className="mt-8 grid gap-6 border-y border-border py-8 sm:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl text-navy">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                To create trusted platforms where scientific ideas are shared openly, tested rigorously and put to
                work for society.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-navy">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A connected global research community in which every discovery finds the audience and collaborators it
                deserves.
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-5">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center border border-navy/15 bg-background text-blue">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-medium text-navy">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Button href="#" className="mt-10" size="lg">
            Discover Our Organization
            <ArrowRight aria-hidden />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
