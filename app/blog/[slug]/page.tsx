import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import PageShell from "@/components/sections/page-shell";
import BlogCard from "@/components/sections/blog-card";
import { BLOG_POSTS, POSTS_BY_DATE, getPost, formatDate } from "@/lib/blog-data";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found | Atlas Global 2026" };
  return { title: `${post.title} | Atlas Global 2026`, description: post.excerpt };
}

// The shell (navbar + footer) renders immediately; only the post body waits for the URL slug.
export default function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <PageShell>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent params={props.params} />
      </Suspense>
    </PageShell>
  );
}

function PostSkeleton() {
  return (
    <div className="container mx-auto px-4 py-14">
      <div className="mx-auto max-w-3xl animate-pulse space-y-4">
        <div className="h-4 w-24 bg-secondary" />
        <div className="h-10 w-full bg-secondary" />
        <div className="h-10 w-2/3 bg-secondary" />
        <div className="mt-8 aspect-[16/8] w-full bg-secondary" />
      </div>
    </div>
  );
}

async function PostContent({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = POSTS_BY_DATE.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="w-full py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeftIcon size={14} className="transition-transform group-hover:-translate-x-0.5" />
              All posts
            </Link>
            <span className="mt-8 block font-mono text-xs font-semibold uppercase tracking-widest text-primary">{post.category}</span>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">{post.title}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-border py-4 text-sm">
              <span className="font-semibold text-foreground">{post.author.name}</span>
              <span className="text-muted-foreground">{post.author.role}</span>
              <span aria-hidden className="text-border">|</span>
              <span className="text-muted-foreground">{formatDate(post.date)}</span>
              <span className="text-muted-foreground">· {post.readTime}</span>
            </div>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/8] max-w-5xl overflow-hidden border border-border bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            {post.body.map((para) => (
              <p key={para.slice(0, 40)} className="text-base leading-8 text-foreground/85">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      <section className="w-full border-t border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mx-auto max-w-6xl text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">More posts</h2>
          <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
