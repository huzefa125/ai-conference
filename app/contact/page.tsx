import type { Metadata } from "next";
import Link from "next/link";
import { EnvelopeSimpleIcon, PhoneIcon, MapPinIcon, ClockIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import PageShell, { PageHero } from "@/components/sections/page-shell";
import ContactForm from "@/components/sections/contact-form";
import { CONTACT } from "@/lib/pages-data";

export const metadata: Metadata = {
  title: "Contact | Atlas Global 2026",
  description: "Questions about tickets, speaking, sponsorship or group bookings? Get in touch with the Atlas Global team.",
};

export default function ContactPage() {
  const { hero, email, phone, address, hours, quick } = CONTACT;
  const cards = [
    { Icon: EnvelopeSimpleIcon, label: "Email", lines: [email], href: `mailto:${email}` },
    { Icon: PhoneIcon, label: "Phone", lines: [phone], href: `tel:${phone.replace(/\s/g, "")}` },
    { Icon: MapPinIcon, label: "Location", lines: address, href: undefined },
    { Icon: ClockIcon, label: "Hours", lines: [hours], href: undefined },
  ];
  return (
    <PageShell>
      <PageHero {...hero} />
      <section className="w-full pb-14 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
            <ContactForm />

            <aside className="space-y-4">
              {cards.map(({ Icon, label, lines, href }) => {
                const body = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center bg-primary/10 text-primary">
                      <Icon weight="duotone" size={24} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
                        {label}
                      </span>
                      {lines.map((l) => (
                        <span key={l} className="mt-1 block break-words font-mono text-base text-foreground">
                          {l}
                        </span>
                      ))}
                    </span>
                  </>
                );
                const cls = "flex items-start gap-4 border border-border bg-card p-5 shadow-[var(--shadow-subtle)]";
                return href ? (
                  <a key={label} href={href} className={`${cls} transition-colors hover:border-primary/50`}>
                    {body}
                  </a>
                ) : (
                  <div key={label} className={cls}>
                    {body}
                  </div>
                );
              })}

              <div className="border border-border bg-secondary/60 p-5">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">Quick links</p>
                <ul className="mt-3 space-y-2">
                  {quick.map((q) => (
                    <li key={q.label}>
                      <Link
                        href={q.href}
                        className="group inline-flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary"
                      >
                        {q.label}
                        <ArrowRightIcon weight="bold" size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
