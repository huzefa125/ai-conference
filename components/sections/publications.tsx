import Image from "next/image";
import { ArrowRight, BookOpen, FileText, GraduationCap, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const items = [
  { icon: BookOpen, title: "Scientific journals", text: "Peer-reviewed titles across our core disciplines." },
  { icon: FileText, title: "Research publications", text: "Articles and papers from conference presenters." },
  { icon: ScrollText, title: "Conference proceedings", text: "Permanent records of each event’s accepted work." },
  { icon: GraduationCap, title: "Academic knowledge sharing", text: "Resources that reach beyond the venue and the date." },
];

export function Publications() {
  return (
    <section id="publications" className="bg-surface py-14 sm:py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal delay={0.1} className="order-2 lg:order-1 lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/lab-2.jpg"
              alt="Researcher working at laboratory equipment"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-navy px-5 py-4 sm:px-6 sm:py-5">
              <p className="text-base font-medium text-white sm:text-lg">Peer reviewed work with a permanent record.</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2 lg:col-span-6">
          <SectionHeading
            title="Knowledge That Continues Beyond Conferences"
            description="Presented work is only the beginning. Our publishing programme gives research a lasting, citable home."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {items.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <Icon className="mt-0.5 size-6 shrink-0 text-blue" strokeWidth={1.5} aria-hidden />
                <div>
                  <h3 className="font-medium text-navy">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button href="#" size="lg" className="mt-10">
            Discover Publications
            <ArrowRight aria-hidden />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
