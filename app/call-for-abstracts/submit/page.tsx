import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, HelpCircle } from "lucide-react";
import { conferences, getConference, type Conference } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import {
  CheckboxField, DemoForm, FieldGrid, FileField, FormSection, RadioCards, SelectField, TextAreaField, TextField,
} from "@/components/forms/demo-form";

export const metadata: Metadata = {
  title: "Submit an Abstract",
  description: "Submit your abstract for an oral, poster, virtual or workshop presentation at one of our international conferences.",
};

const countries = [
  "Australia", "Brazil", "Canada", "China", "France", "Germany", "India", "Italy", "Japan", "Nigeria", "Saudi Arabia", "Singapore",
  "South Africa", "South Korea", "Spain", "Sweden", "United Arab Emirates", "United Kingdom", "United States", "Other",
] as const;

const presentationTypes = [
  { value: "oral", title: "Oral", description: "15 min talk + Q&A" },
  { value: "poster", title: "Poster", description: "A0 portrait poster" },
  { value: "virtual", title: "Virtual", description: "Present remotely" },
  { value: "workshop", title: "Workshop", description: "60 to 90 min session" },
];

const checklist = [
  "Abstract of no more than 300 words",
  "Background, methods, results and conclusions",
  "All authors and affiliations listed",
  "Three to five keywords",
  "File in .doc, .docx or .pdf format",
  "Presenting author will register",
];

const sorted = [...conferences].sort((a, b) => a.startDate.localeCompare(b.startDate));

type SearchParams = PageProps<"/call-for-abstracts/submit">["searchParams"];

/** Reads ?conference= at request time (inside Suspense, see cacheComponents). */
async function SubmissionFromQuery({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.conference) ? sp.conference[0] : sp.conference;
  const selected = raw ? getConference(raw) : undefined;
  // key remounts the uncontrolled form so the preselected conference applies
  return <SubmissionSection key={selected?.id ?? "none"} selected={selected} />;
}

export default function SubmitAbstractPage(props: PageProps<"/call-for-abstracts/submit">) {
  return (
    <>
      <PageHero
        eyebrow="Call for abstracts"
        title="Submit an Abstract"
        description="Complete the form to submit your abstract for review by the scientific committee. You will receive an email decision after the review period."
        crumbs={[{ label: "Call for Abstracts", href: "/call-for-abstracts" }, { label: "Submit" }]}
        image="/images/lab.jpg"
      />
      <Suspense fallback={<SubmissionSection />}>
        <SubmissionFromQuery searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

function SubmissionSection({ selected }: { selected?: Conference }) {
  const topics = selected
    ? [...selected.topics, "Other"]
    : [...Array.from(new Set(conferences.flatMap((c) => c.topics))).sort((a, b) => a.localeCompare(b)), "Other"];
  const abstractDeadline = selected?.deadlines.find((d) => /abstract submission closes/i.test(d.label));

  return (
    <>
      <section aria-label="Abstract submission" className="bg-background py-14 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div className="border border-border bg-white p-5 sm:p-8">
            <p className="mb-8 text-sm text-muted-foreground">
              Fields marked <span className="text-blue">*</span> are required.
            </p>
            <DemoForm
              submitLabel="Submit abstract"
              successTitle="Abstract received (demo)"
              successMessage="This is a demo form, so nothing has been submitted. On the live site you would receive a confirmation email with your submission reference, and a decision after review."
            >
              <FormSection title="Author details" description="The corresponding author receives all correspondence about this submission.">
                <FieldGrid>
                  <TextField label="Full name" name="name" autoComplete="name" required />
                  <TextField label="Email" name="email" type="email" autoComplete="email" required />
                  <TextField label="Institution / organisation" name="institution" autoComplete="organization" required />
                  <SelectField label="Country" name="country" options={countries} placeholder="Select country" required />
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" hint="Include your country code" />
                </FieldGrid>
              </FormSection>

              <FormSection title="Co-authors">
                <FieldGrid>
                  <TextAreaField
                    label="Co-authors and affiliations"
                    name="coauthors"
                    rows={4}
                    placeholder={"One per line, e.g.\nB. Sample, Sample Research Institute, Country"}
                    hint="Leave blank if you are the only author."
                    full
                  />
                </FieldGrid>
              </FormSection>

              <FormSection title="Submission">
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
                  <SelectField
                    label="Track / topic"
                    name="track"
                    options={topics}
                    placeholder="Select the closest track"
                    hint={selected ? `Tracks for ${selected.shortTitle}` : "Tracks across all conferences"}
                    required
                    full
                  />
                  <RadioCards label="Presentation type" name="presentationType" options={presentationTypes} required />
                  <TextField label="Abstract title" name="abstractTitle" required full />
                  <TextAreaField
                    label="Abstract"
                    name="abstract"
                    rows={10}
                    maxLength={2500}
                    hint="Max 300 words. Background, methods, results and conclusions."
                    required
                    full
                  />
                  <TextField label="Keywords" name="keywords" placeholder="e.g. catalysis, nanomaterials, green chemistry" hint="Three to five, separated by commas" required full />
                </FieldGrid>
              </FormSection>

              <FormSection title="File upload" description="Upload the formatted abstract using the sample template structure.">
                <FieldGrid>
                  <FileField label="Abstract file" name="file" accept=".doc,.docx,.pdf" hint="Accepted formats: .doc, .docx, .pdf (max 5 MB)" full />
                </FieldGrid>
              </FormSection>

              <FieldGrid>
                <CheckboxField
                  name="consent"
                  required
                  label={
                    <>
                      I confirm that all authors have approved this submission, that the presenting author will register if it is accepted,
                      and I agree to the{" "}
                      <Link href="/terms" className="font-medium text-blue underline-offset-4 hover:underline">
                        terms and conditions
                      </Link>
                      .
                    </>
                  }
                />
              </FieldGrid>
            </DemoForm>
          </div>

          <aside aria-label="Submission guidelines" className="h-fit space-y-4 lg:sticky lg:top-24">
            {selected && (
              <div className="border border-blue/30 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">Submitting to</p>
                <p className="mt-2 font-display text-lg leading-snug text-navy">{selected.title}</p>
                <p className="mt-3 flex items-start gap-2 text-sm text-navy/85">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                  {selected.date}
                </p>
                {abstractDeadline && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Abstracts close <span className="font-semibold text-navy">{abstractDeadline.date}</span>
                  </p>
                )}
              </div>
            )}
            <div className="border border-border bg-white">
              <h2 className="border-b border-border px-6 py-4 font-display text-xl text-navy">Before you submit</h2>
              <ul className="space-y-3 px-6 py-5 text-sm text-navy/85">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-border px-6 py-4">
                <Link href="/call-for-abstracts" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline">
                  <ArrowLeft className="size-4" aria-hidden />
                  Full guidelines and template
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-navy p-6 text-sm text-white/85">
              <HelpCircle className="mt-0.5 size-5 shrink-0 text-blue-light" aria-hidden />
              <p>
                Questions about your submission?{" "}
                <Link href="/contact" className="font-semibold text-white underline underline-offset-4">
                  Contact the programme team
                </Link>
                .
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
