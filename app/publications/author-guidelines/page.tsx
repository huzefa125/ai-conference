import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Author Guidelines",
  description: "How to prepare, format and submit a manuscript to our journals and conference proceedings.",
};

const sections: { id: string; title: string; paragraphs: string[]; list?: string[] }[] = [
  {
    id: "manuscript-preparation",
    title: "Manuscript preparation",
    paragraphs: [
      "Manuscripts should report original work that has not been published or submitted elsewhere. Extended versions of conference papers are welcome if they add substantial new material.",
      "Prepare your submission in English using the journal template. Include a title page with all author names, affiliations and a corresponding author email address.",
    ],
    list: [
      "Title of no more than 20 words",
      "Structured abstract of 200 to 250 words",
      "Four to six keywords",
      "Main text, typically 4,000 to 8,000 words",
    ],
  },
  {
    id: "formatting",
    title: "Formatting",
    paragraphs: [
      "Use a single-column layout, 11-point type and 1.5 line spacing. Number all pages and use numbered section headings up to three levels deep.",
      "Define abbreviations at first use and use SI units throughout. Equations should be editable, not inserted as images.",
    ],
  },
  {
    id: "references",
    title: "References",
    paragraphs: [
      "Cite references in the text with sequential numbers in square brackets and list them in order of appearance at the end of the manuscript.",
      "Include a persistent identifier for every reference where one exists. Personal communications and unpublished data should be cited in the text only.",
    ],
  },
  {
    id: "figures-tables",
    title: "Figures & tables",
    paragraphs: [
      "Supply figures as separate high-resolution files (at least 300 dpi) and cite each one in the text. Every figure needs a concise caption that explains it without reference to the main text.",
      "Tables should be editable, numbered consecutively and placed close to where they are first cited. Avoid shading and vertical rules.",
    ],
  },
  {
    id: "ethics-plagiarism",
    title: "Ethics & plagiarism",
    paragraphs: [
      "Authors must disclose funding sources and any competing interests. Research involving human participants or animals must state the approving ethics committee.",
      "All submissions are screened for similarity. Manuscripts with substantial overlap with published work, including the authors' own, may be rejected without review.",
    ],
  },
  {
    id: "peer-review",
    title: "Peer review",
    paragraphs: [
      "Submissions that pass an initial editorial check are sent to at least two independent reviewers under a single-blind process.",
      "Authors normally receive a first decision within six to eight weeks. Revised manuscripts should be returned with a point-by-point response to reviewer comments.",
    ],
  },
  {
    id: "copyright-licensing",
    title: "Copyright & licensing",
    paragraphs: [
      "Authors retain copyright of their work. Open-access articles are published under a Creative Commons licence that permits reuse with attribution.",
      "For hybrid journals, authors may choose between open-access publication and a standard licence to publish.",
    ],
  },
  {
    id: "apc",
    title: "Article processing charges",
    paragraphs: [
      "Open-access articles carry an article processing charge (APC) payable after acceptance. There is no charge for submission or review.",
      "Waivers and discounts may be available for authors from eligible countries and for registered conference presenters. Contact the publications team for details.",
    ],
  },
];

export default function AuthorGuidelinesPage() {
  return (
    <>
      <PageHero
        title="Author Guidelines"
        description="Everything you need to prepare, format and submit a manuscript to our journals and conference proceedings."
        crumbs={[{ label: "Publications", href: "/publications" }, { label: "Author Guidelines" }]}
        image="/images/lab.jpg"
      >
        <Button href="#" variant="light" size="lg">
          <Download aria-hidden />
          Download template
        </Button>
      </PageHero>

      <section className="bg-background py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4 xl:col-span-3">
            <nav aria-label="On this page" className="rounded-2xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-28">
              <p className="px-3 text-xs font-semibold text-blue">On this page</p>
              <ol className="mt-3 space-y-0.5 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-navy/80 transition-colors hover:bg-accent hover:text-navy focus-visible:bg-accent"
                    >
                      <span className="w-5 shrink-0 tabular-nums text-muted-foreground">{i + 1}.</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <Button href="#" variant="outline" size="sm" className="mt-5 w-full">
                <Download aria-hidden />
                Download template
              </Button>
            </nav>
          </aside>

          <div className="min-w-0 lg:col-span-8 xl:col-span-9">
            <div className="max-w-prose space-y-6">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-heading`}
                  className="scroll-mt-28 rounded-2xl border border-border bg-card p-7 shadow-card sm:p-9"
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue/10 font-display text-sm font-bold text-blue"
                    >
                      {i + 1}
                    </span>
                    <h2 id={`${s.id}-heading`} className="font-display text-2xl font-bold tracking-tight text-navy">
                      {s.title}
                    </h2>
                  </div>
                  {s.paragraphs.map((p) => (
                    <p key={p} className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-5 space-y-2 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                      {s.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-blue" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="relative isolate overflow-hidden rounded-3xl bg-navy-deep p-8 text-white sm:p-10">
                <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
                <div aria-hidden className="absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-blue/30 blur-[120px]" />
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight">Questions about your submission?</h2>
                    <p className="mt-2 text-white/70">The publications team replies within two working days.</p>
                  </div>
                  <Button href={`mailto:${site.email}`} variant="light" className="self-start sm:self-auto">
                    <Mail aria-hidden />
                    Email the team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
