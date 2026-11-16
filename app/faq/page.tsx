import type { Metadata } from "next";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import FrequentlyAskedQuestions from "@/components/ui/frequently-asked-questions-with-accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about attending, submitting abstracts, registration, proceedings and sponsorship.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Answers to the questions we hear most often about attending, presenting and publishing."
        crumbs={[{ label: "FAQ" }]}
        image="/images/attend.jpg"
      />

      <FrequentlyAskedQuestions
        id="faq"
        title="All questions"
        description="Can't find what you're looking for? Write to us at"
        data={faqs}
        supportEmail={site.email}
        className="bg-background"
      />

      <section aria-labelledby="faq-cta" className="bg-background pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep px-6 py-10 text-white sm:px-12 sm:py-14">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
            <div aria-hidden className="absolute -left-24 -top-32 -z-10 size-96 rounded-full bg-blue/30 blur-[120px]" />
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-light ring-1 ring-inset ring-white/15">
                  <MessageCircleQuestion className="size-6" aria-hidden />
                </span>
                <div>
                  <h2 id="faq-cta" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    Still have questions?
                  </h2>
                  <p className="mt-2 max-w-xl text-white/70">
                    The conference team answers every message within two working days.
                  </p>
                </div>
              </div>
              <Button href="/contact" variant="accent" size="lg" className="w-full sm:w-auto">
                Contact the team
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
