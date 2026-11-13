import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  { question: "Who can attend our conferences?", answer: "Placeholder answer. Researchers, academicians, students and industry professionals are welcome to attend as delegates, speakers or poster presenters." },
  { question: "How do I submit an abstract?", answer: "Placeholder answer. Choose a conference, follow its abstract guidelines and submit through the event page before the stated deadline." },
  { question: "Can I attend virtually?", answer: "Placeholder answer. Selected events are offered online or in a hybrid format. The format is shown on each conference card." },
  { question: "Are conference proceedings published?", answer: "Placeholder answer. Accepted contributions may be considered for conference proceedings and associated publications." },
  { question: "How can my organisation sponsor an event?", answer: "Placeholder answer. Visit the Services section or contact the team to discuss sponsorship and exhibition opportunities." },
];

export function Faq() {
  return (
    <section id="faq" className="bg-surface py-14 sm:py-20 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Answers are placeholders until the organisation’s policies are confirmed."
          />
        </div>
        <Accordion items={faqs} className="lg:col-span-8" />
      </Container>
    </section>
  );
}
