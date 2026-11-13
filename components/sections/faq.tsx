import FrequentlyAskedQuestions from "@/components/ui/frequently-asked-questions-with-accordion";
import { site } from "@/lib/site";

const faqs = [
  { question: "Who can attend our conferences?", answer: "Placeholder answer. Researchers, academicians, students and industry professionals are welcome to attend as delegates, speakers or poster presenters." },
  { question: "How do I submit an abstract?", answer: "Placeholder answer. Choose a conference, follow its abstract guidelines and submit through the event page before the stated deadline." },
  { question: "Can I attend virtually?", answer: "Placeholder answer. Selected events are offered online or in a hybrid format. The format is shown on each conference card." },
  { question: "Are conference proceedings published?", answer: "Placeholder answer. Accepted contributions may be considered for conference proceedings and associated publications." },
  { question: "How can my organisation sponsor an event?", answer: "Placeholder answer. Visit the Services section or contact the team to discuss sponsorship and exhibition opportunities." },
  { question: "Is there a registration fee?", answer: "Placeholder answer. Fees, categories and any concessions will be listed on each conference page once confirmed." },
];

export function Faq() {
  return (
    <FrequentlyAskedQuestions
      id="faq"
      title="Frequently Asked Questions"
      description="Answers below are placeholders until policies are confirmed. For anything else, write to"
      data={faqs}
      supportEmail={site.email}
      className="bg-background"
    />
  );
}
