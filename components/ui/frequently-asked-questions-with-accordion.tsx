"use client";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/frequently-asked-questions-with-accordion-utils/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FrequentlyAskedQuestionsProps {
  id?: string;
  title?: string;
  description?: string;
  data?: FAQItem[];
  className?: string;
  supportEmail?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "What is the purpose of this website?",
    answer:
      "This website is a place to help you find the best products and services in the world. We curate top-quality offerings so you can make informed decisions without spending hours on research.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team by emailing support@example.com or by using the live chat widget in the bottom-right corner of the page. We typically respond within 24 hours on business days.",
  },
];

/**
 * Animated FAQ with a Radix accordion. Adapted to the site theme:
 * theme colour tokens instead of zinc, heading rendered as h2 (the page's h1 is the hero),
 * and an optional id so it can be used as an in-page section.
 */
export default function FrequentlyAskedQuestions({
  id,
  title = "Frequently asked questions",
  description = "We are here to help you with any questions you may have. If you don't find what you need, please contact us.",
  data = defaultFAQs,
  className,
  supportEmail = "support@example.com",
}: FrequentlyAskedQuestionsProps) {
  return (
    <section id={id} className={cn("relative w-full overflow-hidden py-14 sm:py-20 lg:py-28", className)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-navy md:text-5xl">
          {title}
        </h2>

        <p
          className="relative z-10 mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground md:text-lg"
        >
          {description}{" "}
          <a
            href={`mailto:${supportEmail}`}
            className="text-blue underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            {supportEmail}
          </a>
        </p>

        <div
          className="mt-10 sm:mt-14"
        >
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {data.map((item, index) => (
              <div key={`faq-${index}`}>
                <AccordionItem value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="gap-6 py-5 text-left text-base text-navy hover:text-blue hover:no-underline sm:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
