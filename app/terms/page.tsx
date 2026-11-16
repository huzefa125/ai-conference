import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing registration, attendance, submissions and use of this website. Placeholder text pending legal review.",
};

const sections = [
  {
    title: "1. About these terms",
    body: [
      `These terms apply to your use of this website and to any registration, submission or purchase you make with ${site.name}. By using the site you agree to them.`,
    ],
  },
  {
    title: "2. Registration and payment",
    body: [
      "A registration is confirmed once full payment has been received. Fees are listed on the Registration page and on each conference page, and may change before payment is made.",
    ],
  },
  {
    title: "3. Cancellations and refunds",
    body: [
      "Cancellations made before the early bird deadline may be eligible for a partial refund. Later cancellations are not refundable, but registrations may be transferred to a colleague with prior notice.",
    ],
  },
  {
    title: "4. Changes to the programme",
    body: [
      "We may change speakers, sessions, venues or formats where necessary. If an event is cancelled by us, we will offer a transfer to another event or a refund of the registration fee.",
    ],
  },
  {
    title: "5. Abstracts and submissions",
    body: [
      "Authors confirm that submitted work is original and that they have the right to submit it. Acceptance for presentation does not guarantee publication in proceedings or journals.",
    ],
  },
  {
    title: "6. Intellectual property",
    body: [
      "Content on this website, including text, logos and images, belongs to us or our licensors and may not be reused without permission, except where a specific licence applies.",
    ],
  },
  {
    title: "7. Liability",
    body: [
      "To the extent permitted by law, we are not liable for indirect losses, travel costs or accommodation costs arising from changes to or cancellation of an event.",
    ],
  },
  {
    title: "8. Contact",
    body: [`Questions about these terms can be sent to ${site.email}.`],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" crumbs={[{ label: "Terms & Conditions" }]} image="/images/about-2.jpg" />
      <section className="bg-background py-14 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">Last updated: 1 November 2026</p>
            <div role="note" className="mt-6 border-l-4 border-blue bg-card p-5 text-sm leading-relaxed text-navy">
              <strong className="font-semibold">Placeholder text.</strong> These terms are sample content for a demo
              website and are not a legal document. They must be replaced with terms reviewed by a qualified professional.
            </div>
            {sections.map((s) => (
              <section key={s.title} className="mt-12">
                <h2 className="font-display text-2xl tracking-tight text-navy">{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-4 text-[15px] leading-[1.8] text-navy/80 sm:text-base">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
