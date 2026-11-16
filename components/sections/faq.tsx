import FrequentlyAskedQuestions from "@/components/ui/frequently-asked-questions-with-accordion";
import { site } from "@/lib/site";
import { faqs } from "@/lib/content";


export function Faq() {
  return (
    <FrequentlyAskedQuestions
      id="faq"
      title="Frequently Asked Questions"
      description="Quick answers about submissions, registration and attending. Anything else? Write to"
      data={faqs.slice(0, 6)}
      supportEmail={site.email}
      className="bg-background"
    />
  );
}
