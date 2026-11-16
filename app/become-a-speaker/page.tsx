import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  Award,
  BadgeCheck,
  BookOpen,
  Camera,
  FileSearch,
  FileText,
  Globe2,
  Hotel,
  Mail,
  Megaphone,
  Mic2,
  Presentation,
  Send,
  Star,
  Ticket,
  Users,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import {
  CheckboxField,
  DemoForm,
  FieldGrid,
  FileField,
  FormSection,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/demo-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { conferences } from "@/lib/data";

export const metadata: Metadata = {
  title: "Become a Speaker",
  description: "Apply to speak at an upcoming international conference: keynote, plenary, invited, oral, poster and workshop opportunities.",
};

const whySpeak = [
  { icon: Globe2, title: "An international stage", text: "Present to researchers and practitioners from over 90 countries." },
  { icon: Users, title: "New collaborators", text: "Meet the people working on the problems closest to yours." },
  { icon: BookOpen, title: "A lasting record", text: "Accepted talks can be considered for the published proceedings." },
  { icon: Award, title: "Recognition", text: "Eligibility for best paper, best poster and young researcher awards." },
];

const speakerTypes = [
  { icon: Star, title: "Keynote", text: "Invited leaders who open or close a conference with a 45-minute address." },
  { icon: Presentation, title: "Plenary", text: "Senior researchers presenting a field overview to the full audience." },
  { icon: Mic2, title: "Invited", text: "Experts invited by the scientific committee to lead a themed session." },
  { icon: Megaphone, title: "Oral presenter", text: "Selected from submitted abstracts for a 15 to 20-minute talk." },
  { icon: FileText, title: "Poster presenter", text: "Share results in the poster hall with dedicated discussion time." },
  { icon: Wrench, title: "Workshop host", text: "Run a hands-on session teaching a method, tool or technique." },
];

const steps = [
  { icon: Send, title: "Submit your application", text: "Complete the form below with your profile, proposed talk and abstract." },
  { icon: FileSearch, title: "Committee review", text: "The scientific committee reviews relevance, originality and clarity." },
  { icon: Mail, title: "Decision and feedback", text: "You receive a decision, usually within three to four weeks." },
  { icon: BadgeCheck, title: "Confirm and prepare", text: "Register, confirm your slot and receive presenter guidelines." },
];

const benefits = [
  { icon: Ticket, text: "Complimentary or discounted registration (by speaker type)" },
  { icon: Hotel, text: "Accommodation support for keynote and plenary speakers" },
  { icon: Camera, text: "Professional session recording and photography" },
  { icon: Megaphone, text: "Profile on the conference website and social channels" },
  { icon: BadgeCheck, text: "Certificate of presentation" },
  { icon: BookOpen, text: "Consideration for proceedings and partner journals" },
];

const sessionTypes = ["Keynote", "Plenary", "Invited talk", "Oral presentation", "Poster presentation", "Workshop"];

export default function BecomeASpeakerPage() {
  return (
    <>
      <PageHero
        eyebrow="Call for speakers"
        title="Become a Speaker"
        description="Share your research with an international audience. We welcome applications from established and early-career researchers alike."
        crumbs={[{ label: "Speakers", href: "/speakers" }, { label: "Become a Speaker" }]}
        image="/images/keynote.jpg"
      >
        <Button href="#apply" variant="light" size="lg">
          Apply to speak
          <ArrowDown aria-hidden />
        </Button>
      </PageHero>

      {/* Why speak */}
      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card max-lg:aspect-[16/10]">
              <Image
                src="/images/lecture.jpg"
                alt="Researcher presenting to a full lecture theatre"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <SectionHeading
              eyebrow="Why speak"
              title="Put your work in front of the right people"
              highlight="the right people"
              description="Speaking at one of our conferences puts your research in front of the people best placed to challenge, use and build on it."
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {whySpeak.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Speaker types */}
      <section className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            title="Ways to take part"
            description="Choose the format that best suits your work. Keynote and plenary slots are usually by invitation."
          />
          <Reveal>
            <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {speakerTypes.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {i < 2 && (
                      <Badge variant="soft" size="sm">
                        By invitation
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Selection process */}
      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Selection process" title="From application to the stage" description="Four steps, usually completed within a month." />
          <Reveal>
            <ol className="relative mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              <span aria-hidden className="absolute left-12 right-12 top-[3.25rem] hidden h-0.5 rounded-full bg-gradient-to-r from-blue via-violet to-cyan opacity-40 lg:block" />
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
                  <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-navy text-white ring-4 ring-background">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-5 text-xs font-semibold text-blue">Step {i + 1}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Benefits */}
      <section aria-labelledby="speaker-benefits" className="bg-background pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
            <div aria-hidden className="absolute -right-24 -top-32 -z-10 size-96 rounded-full bg-blue/30 blur-[120px]" />
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold text-blue-light">For our speakers</p>
                <h2 id="speaker-benefits" className="mt-3 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Speaker benefits
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Exact benefits depend on your speaker type and the event. Your confirmation letter lists everything
                  included.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
                {benefits.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-light">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="pt-2 text-[15px] leading-relaxed text-white/90">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-28 bg-surface py-16 sm:py-20 lg:py-28">
        <Container className="max-w-5xl 2xl:max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="apply-heading" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-4xl lg:text-5xl">
              Apply to speak
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Fields marked with an asterisk are required. You can update your abstract later if your application is
              accepted.
            </p>
          </div>
          <div className="mt-12 rounded-3xl border border-border bg-card p-5 shadow-card sm:p-8 lg:p-10">
            <DemoForm submitLabel="Submit application" successTitle="Application received">
              <FormSection title="Personal details">
                <FieldGrid>
                  <TextField label="First name" name="first-name" required autoComplete="given-name" />
                  <TextField label="Last name" name="last-name" required autoComplete="family-name" />
                  <TextField label="Email" name="email" type="email" required autoComplete="email" />
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
                  <TextField label="Job title" name="job-title" placeholder="e.g. Associate Professor" />
                  <TextField label="Institution" name="institution" required autoComplete="organization" />
                  <TextField label="Country" name="country" required autoComplete="country-name" />
                  <TextField
                    label="LinkedIn or website URL"
                    name="url"
                    type="url"
                    placeholder="https://"
                    autoComplete="url"
                  />
                  <TextAreaField
                    label="Short biography"
                    name="bio"
                    required
                    full
                    rows={4}
                    maxLength={1200}
                    hint="Up to 150 words, written in the third person."
                  />
                </FieldGrid>
              </FormSection>
              <FormSection title="Proposed talk">
                <FieldGrid>
                  <TextField label="Proposed talk title" name="talk-title" required full />
                  <SelectField label="Preferred conference" name="conference" options={conferences.map((c) => c.shortTitle)} required />
                  <SelectField label="Session type" name="session-type" options={sessionTypes} required />
                  <TextAreaField
                    label="Abstract"
                    name="abstract"
                    required
                    full
                    rows={7}
                    maxLength={2500}
                    hint="Up to 300 words: background, methods, key findings and conclusions."
                  />
                  <FileField label="CV" name="cv" accept=".pdf,.doc,.docx" full hint="PDF or Word, up to 5 MB." />
                </FieldGrid>
              </FormSection>
              <FieldGrid>
                <CheckboxField
                  name="consent"
                  required
                  label="I confirm the information is accurate and agree to my details being shared with the scientific committee for review."
                />
              </FieldGrid>
            </DemoForm>
          </div>
        </Container>
      </section>
    </>
  );
}
