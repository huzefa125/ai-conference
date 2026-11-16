"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ALL = "All";

/** News listing: tag filter chips, featured first post, then a grid of image cards. */
export function NewsList({ posts }: { posts: Post[] }) {
  const tags = React.useMemo(() => [ALL, ...Array.from(new Set(posts.map((p) => p.tag)))], [posts]);
  const [active, setActive] = React.useState<string>(ALL);

  const filtered = active === ALL ? posts : posts.filter((p) => p.tag === active);
  const [featured, ...rest] = filtered;

  return (
    <div>
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
        {tags.map((t) => {
          const selected = t === active;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(t)}
              className={cn(
                "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-white text-navy hover:border-navy/40 hover:bg-accent",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"} shown
      </p>

      {featured && (
        <article className="group relative mt-10 grid overflow-hidden rounded-3xl border border-border bg-card shadow-card transition duration-300 hover:shadow-lift sm:mt-12 lg:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden bg-navy lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={featured.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="blue" size="sm">
                {featured.tag}
              </Badge>
              <span>{featured.date}</span>
            </div>
            <h2 className="mt-5 text-balance font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-navy transition-colors group-hover:text-blue sm:text-3xl lg:text-[2.25rem]">
              <Link href={`/news/${featured.slug}`} className="after:absolute after:inset-0">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{featured.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <p className="text-sm text-navy/75">
                {featured.author} <span aria-hidden>·</span> {featured.readTime}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue" aria-hidden>
                Read article
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <ul className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="soft" size="sm">
                      {p.tag}
                    </Badge>
                    <span>{p.date}</span>
                  </div>
                  <h3 className="mt-4 flex items-start justify-between gap-3 font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-blue">
                    <Link href={`/news/${p.slug}`} className="after:absolute after:inset-0">
                      {p.title}
                    </Link>
                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-blue opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-5 flex items-center gap-1.5 text-xs text-navy/70">
                    <Clock className="size-3.5" aria-hidden />
                    {p.readTime}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      {filtered.length === 0 && (
        <p className="mt-10 rounded-2xl bg-surface p-8 text-center text-muted-foreground">No articles in this category yet.</p>
      )}
    </div>
  );
}
