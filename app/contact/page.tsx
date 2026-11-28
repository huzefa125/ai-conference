import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, GlobeIcon, InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react/ssr";
import PageShell from "@/components/layout/page-shell";
import ContactForm from "@/components/sections/contact-form";
import ContactGlobe from "@/components/sections/contact-globe";
import Faq from "@/components/sections/faq";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact | Atlas Global 2026",
  description: "Questions about tickets, speaking, sponsorship or group bookings? Get in touch with the Atlas Global team.",
};

const SOCIAL_ICONS = { LinkedIn: LinkedinLogoIcon, X: XLogoIcon, YouTube: YoutubeLogoIcon, Instagram: InstagramLogoIcon } as const;

const colLabel = "text-sm font-bold text-foreground";
const colLine = "block text-sm leading-7 text-muted-foreground";

export default async function ContactPage() {
  const { contact: CONTACT, footer: FOOTER } = await getContent();
  const { hero, email, phone, address, hours } = CONTACT;

  return (
    <PageShell>
      <section id="message-us" className="w-full scroll-mt-24 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-14 border border-primary/15 bg-primary/[0.04] px-6 py-12 sm:px-10 md:px-16 md:py-20 lg:grid-cols-2 lg:gap-20">
            {/* Left: headline + socials */}
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-tertiary-ink">{hero.eyebrow}</span>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Let&rsquo;s move science forward, <span className="text-primary">together.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{hero.text}</p>

              <div className="mt-10 lg:mt-auto">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Follow along</p>
                <div className="mt-3 flex items-center gap-2">
                  {FOOTER.socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS] ?? GlobeIcon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="grid h-10 w-10 place-items-center border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Icon weight="fill" size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: details + form */}
            <div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className={colLabel}>Contact info</h2>
                  <div className="mt-3">
                    <a href={`mailto:${email}`} className={`${colLine} break-words hover:text-tertiary-strong`}>
                      {email}
                    </a>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className={`${colLine} hover:text-tertiary-strong`}>
                      {phone}
                    </a>
                    <span className={colLine}>{hours}</span>
                  </div>
                </div>
                <div>
                  <h2 className={colLabel}>Address</h2>
                  <div className="mt-3">
                    {address.map((l) => (
                      <span key={l} className={colLine}>
                        {l}
                      </span>
                    ))}
                    <span className={colLine}>Nov 18–20, 2026</span>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting here: venue facts + a globe with flight paths into Hyderabad */}
      <section id="find-us" className="w-full scroll-mt-24 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-tertiary-ink">Find us</span>
              <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Hyderabad, <span className="text-primary">from anywhere.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Researchers fly in from every continent. Hyderabad has direct international connections, and the team
                can send invitation letters for visa applications.
              </p>

              <dl className="mt-8 grid max-w-md grid-cols-1 border-t border-border sm:grid-cols-2">
                {[
                  { label: "Dates", value: "Nov 18–20, 2026" },
                  { label: "Venue", value: address.join(", ") },
                  { label: "Nearest airport", value: "Rajiv Gandhi International (HYD)" },
                  { label: "Questions", value: email },
                ].map((d) => (
                  <div key={d.label} className="border-b border-border py-4 sm:odd:pr-6">
                    <dt className="font-mono text-[12px] font-semibold uppercase tracking-widest text-tertiary-ink">{d.label}</dt>
                    <dd className="mt-1 break-words text-sm font-medium text-foreground">{d.value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/#travel"
                className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Plan your trip
                <ArrowRightIcon weight="bold" size={16} />
              </Link>
            </div>

            <ContactGlobe className="mx-auto max-w-[560px]" />
          </div>
        </div>
      </section>

      <Faq id="contact-faq" />
    </PageShell>
  );
}
