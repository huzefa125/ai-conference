import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const posts = [
  { tag: "Conference Update", title: "Sample article: what to expect from this year’s keynote programme", date: "Sample date", image: "/images/keynote.jpg" },
  { tag: "Research", title: "Sample article: preparing an abstract that stands out to reviewers", date: "Sample date", image: "/images/lab.jpg" },
  { tag: "Publications", title: "Sample article: from conference paper to published proceedings", date: "Sample date", image: "/images/hall.jpg" },
];

export function News() {
  return (
    <section id="news" className="bg-background py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="News & Insights" title="Latest From the Community" description="Placeholder articles shown to demonstrate the layout." />
          <Button href="#" variant="outline" size="lg" className="self-start lg:self-auto">
            View All Articles
            <ArrowRight aria-hidden />
          </Button>
        </div>
        <Reveal>
          <ul className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.title}>
                <a href="#" className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                    {p.tag} <span className="text-muted-foreground">· {p.date}</span>
                  </p>
                  <h3 className="mt-2 flex items-start justify-between gap-3 text-lg leading-snug text-navy group-hover:text-blue">
                    {p.title}
                    <ArrowUpRight className="mt-1 size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </h3>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
