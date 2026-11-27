"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { CheckIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { type Ticket } from "@/lib/data/tickets";
import { useContent } from "@/components/providers/content-provider";
import { TICKET_SHAPES } from "@/components/ui/ticket-shapes";

export interface TicketsProps {
  id?: string;
  className?: string;
  tickets?: Ticket[];
  title?: string;
  subtitle?: string;
}

export default function Tickets({
  id = "tickets",
  className = "",
  tickets: ticketsProp,
  title = "TICKETS",
  subtitle = "Choose how you attend. Every pass includes the full program for your access level.",
}: TicketsProps) {
  const content = useContent();
  const tickets = ticketsProp ?? content.tickets;
  return (
    <section id={id} className={clsx("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-md grid-cols-1 items-stretch gap-6 lg:mt-16 lg:max-w-6xl lg:grid-cols-3 lg:gap-5">
          {tickets.map((t, i) => (
            <TicketCard key={t.id} ticket={t} index={i} />
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-xs text-muted-foreground lg:mt-14">
          Prices in USD. Taxes calculated at checkout.
        </p>
      </div>
    </section>
  );
}

/*
 * Each pass is a paper ticket (same silhouettes as the About page passes):
 * - featured: blue, perforated edges, raised a little on desktop
 * - group (no fixed price): sage, notched corners
 * - otherwise: white, notched corners
 */
const KINDS = {
  plain: {
    tag: "Admit one",
    card: "bg-card text-foreground",
    soft: "text-muted-foreground",
    line: "border-foreground/15",
    check: "text-primary",
    button: "bg-foreground text-background hover:bg-foreground/85",
  },
  featured: {
    tag: "Most popular",
    card: "bg-primary text-primary-foreground",
    soft: "text-primary-foreground/75",
    line: "border-white/30",
    check: "text-white",
    button: "bg-card text-foreground hover:bg-secondary",
  },
  group: {
    tag: "Teams of 5+",
    card: "bg-accent text-accent-foreground",
    soft: "text-accent-foreground/75",
    line: "border-accent-foreground/25",
    check: "text-accent-foreground",
    button: "bg-foreground text-background hover:bg-foreground/85",
  },
} as const;

function TicketCard({ ticket: t, index }: { ticket: Ticket; index: number }) {
  const kind = t.featured ? KINDS.featured : t.price === null ? KINDS.group : KINDS.plain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      // The mask clips box-shadow, so the shadow lives on this wrapper as a drop-shadow.
      className={clsx(
        "h-full transition-transform duration-300 hover:-translate-y-1",
        t.featured
          ? "drop-shadow-[0_22px_34px_rgba(37,99,235,0.35)] lg:-translate-y-3 lg:hover:-translate-y-4"
          : "drop-shadow-[0_18px_28px_rgba(15,23,42,0.14)]",
      )}
    >
      <article
        style={t.featured ? TICKET_SHAPES.perforated : TICKET_SHAPES.notched}
        className={clsx("flex h-full flex-col px-8 py-9 text-center sm:px-10", kind.card)}
      >
        <span className={clsx("font-mono text-[11px] font-semibold uppercase tracking-widest", kind.soft)}>
          {kind.tag}
        </span>
        <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">{t.name}</h3>
        <p className={clsx("mx-auto mt-2 max-w-xs text-sm leading-relaxed", kind.soft)}>{t.tagline}</p>

        {/* Tear line */}
        <div aria-hidden className={clsx("my-6 border-t-2 border-dashed", kind.line)} />

        <ul className="flex-1 space-y-3 text-left">
          {t.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <CheckIcon weight="bold" size={16} className={clsx("mt-0.5 shrink-0", kind.check)} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Stub: price + button */}
        <div
          className={clsx(
            "mt-7 flex flex-wrap items-end justify-between gap-4 border-t-2 border-dashed pt-6 text-left",
            kind.line,
          )}
        >
          <p>
            <span className={clsx("block font-mono text-[11px] font-semibold uppercase tracking-widest", kind.soft)}>
              {t.priceNote}
            </span>
            <span className="font-heading text-4xl font-extrabold leading-none tracking-tight">
              {t.price !== null ? `$${t.price}` : "Custom"}
            </span>
          </p>
          <a
            href={t.href}
            className={clsx(
              "inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors",
              kind.button,
            )}
          >
            {t.cta}
            <ArrowUpRightIcon weight="bold" size={14} />
          </a>
        </div>
      </article>
    </motion.div>
  );
}
