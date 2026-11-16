"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, SearchX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { conferences, disciplines, type Mode } from "@/lib/data";
import { ConferenceCard } from "@/components/conference/conference-card";

const ALL = "All";
const modes: Mode[] = ["In-person", "Virtual", "Hybrid"];

const selectClass =
  "h-12 w-full appearance-none rounded-xl border border-input bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2329323d%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat px-4 pr-10 text-base sm:text-[15px] text-navy transition hover:border-navy/30 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/15";

/** Filterable listing of every conference: discipline, format and free-text search. */
export function ConferenceBrowser({ initialMode, initialDiscipline }: { initialMode?: Mode; initialDiscipline?: string }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = React.useState("");
  const [discipline, setDiscipline] = React.useState<string>(
    initialDiscipline && disciplines.some((d) => d.slug === initialDiscipline) ? initialDiscipline : ALL,
  );
  const [mode, setMode] = React.useState<string>(initialMode ?? ALL);

  const sorted = React.useMemo(() => [...conferences].sort((a, b) => a.startDate.localeCompare(b.startDate)), []);

  const q = query.trim().toLowerCase();
  const visible = sorted.filter((c) => {
    if (discipline !== ALL && c.disciplineSlug !== discipline) return false;
    if (mode !== ALL && c.mode !== mode) return false;
    if (!q) return true;
    const haystack = [c.title, c.shortTitle, c.discipline, c.location, c.description, ...c.topics].join(" ").toLowerCase();
    return haystack.includes(q);
  });

  const filtered = q !== "" || discipline !== ALL || mode !== ALL;
  const reset = () => {
    setQuery("");
    setDiscipline(ALL);
    setMode(ALL);
  };

  return (
    <div>
      <form
        role="search"
        aria-label="Filter conferences"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-5 rounded-3xl border border-border bg-white p-5 shadow-card sm:p-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)_auto] lg:items-end"
      >
        <div>
          <label htmlFor="conf-search" className="mb-2 block text-sm font-medium text-navy">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-navy/50" aria-hidden />
            <input
              id="conf-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, topic or city"
              className="h-12 w-full rounded-full border border-input bg-surface/60 pl-11 pr-4 text-base sm:text-[15px] text-navy transition placeholder:text-navy/45 hover:border-navy/30 focus:border-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue/15"
            />
          </div>
        </div>
        <div>
          <label htmlFor="conf-discipline" className="mb-2 block text-sm font-medium text-navy">
            Discipline
          </label>
          <select id="conf-discipline" value={discipline} onChange={(e) => setDiscipline(e.target.value)} className={selectClass}>
            <option value={ALL}>All disciplines</option>
            {disciplines.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-navy">Format</legend>
          <div className="flex h-12 gap-1 overflow-x-auto rounded-full bg-surface p-1 ring-1 ring-inset ring-border [scrollbar-width:none]">
            {[ALL, ...modes].map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 shrink-0 rounded-full px-2.5 min-[380px]:px-3 text-[11px] min-[380px]:text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
                    active ? "bg-navy text-white shadow-card" : "text-navy/70 hover:bg-white hover:text-navy",
                  )}
                >
                  {m === "In-person" ? "On-site" : m}
                  {m === "In-person" && <span className="sr-only"> (in-person)</span>}
                </button>
              );
            })}
          </div>
        </fieldset>
      </form>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-navy" aria-live="polite" aria-atomic="true">
          Showing <span className="font-semibold">{visible.length}</span> of {conferences.length} conferences
          {mode !== ALL && <span className="text-muted-foreground"> · {mode}</span>}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-blue/10 px-4 text-sm font-semibold text-blue transition-colors hover:bg-blue/15"
          >
            <X className="size-4" aria-hidden />
            Clear filters
          </button>
        )}
      </div>

      {visible.length > 0 ? (
        <motion.ul layout={!reduce} className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((c) => (
              <motion.li
                key={c.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <ConferenceCard conference={c} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-border bg-white px-6 py-16 text-center shadow-card">
          <span className="flex size-14 items-center justify-center rounded-xl bg-blue/10 text-blue">
            <SearchX className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold tracking-[-0.03em] text-navy">No conferences match your filters</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Try a different keyword, choose another discipline or format, or clear the filters to see every upcoming event.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex h-11 items-center rounded-full bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-blue"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
