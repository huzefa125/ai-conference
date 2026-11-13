"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/** Frontend-only: validates and shows a confirmation. No request is sent. */
export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "error" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setStatus(ok ? "done" : "error");
    if (ok) setEmail("");
  }

  return (
    <section id="contact" className="bg-accent py-14 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
            <span className="h-px w-8 bg-blue" aria-hidden />
            Newsletter
          </p>
          <h2 className="font-serif text-3xl leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
            Stay Connected With the Scientific Community
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Receive updates about upcoming conferences, research opportunities and important scientific developments.
          </p>
        </div>

        <div>
          {status === "done" ? (
            <div role="status" className="flex items-start gap-3 border border-blue/30 bg-white p-6 text-navy">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden />
              <p>Thank you. This is a demo form, so nothing has been submitted yet.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-navy">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="you@institution.edu"
                  autoComplete="email"
                  aria-invalid={status === "error"}
                  aria-describedby="newsletter-hint"
                  className="h-12 w-full rounded-sm border border-navy/25 bg-white px-4 text-navy placeholder:text-navy/45 focus:border-blue focus:outline-none"
                />
                <Button type="submit" size="lg" className="sm:shrink-0">
                  Subscribe
                </Button>
              </div>
              <p
                id="newsletter-hint"
                className={status === "error" ? "mt-3 text-sm text-red-700" : "mt-3 text-xs text-muted-foreground"}
              >
                {status === "error"
                  ? "Please enter a valid email address."
                  : "We respect your inbox. Unsubscribe at any time."}
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
