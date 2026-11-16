import type { Metadata } from "next";
import { ArrowDown, BadgeCheck, BookOpen, Clock, Globe2, Mail, Megaphone, Network, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { DemoForm, FieldGrid, SelectField, TextAreaField, TextField, CheckboxField } from "@/components/forms/demo-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { partners } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description: "The academic institutions, scientific societies, industry and media partners that support our conferences.",
};

const groups = [
  { type: "Academic", label: "Academic partners", text: "Universities and research councils that co-develop programmes and host events." },
  { type: "Society", label: "Scientific societies", text: "Professional bodies that endorse sessions and extend our reach to their members." },
  { type: "Industry", label: "Industry partners", text: "Companies that bring applied problems, technology showcases and career pathways." },
  { type: "Media", label: "Media partners", text: "Publishers and networks that share conference news and research highlights." },
] as const;

const benefits = [
  { icon: Users, title: "Reach a global research audience", text: "Connect with researchers, academicians and decision-makers from over 90 countries, at more than 20 events a year." },
  { icon: BadgeCheck, title: "Shared credibility", text: "Co-branding on programmes, proceedings and the conference website." },
  { icon: Network, title: "Shape the programme", text: "Propose sessions, workshops and themes aligned with your priorities." },
  { icon: BookOpen, title: "Publication opportunities", text: "Collaborate on special issues, proceedings and joint reports." },
  { icon: Megaphone, title: "Year-round visibility", text: "Features in newsletters, social channels and news between events." },
  { icon: Globe2, title: "Member benefits", text: "Discounted registration and priority places for your members, staff or students." },
];

const partnershipTypes = ["Academic partnership", "Scientific society endorsement", "Industry partnership", "Media partnership", "Other"];

const minorWords = new Set(["of", "for", "the", "and", "&"]);
/** Logo-style monogram from a partner name, e.g. "Northern Research Council" → "NRC". */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => !minorWords.has(w.toLowerCase()))
    .map((w) => w[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();
}

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our network"
        title="Partners"
        description="Our conferences are built with institutions, societies, companies and publishers that share our commitment to open, rigorous science."
        crumbs={[{ label: "About Us", href: "/about" }, { label: "Partners" }]}
        image="/images/lecture.jpg"
      >
        <Button href="#partner-with-us" variant="light" size="lg">
          Partner with us
          <ArrowDown aria-hidden />
        </Button>
      </PageHero>

      {/* Logo wall */}
      <section aria-labelledby="partners-heading" className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="partners-heading" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-4xl lg:text-5xl">
              Who we work with
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {partners.length} organisations across academia, scientific societies, industry and media help us plan,
              host and share every conference.
            </p>
          </div>
          <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
            {groups.map((g) => {
              const list = partners.filter((p) => p.type === g.type);
              return (
                <Reveal key={g.type}>
                  <section aria-labelledby={`group-${g.type}`} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3">
                        <h3 id={`group-${g.type}`} className="font-display text-xl font-bold text-navy">
                          {g.label}
                        </h3>
                        <Badge variant="blue" size="sm">
                          {list.length}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
                    </div>
                    <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-6 lg:col-span-9 lg:grid-cols-3">
                      {list.map((p) => (
                        <li
                          key={p.name}
                          className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-5 py-8 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                        >
                          <span aria-hidden className="text-gradient font-display text-4xl font-extrabold tracking-[-0.04em]">
                            {initials(p.name)}
                          </span>
                          <span className="mt-3 text-sm font-semibold leading-snug text-navy">{p.name}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Benefits: bento */}
      <section className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Benefits"
            title="Why partner with us"
            description="Partnerships are tailored to each organisation, but most include a combination of the benefits below."
          />
          <Reveal>
            <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {benefits.map(({ icon: Icon, title, text }, i) => {
                const big = i === 0;
                return (
                  <li
                    key={title}
                    className={cn(
                      "relative isolate flex flex-col overflow-hidden rounded-2xl p-6 sm:p-7",
                      big
                        ? "bg-navy-deep text-white sm:col-span-2 lg:row-span-2 lg:p-10"
                        : "border border-border bg-card shadow-card",
                    )}
                  >
                    {big && (
                      <>
                        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
                        <div aria-hidden className="absolute -bottom-24 -left-24 -z-10 size-72 rounded-full bg-blue/30 blur-[120px]" />
                      </>
                    )}
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl",
                        big ? "bg-white/10 text-blue-light" : "bg-blue/10 text-blue",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {big && (
                      <p className="mt-auto pt-12 font-display text-6xl font-extrabold tracking-[-0.04em] text-white">
                        90<span className="text-blue-light">+</span>
                      </p>
                    )}
                    <h3 className={cn("font-display font-bold", big ? "mt-2 text-2xl text-white" : "mt-5 text-lg text-navy")}>{title}</h3>
                    <p className={cn("mt-2 text-[15px] leading-relaxed", big ? "text-white/70" : "text-muted-foreground")}>{text}</p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Enquiry form */}
      <section id="partner-with-us" aria-labelledby="partner-form-heading" className="scroll-mt-28 bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 id="partner-form-heading" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-4xl">
              Start a partnership conversation
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Tell us about your organisation and what you would like to achieve. A member of the partnerships team will
              reply within three working days.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Mail className="size-4" aria-hidden />
                </span>
                <a href={`mailto:${site.email}`} className="font-medium text-navy hover:text-blue">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Clock className="size-4" aria-hidden />
                </span>
                <span className="text-navy">{site.hours}</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-8 lg:col-span-8 lg:p-10">
            <DemoForm submitLabel="Send enquiry" successTitle="Partnership enquiry received">
              <FieldGrid>
                <TextField label="Organisation" name="organisation" required autoComplete="organization" full />
                <TextField label="Contact name" name="name" required autoComplete="name" />
                <TextField label="Email" name="email" type="email" required autoComplete="email" />
                <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
                <SelectField label="Partnership type" name="type" options={partnershipTypes} required />
                <TextAreaField
                  label="Message"
                  name="message"
                  required
                  full
                  placeholder="Tell us about your organisation and the kind of partnership you have in mind."
                />
                <CheckboxField name="consent" required label="I agree to be contacted about this enquiry." />
              </FieldGrid>
            </DemoForm>
          </div>
        </Container>
      </section>
    </>
  );
}
