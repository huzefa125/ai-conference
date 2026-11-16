import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  Award,
  Check,
  Coffee,
  Handshake,
  IdCard,
  Lightbulb,
  Quote,
  ShoppingBag,
  Smartphone,
  Target,
  TrendingUp,
  Wifi,
  Wine,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Monogram } from "@/components/conference/speaker-card";
import { DemoForm, FieldGrid, FormSection, RadioCards, SelectField, TextAreaField, TextField, CheckboxField } from "@/components/forms/demo-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { conferences } from "@/lib/data";
import { sponsorshipPackages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sponsorship",
  description: "Sponsorship and exhibition opportunities to reach an international audience of researchers and decision-makers.",
};

const audienceStats = [
  { value: "14,000+", label: "Delegates each year" },
  { value: "90+", label: "Countries represented" },
  { value: "62%", label: "Senior researchers and leads" },
  { value: "20+", label: "Events per year" },
];

const reasons = [
  { icon: Target, title: "Reach a qualified audience", text: "Meet principal investigators, lab managers and procurement leads in one place." },
  { icon: Lightbulb, title: "Showcase innovation", text: "Demonstrate products and services to the researchers who use them." },
  { icon: Handshake, title: "Build relationships", text: "Turn conversations at your stand into collaborations and long-term accounts." },
  { icon: TrendingUp, title: "Grow your brand", text: "Visibility before, during and after each event across print and digital channels." },
];

const addOns = [
  { icon: IdCard, title: "Lanyards and badges", price: "$3,500" },
  { icon: Coffee, title: "Coffee break sponsor", price: "$2,500" },
  { icon: Smartphone, title: "Conference app sponsor", price: "$5,000" },
  { icon: Award, title: "Awards ceremony sponsor", price: "$6,500" },
  { icon: Wine, title: "Networking reception", price: "$8,000" },
  { icon: ShoppingBag, title: "Delegate bag insert", price: "$750" },
  { icon: Wifi, title: "Wi-Fi sponsor", price: "$3,000" },
  { icon: Lightbulb, title: "Workshop or masterclass", price: "$4,500" },
];

const bySector = [
  { label: "Academia and universities", value: 48 },
  { label: "Industry and R&D", value: 24 },
  { label: "Hospitals and clinical", value: 12 },
  { label: "Government and policy", value: 9 },
  { label: "Other", value: 7 },
];

const byRegion = [
  { label: "Europe", value: 34 },
  { label: "Asia Pacific", value: 28 },
  { label: "North America", value: 18 },
  { label: "Middle East and Africa", value: 12 },
  { label: "Latin America", value: 8 },
];

const sponsorQuotes = [
  {
    quote: "Our stand was busy for all three days, and we left with qualified leads from research groups we had been trying to reach for years.",
    name: "Elif Demir",
    role: "Head of Marketing, Precisa Instruments",
  },
  {
    quote: "Sponsoring the young researcher awards put our name in front of exactly the people we hope to hire.",
    name: "Ravi Menon",
    role: "Head of Partnerships, Quantia Labs",
  },
];

function Bars({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h3 className="font-display text-xl font-bold text-navy">{title}</h3>
      <ul className="mt-6 space-y-5">
        {data.map((d) => (
          <li key={d.label}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="text-navy">{d.label}</span>
              <span className="font-semibold tabular-nums text-navy">{d.value}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface" role="img" aria-label={`${d.label}: ${d.value} percent`}>
              <div className="h-full rounded-full bg-gradient-to-r from-blue to-violet" style={{ width: `${d.value}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SponsorshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Sponsors and exhibitors"
        title="Sponsorship opportunities"
        description="Put your organisation in front of an international audience of researchers, clinicians, engineers and decision-makers."
        crumbs={[{ label: "Sponsorship" }]}
        image="/images/stage.jpg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#packages" variant="light" size="lg">
            View packages
          </Button>
          <Button href="#sponsor-enquiry" variant="outline-light" size="lg">
            Enquire now
            <ArrowDown aria-hidden />
          </Button>
        </div>
      </PageHero>

      {/* Why sponsor */}
      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Why sponsor"
                title="Meet the people who buy, fund and build"
                description="Our conferences attract active researchers and the people who fund, buy and build with their work."
              />
              <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
                {audienceStats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse rounded-2xl border border-border bg-card p-5 shadow-card">
                    <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
                    <dd className="font-display text-2xl font-extrabold tracking-tight text-navy min-[400px]:text-3xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
                <Image
                  src="/images/hall.jpg"
                  alt="Exhibition hall with delegates visiting sponsor stands"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {reasons.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-28 bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            title="Sponsorship packages"
            highlight="packages"
            description="Prices are per conference. Every package can be tailored to a single event or the full annual programme."
          />
          <Reveal>
            <ul className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
              {sponsorshipPackages.map((p) => (
                <li
                  key={p.tier}
                  className={cn(
                    "relative isolate flex flex-col overflow-hidden rounded-2xl p-6 sm:p-7",
                    p.highlight ? "bg-navy-deep text-white shadow-lift ring-1 ring-blue/40" : "border border-border bg-card shadow-card",
                  )}
                >
                  {p.highlight && (
                    <>
                      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
                      <div aria-hidden className="absolute -right-20 -top-20 -z-10 size-56 rounded-full bg-blue/30 blur-[120px]" />
                    </>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <h3 className={cn("font-display text-xl font-bold", p.highlight ? "text-white" : "text-navy")}>{p.tier}</h3>
                    {p.highlight && (
                      <span className="rounded-full bg-blue px-2.5 py-1 text-xs font-semibold text-white">Most popular</span>
                    )}
                  </div>
                  <p className={cn("mt-5 font-display text-4xl font-extrabold tracking-tight", p.highlight ? "text-white" : "text-navy")}>
                    {p.price}
                  </p>
                  <p className={cn("mt-1 text-sm", p.highlight ? "text-white/70" : "text-muted-foreground")}>per conference</p>
                  <ul className={cn("mt-6 flex-1 space-y-3 border-t pt-6 text-sm", p.highlight ? "border-white/15" : "border-border")}>
                    {p.benefits.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span
                          className={cn(
                            "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                            p.highlight ? "bg-blue text-white" : "bg-blue/10 text-blue",
                          )}
                        >
                          <Check className="size-3" strokeWidth={3} aria-hidden />
                        </span>
                        <span className={p.highlight ? "text-white/90" : "text-navy/85"}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="#sponsor-enquiry" variant={p.highlight ? "accent" : "outline"} className="mt-8 w-full">
                    Enquire about {p.tier}
                  </Button>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Add-ons */}
      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                title="Add-on opportunities"
                size="sm"
                description="Stand out with a targeted branding opportunity, on its own or alongside a package. Availability is limited at each event."
              />
            </div>
          </div>
          <Reveal className="lg:col-span-8">
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {addOns.map(({ icon: Icon, title, price }) => (
                <li key={title} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card sm:p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-navy">{title}</span>
                  <span className="rounded-full bg-surface px-3 py-1 text-sm font-semibold tabular-nums text-navy ring-1 ring-inset ring-border">
                    {price}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Audience breakdown */}
      <section className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Audience"
            title="Who you will meet"
            description="Typical delegate profile across our 2026 programme of in-person and hybrid events."
          />
          <Reveal>
            <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-2">
              <Bars title="By sector" data={bySector} />
              <Bars title="By region" data={byRegion} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="relative isolate overflow-hidden bg-navy-deep py-16 text-white sm:py-20 lg:py-28">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div aria-hidden className="absolute -left-32 top-0 -z-10 size-[28rem] rounded-full bg-blue/30 blur-[120px]" />
        <Container>
          <SectionHeading tone="dark" align="center" title="What our sponsors say" />
          <ul className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-2">
            {sponsorQuotes.map((q) => (
              <li key={q.name}>
                <figure className="flex h-full flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-inset ring-white/10 backdrop-blur sm:p-8">
                  <Quote className="size-7 text-blue-light" aria-hidden />
                  <blockquote className="mt-5 flex-1 text-pretty font-display text-lg font-semibold leading-relaxed sm:text-xl">
                    {q.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-sm">
                    <Monogram name={q.name} className="size-11 shrink-0 rounded-full [&_span]:text-sm" />
                    <span>
                      <span className="block font-semibold">{q.name}</span>
                      <span className="text-white/70">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Enquiry form */}
      <section id="sponsor-enquiry" aria-labelledby="sponsor-form-heading" className="scroll-mt-28 bg-background py-16 sm:py-20 lg:py-28">
        <Container className="max-w-5xl 2xl:max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="sponsor-form-heading" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-4xl">
              Request the sponsorship prospectus
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Share a few details and our partnerships team will send the full prospectus and availability for your
              preferred event.
            </p>
          </div>
          <div className="mt-12 rounded-3xl border border-border bg-card p-5 shadow-card sm:p-8 lg:p-10">
            <DemoForm submitLabel="Send enquiry" successTitle="Sponsorship enquiry received">
              <FormSection title="Your details">
                <FieldGrid>
                  <TextField label="Company" name="company" required autoComplete="organization" />
                  <TextField label="Contact name" name="name" required autoComplete="name" />
                  <TextField label="Email" name="email" type="email" required autoComplete="email" />
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
                </FieldGrid>
              </FormSection>
              <FormSection title="Your interest">
                <FieldGrid>
                  <RadioCards
                    name="package"
                    label="Preferred package"
                    required
                    options={sponsorshipPackages.map((p) => ({ value: p.tier, title: p.tier, description: p.price }))}
                  />
                  <SelectField
                    label="Conference"
                    name="conference"
                    options={["All conferences (annual programme)", ...conferences.map((c) => c.shortTitle)]}
                    required
                    full
                  />
                  <TextAreaField label="Message" name="message" full placeholder="Objectives, add-ons of interest or questions." />
                  <CheckboxField name="consent" required label="I agree to be contacted about sponsorship opportunities." />
                </FieldGrid>
              </FormSection>
            </DemoForm>
          </div>
        </Container>
      </section>
    </>
  );
}
