import { site } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Mail, UserRound } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPost, posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [post.image] },
  };
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
    </svg>
  );
}

export default async function ArticlePage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/news/${post.slug}`;
  const shareUrl = encodeURIComponent(`${site.url}${path}`);
  const shareTitle = encodeURIComponent(post.title);
  const shareLinks = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: LinkedInIcon, external: true },
    { label: "X", href: `https://x.com/intent/post?url=${shareUrl}&text=${shareTitle}`, icon: XIcon, external: true },
    { label: "Email", href: `mailto:?subject=${shareTitle}&body=${shareUrl}`, icon: Mail, external: false },
  ];

  const related = [
    ...posts.filter((p) => p.slug !== post.slug && p.tag === post.tag),
    ...posts.filter((p) => p.slug !== post.slug && p.tag !== post.tag),
  ].slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.tag}
        title={post.title}
        crumbs={[{ label: "News", href: "/news" }, { label: post.title }]}
        image={post.image}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          <li className="flex items-center gap-2">
            <UserRound className="size-4 text-blue-light" aria-hidden />
            <span className="sr-only">Author: </span>
            {post.author}
          </li>
          <li className="flex items-center gap-2">
            <Calendar className="size-4 text-blue-light" aria-hidden />
            <span className="sr-only">Published: </span>
            {post.date}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-blue-light" aria-hidden />
            {post.readTime}
          </li>
        </ul>
      </PageHero>

      <article className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-28">
        <Container>
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl bg-navy shadow-card">
            <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>

          <div className="mx-auto mt-12 max-w-prose sm:mt-16">
            <p className="text-pretty font-display text-xl font-semibold leading-relaxed tracking-tight text-navy sm:text-2xl">
              {post.excerpt}
            </p>

            <div className="mt-10">
              {post.body.map((block, i) =>
                block.startsWith("## ") ? (
                  <h2 key={i} className="mt-12 font-display text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem]">
                    {block.slice(3)}
                  </h2>
                ) : (
                  <p key={i} className="mt-6 text-[17px] leading-[1.8] text-navy/80 sm:text-lg">
                    {block}
                  </p>
                ),
              )}
            </div>

            <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display font-bold text-navy">Share this article</p>
                <p className="mt-1 text-sm text-muted-foreground">Know a colleague who would find it useful?</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {shareLinks.map(({ label, href, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={external ? `Share on ${label} (opens in a new tab)` : "Share by email (opens your email app)"}
                      className="flex size-11 items-center justify-center rounded-full border border-border bg-white text-navy transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-blue/40 hover:text-blue"
                    >
                      <Icon className="size-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Button href="/news" variant="outline" className="mt-8">
              <ArrowLeft aria-hidden />
              Back to all news
            </Button>
          </div>
        </Container>
      </article>

      <section aria-label="Related articles" className="bg-surface py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Keep reading" title="Related articles" size="sm" />
          <ul className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
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
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
