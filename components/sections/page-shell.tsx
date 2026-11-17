import { Navbar } from "@/components/ui/navbar";
import SiteFooter from "@/components/sections/site-footer";

/** Shared frame for inner pages: site header, page content, site footer. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <div className="container mx-auto px-4">
        <Navbar />
      </div>
      <main>{children}</main>
      <SiteFooter id="contact" />
    </div>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
          <h1 className="mt-4 font-mono text-4xl font-extrabold leading-[1.08] tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-mono text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>
        </div>
      </div>
    </section>
  );
}
