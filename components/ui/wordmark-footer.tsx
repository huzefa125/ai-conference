"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Wordmark footer: a short description, link columns that fold on phones, and the brand name set large,
 * fading into the background. Adapted to the site: the display font (--font-display), the cobalt/cyan
 * palette (status dot in cyan, not green), plus optional logo, contact button, socials and legal links.
 */

// At least 44 px tall wherever a finger taps it.
const tap = "max-md:inline-flex max-md:min-h-11 max-md:items-center pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center";
const display = "var(--font-display), var(--font-jakarta), ui-sans-serif, system-ui, sans-serif";

export type FooterColumn = { title: string; links: { label: string; href: string }[] };

export interface WordmarkFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** The brand name, top left. */
  name: string;
  /** The large word at the bottom (defaults to `name`). */
  wordmark?: string;
  /** The name in the © line. */
  legalName?: string;
  year: number;
  description?: string;
  email?: string;
  /** A short status line next to a cyan dot. */
  status?: string;
  navLabel?: string;
  columns: FooterColumn[];
  logoSrc?: string;
  cta?: { label: string; href: string };
  socials?: { label: string; href: string; icon: React.ReactNode }[];
  legal?: { label: string; href: string }[];
}

export function WordmarkFooter({
  name,
  wordmark,
  legalName,
  year,
  description,
  email,
  status,
  navLabel = "Footer",
  columns,
  logoSrc,
  cta,
  socials = [],
  legal = [],
  className,
  ...props
}: WordmarkFooterProps) {
  return (
    <footer className={cn("relative overflow-hidden border-t border-border bg-background text-foreground", className)} {...props}>
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 pb-10 pt-16 max-md:gap-6 max-md:pb-6 max-md:pt-12 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          {logoSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt="" className="mb-4 h-12 w-auto object-contain" />
          )}
          <span className="block text-[25px] font-bold leading-none tracking-[-0.02em]" style={{ fontFamily: display }}>
            {name}
          </span>
          {description && <p className="mt-4 max-w-[320px] text-[15px] leading-[24px] text-muted-foreground">{description}</p>}
          {status && (
            <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-muted-foreground">
              <span className="size-2 rounded-full bg-tertiary" aria-hidden="true" />
              {status}
            </p>
          )}
          {cta && (
            <a
              href={cta.href}
              className="mt-6 flex w-fit items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {cta.label}
              <span aria-hidden>→</span>
            </a>
          )}
        </div>

        <nav aria-label={navLabel} className="grid grid-cols-2 gap-8 max-md:hidden md:col-span-6 md:col-start-7 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-tertiary-ink">{col.title}</p>
              <ul className="mt-4 grid gap-2.5 pointer-coarse:mt-2 pointer-coarse:gap-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={cn("break-words text-[15px] text-muted-foreground transition-colors hover:text-primary", tap)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Phones: each column folds away; tap a heading to open it */}
        <nav aria-label={navLabel} className="-mx-4 grid gap-1 md:hidden">
          {columns.map((col) => (
            <details key={col.title} className="group rounded-2xl open:bg-foreground/[0.03]">
              <summary className="flex h-14 cursor-pointer list-none items-center justify-between px-4 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-tertiary-ink">{col.title}</span>
                <Plus
                  className="size-4 text-muted-foreground transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </summary>
              <ul className="px-4 pb-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="block break-words py-3 text-[15px] text-muted-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </div>

      {/* Bottom line: copyright, email, legal links, socials */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 border-t border-border px-6 py-5 text-[13px] text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 md:px-10">
        <p className="font-mono tabular-nums">
          © {year} {legalName ?? name}
        </p>
        {email && (
          <a href={`mailto:${email}`} className={cn("hover:text-primary", tap)}>
            {email}
          </a>
        )}
        {legal.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6">
            {legal.map((l) => (
              <a key={l.label} href={l.href} className={cn("hover:text-primary", tap)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
        {socials.length > 0 && (
          <div className="flex items-center gap-1 sm:ml-auto">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="grid size-10 place-items-center text-foreground transition-colors hover:text-primary">
                {s.icon}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* The wordmark, set large and fading into the background */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] select-none text-center text-[clamp(96px,22vw,340px)] font-black leading-[0.9] tracking-[-0.04em] text-transparent [-webkit-background-clip:text] [background-clip:text] [background-image:linear-gradient(to_bottom,color-mix(in_oklab,var(--color-primary)_34%,transparent),transparent_85%)] max-md:text-[28vw]"
        style={{ fontFamily: display }}
      >
        {wordmark ?? name}
      </p>
    </footer>
  );
}

export default WordmarkFooter;
