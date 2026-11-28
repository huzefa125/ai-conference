"use client";

import * as React from "react";

export type DitheredFooterProps = {
  id?: string;
  brand?: string;
  /** Text knocked out of the dots. Defaults to brand. */
  wordmark?: string;
  brandHref?: string;
  tagline?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
  socials?: { label: string; href: string; icon: React.ReactNode }[];
  legal?: { label: string; href: string }[];
  copyright?: string;
  status?: { label: string; href: string } | null;
  accent?: string;
  /** Logo shown above the brand name. */
  logoSrc?: string;
  /** Button under the tagline, e.g. contact. */
  cta?: { label: string; href: string };
};

const DITHER_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='360' height='240'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0.04' stop-color='#000'/><stop offset='0.96' stop-color='#fff'/></linearGradient><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='2' seed='7' stitchTiles='stitch' result='n'/><feColorMatrix in='n' type='matrix' values='1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1' result='ng'/><feComposite in='SourceGraphic' in2='ng' operator='arithmetic' k2='0.5' k3='0.5' result='s'/><feComponentTransfer in='s' result='t'><feFuncR type='discrete' tableValues='0 1'/></feComponentTransfer><feColorMatrix in='t' type='matrix' values='0 0 0 0 1 0 0 0 0 0.5 0 0 0 0 0 1 0 0 0 0'/></filter></defs><rect width='100%' height='100%' fill='url(#g)' filter='url(#f)'/></svg>";
const DITHER = `url("data:image/svg+xml,${encodeURIComponent(DITHER_SVG)}")`;
const DOT = "radial-gradient(circle, #000 0.9px, transparent 1.3px)";

const CSS = `
.df-field { position: absolute; inset: 0; }
@property --df-sweep-x { syntax: "<percentage>"; inherits: false; initial-value: -15%; }
.df-field.df-auto {
  -webkit-mask-image: radial-gradient(ellipse 420px 100% at var(--df-sweep-x) 50%, #000 40%, rgb(0 0 0 / .25) 100%);
  mask-image: radial-gradient(ellipse 420px 100% at var(--df-sweep-x) 50%, #000 40%, rgb(0 0 0 / .25) 100%);
  animation: df-sweep 6s ease-in-out infinite;
}
.df-field.df-lit {
  animation-play-state: paused;
  -webkit-mask-image: radial-gradient(circle 190px at var(--df-x, 50%) var(--df-y, 50%), #000 35%, rgb(0 0 0 / .22) 100%);
  mask-image: radial-gradient(circle 190px at var(--df-x, 50%) var(--df-y, 50%), #000 35%, rgb(0 0 0 / .22) 100%);
}
.df-dots {
  position: absolute; top: 0; bottom: 0; left: 0;
  width: calc(100% + 360px);
  background: var(--df-accent);
  -webkit-mask-image: ${DOT}, ${DITHER};
  mask-image: ${DOT}, ${DITHER};
  -webkit-mask-size: 4px 4px, 360px 240px;
  mask-size: 4px 4px, 360px 240px;
  -webkit-mask-repeat: repeat, repeat-x;
  mask-repeat: repeat, repeat-x;
  -webkit-mask-position: 0 0, left bottom;
  mask-position: 0 0, left bottom;
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
@media (prefers-reduced-motion: no-preference) {
  .df-dots { animation: df-drift 40s linear infinite; }
  @supports (animation-timeline: view()) {
    .df-band { view-timeline: --df-band; }
    .df-mark { animation: df-rise linear both; animation-timeline: --df-band; animation-range: entry 20% entry 100%; }
  }
}
@keyframes df-drift { to { translate: -360px 0; } }
@keyframes df-rise { from { translate: 0 30%; } }
@keyframes df-sweep { 0%, 100% { --df-sweep-x: -15%; } 50% { --df-sweep-x: 115%; } }
@media (prefers-reduced-motion: reduce) {
  .df-field.df-auto { animation: none; -webkit-mask-image: none; mask-image: none; }
}
`;

export default function DitheredFooter({
  id,
  brand = "Brand",
  wordmark,
  brandHref = "/",
  tagline,
  columns = [],
  socials = [],
  legal = [],
  copyright,
  status = null,
  accent = "var(--primary)",
  logoSrc,
  cta,
}: DitheredFooterProps) {
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = fieldRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--df-x", `${clientX - r.left}px`);
      el.style.setProperty("--df-y", `${clientY - r.top}px`);
      el.classList.add("df-lit");
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    fieldRef.current?.classList.remove("df-lit");
  };
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer
      id={id}
      className="overflow-hidden border-t border-border bg-background text-foreground"
      style={{ ["--df-accent" as string]: accent }}
    >
      <style>{CSS}</style>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-6 pb-16 pt-16 sm:gap-x-10 sm:px-8 md:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        {/* Brand block: logo, name, tagline and a contact button */}
        <div className="col-span-2 md:col-span-1">
          <a href={brandHref} className="inline-flex flex-col gap-3">
            {logoSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoSrc} alt="" className="h-14 w-auto self-start object-contain" />
            )}
            <span className="font-heading text-xl font-extrabold tracking-tight">{brand}</span>
          </a>
          {tagline && <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{tagline}</p>}
          {cta && (
            <a
              href={cta.href}
              className="mt-5 inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {cta.label}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
          )}
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="min-w-0 last:col-span-2 md:last:col-span-1">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">{col.title}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="break-words text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div aria-hidden className="df-band relative h-60 overflow-hidden" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div ref={fieldRef} className="df-field df-auto">
          <div className="df-dots" />
        </div>
        <p className="df-mark pointer-events-none absolute -bottom-[0.05em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-center text-[clamp(5rem,30vw,10rem)] sm:text-[clamp(3.5rem,15vw,10rem)] font-bold leading-[0.8] tracking-[-0.06em] text-background">
          {wordmark ?? brand}
        </p>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {copyright && <span>{copyright}</span>}
            {legal.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-foreground">{l.label}</a>
            ))}
            {status && (
              <a href={status.href} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
                {status.label}
              </a>
            )}
          </div>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-md hover:bg-foreground/5">
                {s.icon}
              </a>
            ))}
            {socials.length > 0 && <span aria-hidden className="mx-2 h-5 w-px bg-border" />}
            <button type="button" onClick={toTop} className="inline-flex items-center gap-2 rounded-md px-2 py-2 transition-colors hover:text-foreground">
              Back to top
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 19V5m-6 6 6-6 6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
