import { Compass, Microscope, Target, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";

const questions = [
  "How do I submit an abstract?",
  "Which conference fits my research area?",
  "Can I present virtually?",
  "What happens after acceptance?",
  "How are papers peer reviewed?",
  "Will my work appear in the proceedings?",
  "How do I register a poster?",
  "Can my organisation sponsor an event?",
  "How do I find collaborators?",
  "What are the key deadlines?",
  "Do you offer student concessions?",
  "How do I become a keynote speaker?",
];

const features = [
  {
    icon: Compass,
    title: "We keep it simple",
    description: "Clear guidelines and straightforward steps, from abstract submission to the final programme.",
  },
  {
    icon: Target,
    title: "We focus on outcomes",
    description: "Every event is shaped around what matters to researchers: visibility, feedback and lasting connections.",
  },
  {
    icon: Microscope,
    title: "We know research",
    description: "Programmes are guided by scientific committees who understand how each discipline works.",
  },
  {
    icon: Handshake,
    title: "With you all the way",
    description: "Support before, during and after the conference.",
  },
];

const third = questions.length / 3;
// Each row repeats its questions once so a single copy is always wider than the visible area
const rows = [questions.slice(0, third), questions.slice(third, third * 2), questions.slice(third * 2)].map((r) => [...r, ...r]);
const rowStyles = [
  { className: "[--duration:45s]", reverse: false },
  { className: "[--duration:50s]", reverse: true },
  { className: "[--duration:42s]", reverse: false },
];

export function Features() {
  return (
    <section id="support" className="bg-background py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          title="Removing the Roadblocks to Your Research"
          description="Deadlines, formats and guidelines can feel like a maze. We filter out the noise and give you the clarity to focus on the science."
          className="max-w-3xl"
        />

        {/* Scrolling questions, faded at both edges */}
        <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden sm:mt-12">
          <div aria-hidden className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
          <div aria-hidden className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
          <div className="flex flex-col">
            {rows.map((row, i) => (
              <Marquee key={i} repeat={3} pauseOnHover reverse={rowStyles[i].reverse} className={`${rowStyles[i].className} [--gap:0.75rem]`}>
                {row.map((q, n) => (
                  <Badge key={`${q}-${n}`} variant="soft" size="lg" className="rounded-md border border-border">
                    {q}
                  </Badge>
                ))}
              </Marquee>
            ))}
          </div>
        </div>

        {/* Overflow trick lets the dashed dividers meet cleanly at every breakpoint */}
        <div className="mt-12 overflow-hidden border-t border-dashed border-border sm:mt-16">
          <div className="-mb-px -mr-px grid sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-5 border-b border-r border-dashed border-border px-5 py-8 lg:px-6 lg:py-10"
              >
                <Icon className="size-10 text-blue" strokeWidth={1.5} aria-hidden />
                <div className="flex flex-col gap-2 pt-6 lg:pt-14">
                  <h3 className="text-xl tracking-tight text-navy sm:text-2xl">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
