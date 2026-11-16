import Image from "next/image";
import { ArrowRight, Award, Medal, Star, Trophy } from "lucide-react";
import { awards } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [Trophy, Star, Medal, Award];

export function Awards() {
  return (
    <section id="awards" className="bg-background py-14 sm:py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            title="Recognising Excellence in Research"
            description="Every conference closes with awards that celebrate rigorous, original work, with a special focus on students and early-career researchers."
          />
          <div className="relative mt-10 aspect-[4/3] overflow-hidden">
            <Image src="/images/stage.jpg" alt="Award ceremony on a conference stage" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 bg-navy px-5 py-4 text-white">
              <p className="text-sm">Award winners receive a certificate and a fee waiver for a future conference.</p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {awards.map((a, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <li key={a.title} className="group flex flex-col bg-white p-7 transition-colors hover:bg-navy sm:p-8">
                    <span className="flex size-12 items-center justify-center border border-navy text-navy transition-colors group-hover:border-blue-light group-hover:text-blue-light">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-serif text-xl text-navy transition-colors group-hover:text-white">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/75">{a.description}</p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/call-for-abstracts" size="lg">
              Submit to Be Considered
              <ArrowRight aria-hidden />
            </Button>
            <Button href="/news/young-researcher-awards-2026" variant="outline" size="lg">
              Meet Past Winners
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
