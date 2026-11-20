import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import PageShell from "@/components/sections/page-shell";

export const metadata: Metadata = {
  title: "Page not found | Atlas Global 2026",
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="w-full py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Error 404</span>
            <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">Page not found</h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The page you are looking for does not exist or has moved.
            </p>
            <Link
              href="/"
              className="group mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ArrowLeftIcon size={14} className="transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
