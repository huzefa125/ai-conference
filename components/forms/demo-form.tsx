"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
  Frontend-only form kit. Nothing is sent anywhere: on submit the browser's
  native validation runs (via `required`, `type="email"`, `pattern`, etc.), and
  if it passes a confirmation message replaces the form.

  Usage:
    <DemoForm submitLabel="Send message" successTitle="Message received">
      <FieldGrid>
        <TextField label="Full name" name="name" required />
        <TextField label="Email" name="email" type="email" required />
        <SelectField label="Topic" name="topic" options={["A", "B"]} required />
        <TextAreaField label="Message" name="message" required full />
      </FieldGrid>
    </DemoForm>
*/

export function DemoForm({
  children,
  submitLabel = "Submit",
  successTitle = "Thank you",
  successMessage = "This is a demo form, so nothing has been submitted. In the live site, the team would receive your details and reply by email.",
  className,
}: {
  children: React.ReactNode;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  className?: string;
}) {
  const [done, setDone] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    setDone(true);
    requestAnimationFrame(() => ref.current?.focus());
  }

  if (done) {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="status"
        className={cn("flex items-start gap-4 border border-blue/30 bg-white p-6 text-navy outline-none sm:p-8", className)}
      >
        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-blue" aria-hidden />
        <div>
          <p className="font-serif text-xl">{successTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{successMessage}</p>
          <button type="button" onClick={() => setDone(false)} className="mt-4 text-sm font-semibold text-blue hover:underline">
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-8", className)}>
      {children}
      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">Demo form: submissions are not stored or sent.</p>
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export function FieldGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-x-6 gap-y-5 sm:grid-cols-2", className)}>{children}</div>;
}

export function FormSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5">
      <legend className="font-serif text-xl text-navy">{title}</legend>
      {description && <p className="-mt-2 text-sm text-muted-foreground">{description}</p>}
      {children}
    </fieldset>
  );
}

const control =
  "w-full rounded-md border border-input bg-white px-4 text-[15px] text-navy placeholder:text-navy/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20 user-invalid:border-red-600";

type Common = { label: string; name: string; required?: boolean; hint?: string; full?: boolean; className?: string };

function Wrapper({ label, name, required, hint, full, className, children }: Common & { children: React.ReactNode }) {
  return (
    <div className={cn(full && "sm:col-span-2", className)}>
      <label htmlFor={`f-${name}`} className="mb-2 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-blue" aria-hidden>*</span>}
      </label>
      {children}
      {hint && (
        <p id={`f-${name}-hint`} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextField({
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
  ...common
}: Common & { type?: string; placeholder?: string; autoComplete?: string; defaultValue?: string }) {
  return (
    <Wrapper {...common}>
      <input
        id={`f-${common.name}`}
        name={common.name}
        type={type}
        required={common.required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-describedby={common.hint ? `f-${common.name}-hint` : undefined}
        className={cn(control, "h-12")}
      />
    </Wrapper>
  );
}

export function SelectField({
  options,
  placeholder = "Select an option",
  defaultValue,
  ...common
}: Common & { options: readonly string[]; placeholder?: string; defaultValue?: string }) {
  return (
    <Wrapper {...common}>
      <select
        id={`f-${common.name}`}
        name={common.name}
        required={common.required}
        defaultValue={defaultValue ?? ""}
        aria-describedby={common.hint ? `f-${common.name}-hint` : undefined}
        className={cn(control, "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2329323d%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({
  rows = 5,
  placeholder,
  maxLength,
  ...common
}: Common & { rows?: number; placeholder?: string; maxLength?: number }) {
  return (
    <Wrapper {...common}>
      <textarea
        id={`f-${common.name}`}
        name={common.name}
        required={common.required}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-describedby={common.hint ? `f-${common.name}-hint` : undefined}
        className={cn(control, "py-3 leading-relaxed")}
      />
    </Wrapper>
  );
}

export function FileField({ accept, ...common }: Common & { accept?: string }) {
  return (
    <Wrapper {...common}>
      <input
        id={`f-${common.name}`}
        name={common.name}
        type="file"
        accept={accept}
        required={common.required}
        aria-describedby={common.hint ? `f-${common.name}-hint` : undefined}
        className="block w-full rounded-md border border-dashed border-input bg-white px-4 py-3 text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue"
      />
    </Wrapper>
  );
}

export function CheckboxField({ label, name, required, full = true }: { label: React.ReactNode; name: string; required?: boolean; full?: boolean }) {
  return (
    <label className={cn("flex items-start gap-3 text-sm text-navy/85", full && "sm:col-span-2")}>
      <input type="checkbox" name={name} required={required} className="mt-0.5 size-4 shrink-0 accent-[var(--blue)]" />
      <span>{label}</span>
    </label>
  );
}

export function RadioCards({ name, options, label, required }: { name: string; label: string; required?: boolean; options: { value: string; title: string; description?: string }[] }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-blue" aria-hidden>*</span>}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {options.map((o) => (
          <label
            key={o.value}
            className="relative flex cursor-pointer flex-col rounded-md border border-input bg-white p-4 transition-colors hover:border-navy has-[:checked]:border-blue has-[:checked]:bg-blue/5 has-[:checked]:ring-2 has-[:checked]:ring-blue/20"
          >
            <input type="radio" name={name} value={o.value} required={required} className="sr-only" />
            <span className="font-medium text-navy">{o.title}</span>
            {o.description && <span className="mt-1 text-xs text-muted-foreground">{o.description}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
