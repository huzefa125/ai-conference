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
    <section id="participate" className="bg-background py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From abstract to published paper in four steps"
          description="A clear path from your first submission to a citable record of your work."
        />
        <Reveal>
          <ol className="relative mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span aria-hidden className="font-display text-4xl font-extrabold text-navy/[0.07]">0{i + 1}</span>
                </div>
                <p className="mt-6 text-xs font-semibold text-blue">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
