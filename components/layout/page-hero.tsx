import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export type Crumb = { label: string; href?: string };

/**
 * Banner used at the top of every inner page: breadcrumbs, title, optional
 * intro and optional actions/meta in `children`.
 */
export function PageHero({
  title,
  description,
  crumbs,
  image = "/images/hall.jpg",
  eyebrow,
  children,
}: {
  title: string;
  description?: string;
  /** Home is added automatically. The last crumb is the current page. */
  crumbs: Crumb[];
  image?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(27,35,40,0.96)_0%,rgba(27,35,40,0.88)_50%,rgba(27,35,40,0.6)_100%)]"
      />
      <Container className="py-14 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/65 sm:text-sm">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                  {c.href && !last ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined} className={last ? "text-white" : undefined}>
                      {c.label}
                    </span>
                  )}
                  {!last && <ChevronRight className="size-3.5 text-white/40" aria-hidden />}
                </li>
              );
            })}
          </ol>
        </nav>
        {eyebrow && (
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-light">{eyebrow}</p>
        )}
        <h1
          className={
            "max-w-4xl text-balance font-serif text-[2rem] leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.25rem] " +
            (eyebrow ? "mt-3" : "mt-8")
          }
        >
          {title}
        </h1>
        {description && <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-lg">{description}</p>}
        {children && <div className="mt-9">{children}</div>}
      </Container>
    </section>
  );
}
