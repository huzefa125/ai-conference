"use client";

import * as React from "react";
import { useContent } from "@/components/providers/content-provider";

// Underline-only fields: no box, just a bottom rule that turns blue on focus.
const field =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/80 transition-colors focus:border-primary focus:outline-none focus:ring-0";

/**
 * There is no backend yet, so submitting opens the visitor's email app with the message
 * pre-filled and addressed to the contact email. Swap `onSubmit` for an API call when one exists.
 */
export default function ContactForm() {
  const { contact: CONTACT } = useContent();
  const topics = CONTACT.topics;
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [sent, setSent] = React.useState(false);
  const topicRef = React.useRef<HTMLSelectElement>(null);

  // Preselect the topic when a link passes ?topic=...
  React.useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && topicRef.current && topics.includes(t)) topicRef.current.value = t;
  }, [topics]);

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

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 font-mono text-xs text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="name" className="sr-only">
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
        {err("name")}
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={field}
          placeholder="name@yourcompany.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
        />
        {err("email")}
      </div>

      <div>
        <label htmlFor="topic" className="sr-only">
          What is it about?
        </label>
        <select ref={topicRef} id="topic" name="topic" className={`${field} cursor-pointer`} defaultValue={CONTACT.topics[0]}>
          {CONTACT.topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className={`${field} resize-none`}
          placeholder="Enter your message here..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {err("message")}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-primary sm:w-auto"
        >
          Submit form
        </button>
      </div>

      {sent && (
        <p role="status" className="text-sm text-muted-foreground">
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
