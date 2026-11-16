import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import Link from "next/link";
import { posts } from "@/lib/content";


export function News() {
  return (
    <section id="news" className="bg-background py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading title="Latest news and guides" description="Conference updates, guides for authors and news from our research community." />
          <Button href="/news" variant="outline" size="lg" className="self-start lg:self-auto">
            All articles
            <ArrowRight aria-hidden />
          </Button>
        </div>
        <Reveal>
          <ul className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <li key={p.title}>
                <Link href={`/news/${p.slug}`} className="group block rounded-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-blue/10 px-2.5 py-1 font-semibold text-blue">{p.tag}</span>
                    <span className="text-muted-foreground">{p.date}</span>
                  </p>
                  <h3 className="mt-3 flex items-start justify-between gap-3 text-lg font-bold leading-snug text-navy transition-colors group-hover:text-blue">
                    {p.title}
                    <ArrowUpRight className="mt-1 size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
