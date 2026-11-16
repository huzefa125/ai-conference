import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { site } from "@/lib/site";
import { disciplines } from "@/lib/data";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Conferences", href: "/conferences" },
      { label: "Registration", href: "/registration" },
      { label: "Speakers", href: "/speakers" },
      { label: "Sponsorship", href: "/sponsorship" },
      { label: "News", href: "/news" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Conference Categories",
    links: disciplines.map((d) => ({ label: d.name, href: `/conferences/category/${d.slug}` })),
  },
  {
    title: "Publications",
    links: [
      { label: "Journals", href: "/publications/journals" },
      { label: "Conference Proceedings", href: "/publications/proceedings" },
      { label: "Author Guidelines", href: "/publications/author-guidelines" },
      { label: "Call for Abstracts", href: "/call-for-abstracts" },
      { label: "Past Events", href: "/past-events" },
    ],
  },
];

type IconProps = { className?: string };
const svg = (d: string) =>
  function Icon({ className }: IconProps) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
        <path d={d} />
      </svg>
    );
  };

const socials = [
  { label: "LinkedIn", icon: svg("M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.84v1.57h.05c.54-1.01 1.86-2.07 3.82-2.07 4.08 0 4.84 2.69 4.84 6.18v5.82h-4v-5.16c0-1.23-.02-2.82-1.72-2.82-1.72 0-1.98 1.34-1.98 2.73v5.25h-4V9.75Z") },
  { label: "X (Twitter)", icon: svg("M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.16h1.7L7.4 4.75H5.58l11.09 14.41Z") },
  { label: "Facebook", icon: svg("M13.5 21v-7.5h2.5l.5-3h-3V8.6c0-.86.28-1.6 1.6-1.6H16.6V4.3C16.3 4.26 15.4 4.2 14.4 4.2c-2.2 0-3.7 1.34-3.7 3.8v2.5H8v3h2.7V21h2.8Z") },
  { label: "YouTube", icon: svg("M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.4-4.8ZM10 15V9l5.2 3L10 15Z") },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[30rem] rounded-full bg-blue/20 blur-[140px]" />
      <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            An international organiser of scientific conferences, bringing researchers and industry together to share
            knowledge across six disciplines.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, icon: Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white hover:bg-white hover:text-navy"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-6">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-blue-light" aria-hidden />
              {site.address}
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-blue-light" aria-hidden />
              {site.email}
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-blue-light" aria-hidden />
              {site.phone}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
