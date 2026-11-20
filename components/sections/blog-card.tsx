import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { formatDate, type BlogPost } from "@/lib/blog-data";

/** Post card used on the home page section and on /blog. */
export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-border bg-card shadow-[var(--shadow-subtle)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-hover)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-card/95 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-xs text-muted-foreground">
          {formatDate(post.date)} · {post.readTime}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary">
          Read more
          <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
