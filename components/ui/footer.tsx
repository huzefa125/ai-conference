"use client";

import * as React from "react";
import { FOOTER } from "@/lib/site-data";

export default function Footer({ id = "contact" }: { id?: string }) {
  return (
    <footer id={id} className="mt-16 bg-[var(--atlas-navy)] text-[var(--atlas-cream)]">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-lg font-bold">{FOOTER.brand}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
              {FOOTER.blurb}
            </p>
            {FOOTER.email && (
              <a
                href={`mailto:${FOOTER.email}`}
                className="mt-4 inline-block text-sm text-white underline-offset-4 hover:underline"
              >
                {FOOTER.email}
              </a>
            )}
          </div>

          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-white/50">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 font-mono text-xs text-white/50">
          © 2026 {FOOTER.brand}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
