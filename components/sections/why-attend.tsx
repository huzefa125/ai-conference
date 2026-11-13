import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { benefits } from "@/lib/data";

/** The one deliberate dark band in the middle of the page. */
export function WhyAttend() {
  return (
    <section id="why-attend" className="bg-navy py-14 text-white sm:py-20 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              tone="dark"
              title="Why Attend Our Conferences?"
              description="Every programme is built around the exchanges that move research forward: presenting, questioning, and meeting the people who can help."
            />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden">
              <Image
                src="/images/about-2.jpg"
                alt="Delegates listening to a presentation at an international conference"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-blue px-5 py-4 text-sm text-white">
                Oral, poster and workshop formats across every event.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ol className="grid gap-x-10 sm:grid-cols-2">
            {benefits.map(({ title, description, icon: Icon }, i) => (
              <li key={title} className="border-t border-white/15 py-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-light">{String(i + 1).padStart(2, "0")}</span>
                  <Icon className="size-6 text-white" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="mt-5 text-xl text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
