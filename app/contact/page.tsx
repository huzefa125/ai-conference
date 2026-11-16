import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CheckboxField, DemoForm, FieldGrid, SelectField, TextAreaField, TextField } from "@/components/forms/demo-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the conference team about registration, abstracts, sponsorship, media or anything else.",
};

const subjects = ["General", "Registration", "Abstracts", "Sponsorship", "Media", "Other"] as const;

const infoCards = [
  { icon: MapPin, label: "Address", value: site.address },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s+/g, "")}` },
  { icon: Clock, label: "Office hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Questions about an upcoming conference, your registration or a submission? The team is here to help."
        crumbs={[{ label: "Contact" }]}
        image="/images/about.jpg"
      />

      <section aria-labelledby="contact-details" className="bg-background pb-4 pt-16 sm:pt-20">
        <Container>
          <h2 id="contact-details" className="sr-only">
            Contact details
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {infoCards.map(({ icon: Icon, label, value, href }) => (
              <li
                key={label}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-card transition duration-300 has-[a]:hover:-translate-y-1 has-[a]:hover:shadow-lift sm:p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-5 text-xs font-semibold text-blue">{label}</p>
                {href ? (
                  <a href={href} className="mt-1.5 block break-words font-medium text-navy after:absolute after:inset-0 hover:text-blue">
                    {value}
                  </a>
                ) : (
                  <p className="mt-1.5 font-medium text-navy">{value}</p>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="contact-form-heading" className="bg-background py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-10">
              <h2 id="contact-form-heading" className="font-display text-3xl font-bold tracking-[-0.03em] text-navy sm:text-4xl">
                Send us a message
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                We aim to reply within two working days. Fields marked with an asterisk are required.
              </p>
              <div className="mt-8">
                <DemoForm submitLabel="Send message" successTitle="Message received">
                  <FieldGrid>
                    <TextField label="Full name" name="name" required autoComplete="name" />
                    <TextField label="Email" name="email" type="email" required autoComplete="email" />
                    <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
                    <SelectField label="Subject" name="subject" options={subjects} required />
                    <TextAreaField label="Message" name="message" required full rows={6} maxLength={2000} />
                    <CheckboxField
                      name="consent"
                      required
                      label={
                        <>
                          I agree that my details may be used to respond to this enquiry, as described in the{" "}
                          <Link href="/privacy" className="text-blue underline underline-offset-2">
                            privacy policy
                          </Link>
                          .
                        </>
                      }
                    />
                  </FieldGrid>
                </DemoForm>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <iframe
                src="https://www.google.com/maps?q=London&output=embed"
                title="Map showing the office location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] h-auto w-full border-0"
              />
              <div className="flex items-start gap-3 p-5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                <p className="text-sm text-muted-foreground">{site.address}</p>
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep p-7 text-white sm:p-9">
              <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
              <div aria-hidden className="absolute -right-16 -top-20 -z-10 size-64 rounded-full bg-blue/30 blur-[120px]" />
              <SectionHeading tone="dark" size="sm" eyebrow="Quick answers" title="Common questions" />
              <ul className="mt-6 space-y-2">
                {faqs.slice(0, 3).map((f) => (
                  <li key={f.question} className="rounded-xl bg-white/5 px-4 py-3 text-[15px] text-white/85 ring-1 ring-inset ring-white/10">
                    {f.question}
                  </li>
                ))}
              </ul>
              <Button href="/faq" variant="light" className="mt-7">
                View all FAQs
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
