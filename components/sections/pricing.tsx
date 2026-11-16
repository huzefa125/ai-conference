import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { nextConference } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const plans = [
  {
    name: "Early Bird",
    price: "$649",
    text: "Save more by registering early and securing your spot.",
    features: ["Access to all sessions", "Network with speakers", "Conference kit and programme"],
    featured: false,
  },
  {
    name: "Standard",
    price: "$799",
    text: "Regular registration without extra perks.",
    features: ["All sessions and workshops", "Session recordings", "Breakout sessions"],
    featured: true,
  },
  {
    name: "Priority",
    price: "$999",
    text: "Premium access with priority seating and speaker meet-ups.",
    features: ["Priority lounge access", "Front-row seating", "Meet-and-greet with speakers"],
    featured: false,
  },
];

/** Three registration plans over a half-dark band. */
export function Pricing() {
  return (
    <section id="pricing" className="relative bg-white pt-16 sm:pt-20 lg:pt-28">
      {/* Dark band behind the lower half of the cards on desktop */}
      <div aria-hidden className="hidden md:block absolute inset-x-0 bottom-0 h-[52%] bg-navy-deep" />
      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeading eyebrow="Pricing" title="Comprehensive Pricing Options" />
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:ml-auto">
            Choose the option that suits you: individual, student or corporate group. Students and groups of five or more get
            reduced rates; contact us for details.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 pb-16 sm:pb-20 md:grid-cols-3 lg:pb-24">
          {plans.map((p) => (
            <li key={p.name} className="flex">
              <div
                className={cn(
                  "flex w-full flex-col rounded-3xl bg-white p-6 min-[400px]:p-7 shadow-[0_24px_60px_-28px_rgba(7,13,24,0.35)] ring-1 ring-black/5 sm:p-8",
                )}
              >
                <h3 className="font-display text-xl font-bold text-navy">{p.name}</h3>
                <p className="mt-4 font-display text-4xl font-bold tracking-tight text-navy">{p.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                <ul className="my-6 space-y-3 border-t border-border pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-navy">
                      <Check className="size-4 shrink-0 text-blue" strokeWidth={3} aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/registration?conference=${nextConference.id}`}
                  className={cn(
                    "mt-auto inline-flex h-12 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    p.featured
                      ? "bg-blue text-white hover:bg-navy"
                      : "border-2 border-blue/40 text-blue hover:border-blue hover:bg-blue hover:text-white",
                  )}
                >
                  Register
                  <span className="sr-only"> for the {p.name} plan</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
