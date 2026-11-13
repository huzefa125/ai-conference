import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { gallery } from "@/lib/data";

export function Gallery() {
  return (
    <section id="gallery" className="bg-background py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Conference Experience"
          title="Inside Our Conferences"
          description="From plenary halls to small-group discussion, the moments that make a scientific meeting worthwhile."
        />
        <Reveal>
          <ul className="mt-10 sm:mt-14 grid auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-3 lg:auto-rows-[240px]">
            {gallery.map((g) => (
              <li key={g.src} className={cn("group relative overflow-hidden bg-navy", g.className)}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes={g.className.includes("col-span-2") ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 100vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/80 to-transparent"
                />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">{g.caption}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
