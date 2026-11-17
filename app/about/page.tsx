import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import PageShell, { PageHero } from "@/components/sections/page-shell";
import { ABOUT } from "@/lib/pages-data";
import { VENUE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | Atlas Global 2026",
  description: "Why we run Atlas Global, what we stand for and how the programme is built.",
};

export default function AboutPage() {
  const { hero, story, values, process, cta } = ABOUT;
  return (
    <PageShell>
      <PageHero {...hero} />

      {/* Story */}
      <section className="w-full pb-12 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {story.title}
              </h2>
              <div className="mt-6 space-y-4">
                {story.paragraphs.map((p) => (
                  <p key={p} className="font-mono text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              <dl className="mt-8 grid grid-cols-3 border border-border bg-card">
                {VENUE.stats.map((s, i) => (
                  <div key={s.label} className={`px-3 py-5 text-center ${i > 0 ? "border-l border-border" : ""}`}>
                    <dt className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{s.value}</dt>
                    <dd className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted shadow-[var(--shadow-subtle)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={story.image} alt="Atlas Global audience" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values (dark band) */}
      <section className="relative w-full overflow-hidden bg-foreground py-14 text-white md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 0%, rgba(37,99,235,0.35), transparent 70%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          }}
        />
        <div className="container relative mx-auto px-4">
          <h2 className="mx-auto max-w-3xl text-center font-mono text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
            What we stand for
          </h2>
          <div className="mx-auto mt-10 grid max-w-6xl gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="bg-foreground p-6 transition-colors hover:bg-white/[0.04] sm:p-7">
                <span className="font-mono text-sm font-bold text-[#93b4ff]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-mono text-lg font-bold leading-snug">{v.title}</h3>
                <p className="mt-2 font-mono text-sm leading-relaxed text-white/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mx-auto max-w-3xl text-center font-mono text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {process.title}
          </h2>
          <ol className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {process.steps.map((s, i) => (
              <li key={s.label} className="border border-border bg-card p-6 shadow-[var(--shadow-subtle)]">
                <span className="font-mono text-3xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-mono text-lg font-bold text-foreground">{s.label}</h3>
                <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full pb-14 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto max-w-5xl overflow-hidden bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
            <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">{cta.title}</h2>
            <p className="mx-auto mt-3 max-w-xl font-mono text-base text-primary-foreground/85">{cta.text}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={cta.primary.href}
                className="inline-flex items-center gap-2 bg-white px-6 py-3.5 font-mono text-sm font-medium text-foreground transition-colors hover:bg-white/90"
              >
                {cta.primary.label}
                <ArrowRightIcon weight="bold" size={16} />
              </Link>
              <Link
                href={cta.secondary.href}
                className="inline-flex items-center gap-2 border-2 border-white/60 px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {cta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
