import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import {
  Award, BadgeCheck, BookOpen, CalendarDays, Check, Coffee, FileText, MapPin, Plane, RotateCcw, ShieldCheck, Users,
} from "lucide-react";
import { conferences, getConference, type Conference } from "@/lib/data";
import { registrationTiers } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/layout/page-hero";
import {
  CheckboxField, DemoForm, FieldGrid, FormSection, RadioCards, SelectField, TextField,
} from "@/components/forms/demo-form";

export const metadata: Metadata = {
  title: "Registration",
  description: "Registration fees, inclusions and policies, and the delegate registration form for our international conferences.",
};

const included = [
  { icon: BookOpen, title: "Full scientific programme", text: "Access to every keynote, plenary, parallel and poster session." },
  { icon: Coffee, title: "Catering", text: "Lunch and refreshment breaks on each in-person conference day." },
  { icon: FileText, title: "Conference kit", text: "Printed programme, abstract book and delegate badge." },
  { icon: Award, title: "Certificate", text: "Certificate of attendance, plus a presentation certificate for speakers." },
  { icon: Users, title: "Networking", text: "Welcome reception, topic lounges and the young researcher forum." },
  { icon: BadgeCheck, title: "Proceedings", text: "Access to the published proceedings for accepted contributions." },
];

const policies = [
  {
    icon: RotateCcw,
    title: "Cancellation",
    text: "Placeholder policy. Cancellations received in writing before the early bird deadline are refunded minus a sample administration fee. Later cancellations are not refundable, but registrations can be transferred to a colleague at no cost.",
  },
  {
    icon: Users,
    title: "Group discounts",
    text: "Placeholder policy. Institutions registering five or more delegates for the same conference receive a sample group discount. Contact the registration team for a single group invoice.",
  },
  {
    icon: Plane,
    title: "Visa invitation letters",
    text: "Placeholder policy. Registered delegates can request a visa invitation letter once payment is received. Allow several weeks for processing and apply early.",
  },
  {
    icon: ShieldCheck,
    title: "Payment and receipts",
    text: "Placeholder policy. Payment can be made by card or bank transfer. An official receipt and invoice are issued by email once payment is confirmed.",
  },
];

const titles = ["Dr.", "Prof.", "Mr.", "Ms.", "Mx."] as const;
const countries = [
  "Australia", "Brazil", "Canada", "China", "France", "Germany", "India", "Italy", "Japan", "Nigeria", "Saudi Arabia", "Singapore",
  "South Africa", "South Korea", "Spain", "Sweden", "United Arab Emirates", "United Kingdom", "United States", "Other",
] as const;
const dietary = ["No requirements", "Vegetarian", "Vegan", "Halal", "Kosher", "Gluten-free", "Other (please tell us by email)"] as const;

const sorted = [...conferences].sort((a, b) => a.startDate.localeCompare(b.startDate));
const featured = registrationTiers.find((t) => t.highlight) ?? registrationTiers[0];

type SearchParams = PageProps<"/registration">["searchParams"];

/** Reads ?conference= at request time (inside Suspense, see cacheComponents). */
async function RegistrationFromQuery({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.conference) ? sp.conference[0] : sp.conference;
  const selected = raw ? getConference(raw) : undefined;
  // key remounts the uncontrolled form so the preselected conference applies
  return <RegistrationSection key={selected?.id ?? "none"} selected={selected} />;
}

export default function RegistrationPage(props: PageProps<"/registration">) {
  return (
    <>
      <PageHero
        eyebrow="Registration"
        title="Register for a Conference"
        description="Choose your registration category, review what is included and complete the delegate form. Early bird rates apply until each conference's early deadline."
        crumbs={[{ label: "Registration" }]}
        image="/images/attend.jpg"
      />

      {/* Pricing */}
      <section aria-labelledby="pricing-title" className="bg-background py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 id="pricing-title" className="text-balance font-display text-3xl leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
              Registration categories
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sample fees in USD per delegate. Fees for individual conferences are also shown on each conference page.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {registrationTiers.map((tier, i) => (
              <li key={tier.name}>
                <Reveal delay={i * 0.05} className="h-full">
                  <article
                    className={cn(
                      "relative flex h-full flex-col border bg-white p-6 sm:p-7",
                      tier.highlight ? "border-navy shadow-[0_24px_48px_-28px_rgba(15,23,42,0.55)] ring-1 ring-navy" : "border-border",
                    )}
                  >
                    {tier.highlight && (
                      <span className="absolute -top-px right-6 bg-blue px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                        Most popular
                      </span>
                    )}
                    <h3 className="font-display text-2xl text-navy">{tier.name}</h3>
                    <dl className="mt-6 divide-y divide-border border-y border-border">
                      {[
                        { label: "Early bird", value: tier.early, strong: true },
                        { label: "Standard", value: tier.standard, strong: false },
                        { label: "On-site", value: tier.onsite, strong: false },
                      ].map((row) => (
                        <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{row.label}</dt>
                          <dd className={cn("tabular-nums text-navy", row.strong ? "font-display text-2xl text-blue" : "text-base font-medium")}>
                            {row.value === "—" ? (
                              <>
                                <span aria-hidden>—</span>
                                <span className="sr-only">Not available</span>
                              </>
                            ) : (
                              row.value
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="mt-6 flex-1 space-y-2.5 text-sm text-navy/85">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#register-form"
                      className={cn(
                        "mt-8 inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors",
                        tier.highlight ? "bg-navy text-white hover:bg-blue" : "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
                      )}
                    >
                      Register as {tier.name}
                    </a>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">Placeholder amounts. Replace with confirmed fees before publishing.</p>
        </Container>
      </section>

      {/* Included + policies */}
      <section aria-labelledby="included-title" className="bg-surface py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 id="included-title" className="text-balance font-display text-3xl leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
              What&rsquo;s included
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              In-person registration covers the following. Virtual registration includes live streams, recordings and an e-certificate.
            </p>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {included.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-white p-6 sm:p-7">
                <Icon className="size-6 text-blue" aria-hidden />
                <h3 className="mt-4 font-display text-lg text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-display text-2xl text-navy sm:text-3xl">Policies</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {policies.map(({ icon: Icon, title, text }) => (
              <article key={title} className="flex gap-4 border-l-2 border-navy bg-white p-6">
                <Icon className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden />
                <div>
                  <h3 className="font-display text-lg text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Full terms are set out on the{" "}
            <Link href="/terms" className="font-medium text-blue underline-offset-4 hover:underline">
              Terms and Conditions
            </Link>{" "}
            page.
          </p>
        </Container>
      </section>

      {/* Form */}
      <Suspense fallback={<RegistrationSection />}>
        <RegistrationFromQuery searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

function RegistrationSection({ selected }: { selected?: Conference }) {
  return (
    <section id="register-form" aria-label="Delegate registration" className="bg-background py-14 sm:py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
        <div>
          <SectionHeading
            title="Delegate registration"
            description="Complete the form below. Fields marked * are required."
            size="sm"
          />
          <div className="mt-10 border border-border bg-white p-5 sm:p-8">
            <DemoForm
              submitLabel="Complete registration"
              successTitle="Registration received (demo)"
              successMessage="This is a demo form, so nothing has been submitted. On the live site you would now be taken to secure payment and receive a confirmation email."
            >
              <FormSection title="Conference and category">
                <FieldGrid>
                  <SelectField
                    label="Conference"
                    name="conference"
                    options={sorted.map((c) => c.title)}
                    defaultValue={selected?.title}
                    placeholder="Select a conference"
                    required
                    full
                  />
                  <RadioCards
                    label="Attendee type"
                    name="attendeeType"
                    required
                    options={registrationTiers.map((t) => ({
                      value: t.name,
                      title: t.name,
                      description: `Early bird ${t.early}`,
                    }))}
                  />
                </FieldGrid>
              </FormSection>

              <FormSection title="Your details">
                <FieldGrid>
                  <SelectField label="Title" name="title" options={titles} placeholder="Select title" />
                  <div className="hidden sm:block" aria-hidden />
                  <TextField label="First name" name="firstName" autoComplete="given-name" required />
                  <TextField label="Last name" name="lastName" autoComplete="family-name" required />
                  <TextField label="Email" name="email" type="email" autoComplete="email" required />
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" hint="Include your country code" />
                  <TextField label="Institution / organisation" name="institution" autoComplete="organization" required />
                  <SelectField label="Country" name="country" options={countries} placeholder="Select country" required />
                  <SelectField label="Dietary requirements" name="dietary" options={dietary} placeholder="Select an option" full />
                </FieldGrid>
              </FormSection>

              <FieldGrid>
                <CheckboxField
                  name="terms"
                  required
                  label={
                    <>
                      I agree to the{" "}
                      <Link href="/terms" className="font-medium text-blue underline-offset-4 hover:underline">
                        terms and conditions
                      </Link>{" "}
                      and the cancellation policy above.
                    </>
                  }
                />
                <CheckboxField name="updates" label="Send me updates about future conferences (optional)." />
              </FieldGrid>
            </DemoForm>
          </div>
        </div>

        <aside aria-labelledby="summary-title" className="h-fit lg:sticky lg:top-24">
          <div className="border border-border bg-white">
            <h2 id="summary-title" className="border-b border-border px-6 py-4 font-display text-xl text-navy">
              Order summary
            </h2>
            <div className="px-6 py-5">
              {selected ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">{selected.discipline}</p>
                  <p className="mt-2 font-display text-lg leading-snug text-navy">{selected.title}</p>
                  <ul className="mt-4 space-y-2 text-sm text-navy/85">
                    <li className="flex items-start gap-2">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                      {selected.date}
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                      {selected.location} · {selected.mode}
                    </li>
                  </ul>
                  <Link href={`/conferences/${selected.id}`} className="mt-4 inline-block text-sm font-semibold text-blue hover:underline">
                    View conference details
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a conference in the form. You can also start from any{" "}
                  <Link href="/conferences" className="font-medium text-blue hover:underline">
                    conference page
                  </Link>
                  .
                </p>
              )}
            </div>
            <dl className="divide-y divide-border border-t border-border text-sm">
              <div className="flex justify-between gap-4 px-6 py-3">
                <dt className="text-muted-foreground">{featured.name} (early bird)</dt>
                <dd className="font-medium tabular-nums text-navy">{featured.early}</dd>
              </div>
              <div className="flex justify-between gap-4 px-6 py-3">
                <dt className="text-muted-foreground">Processing fee</dt>
                <dd className="font-medium tabular-nums text-navy">$00</dd>
              </div>
              <div className="flex justify-between gap-4 bg-surface px-6 py-4">
                <dt className="font-semibold text-navy">Estimated total</dt>
                <dd className="font-display text-xl tabular-nums text-navy">{featured.early}</dd>
              </div>
            </dl>
            <p className="border-t border-border px-6 py-4 text-xs leading-relaxed text-muted-foreground">
              Sample summary based on the {featured.name.toLowerCase()} category. The final amount depends on the category you choose
              and the date you pay.
            </p>
          </div>
          <div className="mt-4 flex items-start gap-3 border border-border bg-surface p-5 text-sm text-navy/85">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden />
            <p>Payments on the live site are processed securely. This demo does not collect payment details.</p>
          </div>
        </aside>
      </Container>
    </section>
  );
}
