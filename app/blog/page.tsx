import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import PageShell from "@/components/layout/page-shell";
import BlogCard from "@/components/sections/blog-card";
import { formatDate } from "@/lib/data/blog";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog | Atlas Global 2026",
  description: "Event news, speaker insights and practical tips from the Atlas Global team.",
};

export default async function BlogPage() {
  const [featured, ...rest] = (await getContent()).posts;

  return (
    <PageShell>
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-tertiary-ink">Blog</span>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              News &amp; <span className="text-primary">insights</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Event news, speaker insights and practical tips for getting the most out of Atlas Global.
            </p>
          </div>

          {/* Featured (latest) post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group mx-auto mt-12 grid max-w-6xl overflow-hidden border border-border bg-card shadow-[var(--shadow-subtle)] transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-hover)] lg:grid-cols-2 rounded-2xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[22rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="w-fit bg-primary px-2.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-widest text-primary-foreground">
                Latest · {featured.category}
              </span>
              <h2 className="mt-5 text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-tertiary-strong sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{featured.excerpt}</p>
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                {featured.author.name} · {formatDate(featured.date)} · {featured.readTime}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-tertiary-strong">
                Read the post
                <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
