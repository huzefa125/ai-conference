"use client";

import * as React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { CheckIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { TICKETS, type Ticket } from "@/lib/tickets-data";

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
  tickets = TICKETS,
  title = "TICKETS",
  subtitle = "Choose how you attend. Every pass includes the full program for your access level.",
}: TicketsProps) {
  return (
    <section id={id} className={clsx("w-full py-16 md:py-20", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            {title}
          </h2>
          <p className="mt-4 font-mono text-base sm:text-lg leading-relaxed text-balance text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-md grid-cols-1 gap-y-14 lg:max-w-5xl lg:grid-cols-3 lg:gap-5">
          {tickets.map((t, i) => (
            <TicketCard key={t.id} ticket={t} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
          Prices in USD. Taxes calculated at checkout.
        </p>
      </div>
    </section>
  );
}

function TicketCard({ ticket: t, index }: { ticket: Ticket; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={clsx(
        "relative flex flex-col p-6 sm:p-7 bg-card border transition-all duration-300",
        t.featured
          ? "border-primary shadow-[var(--shadow-hover)] lg:-my-3 lg:py-9"
          : "border-border shadow-[var(--shadow-subtle)] hover:border-primary/50"
      )}
    >
      {t.featured && (
        <span className="absolute left-0 top-0 -translate-y-full bg-primary px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
          Most popular
        </span>
      )}

      <h3 className="font-mono text-xl font-bold text-foreground">{t.name}</h3>
      <p className="mt-1 font-mono text-sm text-muted-foreground">{t.tagline}</p>

      <div className="mt-6 flex items-baseline gap-2 border-b border-border pb-6">
        {t.price !== null ? (
          <>
            <span className="font-mono text-4xl font-bold tracking-tight text-foreground">
              ${t.price}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{t.priceNote}</span>
          </>
        ) : (
          <>
            <span className="font-mono text-3xl font-bold tracking-tight text-foreground">
              Custom
            </span>
            <span className="font-mono text-xs text-muted-foreground">{t.priceNote}</span>
          </>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {t.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-mono text-sm text-foreground/80">
            <CheckIcon weight="bold" size={16} className="mt-0.5 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={t.href}
        className={clsx(
          "mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-sm font-medium transition-all",
          t.featured
            ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:bg-primary/90 hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)]"
            : "border-2 border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary"
        )}
      >
        {t.cta}
        <ArrowRightIcon weight="bold" size={16} />
      </a>
    </motion.article>
  );
}
