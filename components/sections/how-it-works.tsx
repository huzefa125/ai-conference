import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { StepsBoard } from "./steps-board";

export default async function HowItWorks({ id = "how-it-works" }: { id?: string }) {
  const { title, intro, cta } = (await getContent()).howItWorks;
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base text-muted-foreground">{intro}</p>
      </div>

      <div className="mt-6">
        <StepsBoard />
      </div>

      <div className="relative mt-8 overflow-hidden rounded-2xl bg-foreground text-white">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-[80px]" />
        <div className="relative flex flex-col items-center gap-6 p-8 text-center sm:p-10">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{cta.title}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-base text-white/75">{cta.body}</p>
          </div>
          <a
            href={cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {cta.label}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
