import type { Metadata } from "next";
import { InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react/ssr";
import PageShell from "@/components/sections/page-shell";
import ContactForm from "@/components/sections/contact-form";
import Faq from "@/components/ui/faq";
import { CONTACT } from "@/lib/pages-data";
import { FOOTER } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact | Atlas Global 2026",
  description: "Questions about tickets, speaking, sponsorship or group bookings? Get in touch with the Atlas Global team.",
};

const SOCIAL_ICONS = { LinkedIn: LinkedinLogoIcon, X: XLogoIcon, YouTube: YoutubeLogoIcon, Instagram: InstagramLogoIcon } as const;

const colLabel = "text-sm font-bold text-foreground";
const colLine = "block text-sm leading-7 text-muted-foreground";

export default function ContactPage() {
  const { hero, email, phone, address, hours } = CONTACT;

  return (
    <PageShell>
      <section id="message-us" className="w-full scroll-mt-24 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-14 border border-primary/15 bg-primary/[0.04] px-6 py-12 sm:px-10 md:px-16 md:py-20 lg:grid-cols-2 lg:gap-20">
            {/* Left: headline + socials */}
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">{hero.eyebrow}</span>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Let&rsquo;s build the future of AI, <span className="text-primary">together.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{hero.text}</p>

              <div className="mt-10 lg:mt-auto">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Follow along</p>
                <div className="mt-3 flex items-center gap-2">
                  {FOOTER.socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="grid h-10 w-10 place-items-center border border-foreground/15 text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
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
                    <a href={`mailto:${email}`} className={`${colLine} break-words hover:text-primary`}>
                      {email}
                    </a>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className={`${colLine} hover:text-primary`}>
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

      <Faq id="contact-faq" />
    </PageShell>
  );
}
