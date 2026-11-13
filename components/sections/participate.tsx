import { CalendarCheck, FileUp, Mic2, Ticket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  { icon: CalendarCheck, title: "Choose a conference", text: "Browse upcoming events by discipline, format and location." },
  { icon: FileUp, title: "Submit your abstract", text: "Send your research summary for scientific committee review." },
  { icon: Ticket, title: "Register to attend", text: "Confirm your place as a speaker, delegate or poster presenter." },
  { icon: Mic2, title: "Present and publish", text: "Share your work and have it considered for the proceedings." },
];

export function Participate() {
  return (
    <section id="participate" className="bg-surface py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Get Involved"
          title="How to Participate"
          description="Four straightforward steps from first idea to published contribution."
        />
        <Reveal>
          <ol className="relative mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {/* Connector line on desktop */}
            <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <span className="relative z-10 flex size-12 items-center justify-center border border-navy bg-white text-navy">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-blue">Step {i + 1}</p>
                <h3 className="mt-2 text-xl text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
