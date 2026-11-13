import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { researchAreas } from "@/lib/data";

export function ResearchAreas() {
  return (
    <section id="disciplines" className="bg-surface py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="Exploring Science Across Disciplines"
          description="Our conference programme spans the fields where research is moving fastest."
        />
        <Reveal>
          {/* Shared hairline borders give an editorial index feel rather than a wall of cards */}
          <ul className="mt-10 sm:mt-14 grid border-l border-t border-border bg-card sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map(({ title, description, icon: Icon }) => (
              <li key={title} className="border-b border-r border-border">
                <a href="#conferences" className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-navy">
                  <div className="flex items-start justify-between">
                    <Icon className="size-8 text-blue transition-colors group-hover:text-blue-light" strokeWidth={1.5} aria-hidden />
                    <ArrowUpRight
                      className="size-5 text-navy/30 transition-all group-hover:text-white"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-8 font-serif text-2xl text-navy transition-colors group-hover:text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/75">
                    {description}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
