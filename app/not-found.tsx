import type { Metadata } from "next";
import { ArrowRight, Calendar, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[14rem] leading-none text-white/[0.04] sm:text-[22rem] lg:text-[30rem]"
      >
        404
      </div>
      <Container className="py-20 sm:py-28 lg:py-36">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-light">Error 404</p>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.25rem] leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-lg">
          The page may have moved, or the link may be out of date. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/" variant="light" size="lg">
            <Home aria-hidden />
            Back to Home
          </Button>
          <Button href="/conferences" variant="outline-light" size="lg">
            <Calendar aria-hidden />
            Browse Conferences
          </Button>
          <Button href="/contact" variant="outline-light" size="lg">
            <Mail aria-hidden />
            Contact Us
            <ArrowRight aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}
