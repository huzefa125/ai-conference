import type { Metadata } from "next";
import { EyeOff, Mail, ShieldCheck, UserCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
};

const highlights = [
  { icon: EyeOff, title: "We never sell your data", text: "Personal information is shared only with the providers who help us run our events." },
  { icon: UserCheck, title: "You stay in control", text: "Access, correct or delete your details, and unsubscribe from updates at any time." },
  { icon: ShieldCheck, title: "Kept only as long as needed", text: "Records are deleted or anonymised once they are no longer required." },
];

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: [
      `${site.name} organises international scientific conferences and publishes associated journals and proceedings. In this policy, "we", "us" and "our" refer to ${site.name}.`,
      "We are the controller of the personal information described here, which means we decide how and why it is used.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "Information you give us: your name, email address, phone number, job title, affiliation and country when you register, submit an abstract, apply to speak, sponsor an event or contact us. If you pay a registration fee, our payment provider processes your card details on our behalf; we do not store full card numbers.",
      "Submission content: abstracts, manuscripts, biographies and photographs you send us for the programme or for publication.",
      "Information collected automatically: limited technical data such as your browser type, device, approximate location and the pages you visit. We use it to keep the website secure, fix problems and understand which content is useful.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: [
      "We use your information to process registrations, payments and submissions; to organise peer review; to prepare the programme, badges and certificates; to send practical information about events you are taking part in; and to respond to your questions.",
      "If you have agreed to receive them, we also send occasional updates about future conferences and calls for papers. Each email includes a link to unsubscribe.",
      "We rely on the following legal bases: performing our contract with you, our legitimate interest in running and improving our events, your consent (for marketing and optional cookies) and compliance with legal obligations such as tax and accounting rules.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: [
      "We do not sell personal information. We share it only where needed with trusted service providers, such as payment processors, hosting and email providers, venues, and printing and badge suppliers, under contracts that require them to protect it.",
      "Accepted speakers' names, affiliations, biographies and photographs appear in the published programme. Authors' names and affiliations appear in published papers. We may also disclose information where the law requires it.",
    ],
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: [
      "Our events take place in several countries, so your information may be processed outside the country where you live. Where this happens, we use appropriate safeguards, such as standard contractual clauses, to protect it.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "We keep registration and payment records for as long as required by tax and accounting law. Submission and review records are kept for the life of the related publication. Marketing preferences are kept until you unsubscribe. After that, information is deleted or anonymised.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access the information we hold about you, to have it corrected or deleted, to restrict or object to certain uses, and to receive a copy in a portable format. You can withdraw consent at any time without affecting earlier processing.",
      "To make a request, email us using the details below. We will respond within one month. You also have the right to complain to your local data protection authority.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "We use essential cookies to keep the website working, for example to remember the contents of a registration form. Optional analytics cookies are set only if you accept them, and you can change your choice at any time in your browser settings.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "We use encryption in transit, access controls and regular reviews of our systems to protect your information. No system is completely secure, so please contact us straight away if you think your details have been misused.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The date at the top of the page shows when it was last changed. If we make significant changes, we will let registered delegates know by email.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="How we collect, use and protect the personal information you share with us."
        crumbs={[{ label: "Privacy Policy" }]}
        image="/images/about-2.jpg"
      />

      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Badge variant="soft" size="md">
              Last updated 1 November 2026
            </Badge>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-display font-bold text-navy">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 max-w-prose">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mt-12 scroll-mt-28 first:mt-0">
                  <h2 id={`${s.id}-heading`} className="flex items-baseline gap-3 font-display text-2xl font-bold tracking-tight text-navy">
                    <span className="text-base font-semibold text-blue tabular-nums">{i + 1}.</span>
                    {s.title}
                  </h2>
                  {s.body.map((p) => (
                    <p key={p} className="mt-4 text-base leading-[1.8] text-navy/80 sm:text-[17px]">
                      {p}
                    </p>
                  ))}
                </section>
              ))}

              <div className="mt-14 flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Mail className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-navy">Contact us about privacy</h2>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                    Email{" "}
                    <a href={`mailto:${site.email}`} className="font-medium text-blue underline-offset-4 hover:underline">
                      {site.email}
                    </a>{" "}
                    or write to {site.name}, {site.address}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
