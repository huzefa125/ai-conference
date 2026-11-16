import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16 lg:py-20">
        <h2 id="stats-heading" className="sr-only">
          Organisation at a glance
        </h2>
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse justify-end px-3 sm:px-8 ${i % 2 === 1 ? "border-l border-border" : ""} ${
                  i > 0 ? "lg:border-l lg:border-border" : ""
                } ${i === 0 ? "lg:pl-0" : ""}`}
              >
                <dd className="font-display text-3xl tracking-tight text-navy min-[400px]:text-4xl sm:text-5xl">{s.value}</dd>
                <dt className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground sm:text-sm sm:tracking-[0.12em]">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Partner institutions and societies
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 text-center sm:grid-cols-3 lg:grid-cols-6">
              {["University Name", "Research Institute", "Science Society", "Academy of Sciences", "Medical Council", "Tech Foundation"].map((n) => (
                <li key={n} className="border border-dashed border-border px-3 py-4 text-sm font-medium text-navy/50">
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground">
            <span className="font-semibold text-navy">Placeholder figures.</span> Sample values shown for layout only;
            replace with verified organisational data in <code className="text-[11px]">lib/data.ts</code> before launch.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
