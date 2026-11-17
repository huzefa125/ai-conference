"use client";

import * as React from "react";
import { CONTACT } from "@/lib/pages-data";

const field =
  "w-full border border-border bg-card px-4 py-3 font-mono text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

/**
 * There is no backend yet, so submitting opens the visitor's email app with the message
 * pre-filled and addressed to the contact email. Swap `onSubmit` for an API call when one exists.
 */
export default function ContactForm() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [sent, setSent] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const topic = String(fd.get("topic") ?? "");
    const message = String(fd.get("message") ?? "").trim();

    const next: Record<string, string> = {};
    if (!name) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email.";
    if (message.length < 10) next.message = "Please write a few words about your question.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `Atlas Global enquiry: ${topic}`;
    const body = `${message}\n\nName: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 border border-border bg-card p-6 shadow-[var(--shadow-subtle)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-sm font-semibold text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={field}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
          />
          {errors.name && (
            <p id="name-err" className="mt-1.5 font-mono text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-sm font-semibold text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={field}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
          />
          {errors.email && (
            <p id="email-err" className="mt-1.5 font-mono text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="mb-2 block font-mono text-sm font-semibold text-foreground">
          What is it about?
        </label>
        <select id="topic" name="topic" className={field} defaultValue={CONTACT.topics[0]}>
          {CONTACT.topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-sm font-semibold text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={field}
          placeholder="How can we help?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {errors.message && (
          <p id="message-err" className="mt-1.5 font-mono text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center bg-primary px-6 py-3.5 font-mono text-sm font-medium text-primary-foreground shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all hover:bg-primary/90 sm:w-auto"
      >
        Send message
      </button>

      {sent && (
        <p role="status" className="font-mono text-sm text-muted-foreground">
          Your email app should open with the message ready to send. If it does not, write to{" "}
          <a className="text-primary underline underline-offset-4" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
