"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { SpeakerCard } from "@/components/conference/speaker-card";
import { cn } from "@/lib/utils";
import type { Speaker } from "@/lib/content";

const kinds = ["All", "Keynote", "Plenary", "Invited"] as const;
type Kind = (typeof kinds)[number];

/** Filterable, searchable grid of speakers. Each card links to its profile. */
export function SpeakerDirectory({ speakers }: { speakers: Speaker[] }) {
  const [kind, setKind] = React.useState<Kind>("All");
  const [query, setQuery] = React.useState("");

  const counts = React.useMemo(() => {
    const c: Record<Kind, number> = { All: speakers.length, Keynote: 0, Plenary: 0, Invited: 0 };
    for (const s of speakers) c[s.kind] += 1;
    return c;
  }, [speakers]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return speakers.filter((s) => {
      if (kind !== "All" && s.kind !== kind) return false;
      if (!q) return true;
      return [s.name, s.role, s.org, s.country, s.focus].some((v) => v.toLowerCase().includes(q));
    });
  }, [speakers, kind, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by speaker type" className="flex flex-wrap gap-2">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors",
                kind === k ? "border-navy bg-navy text-white" : "border-border bg-white text-navy hover:border-navy",
              )}
            >
              {k}
              <span className={cn("text-xs tabular-nums", kind === k ? "text-white/70" : "text-muted-foreground")}>{counts[k]}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="speaker-search" className="sr-only">
            Search speakers
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            id="speaker-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, field, institution or country"
            className="h-11 w-full rounded-md border border-input bg-white pl-10 pr-10 text-base sm:text-[15px] text-navy placeholder:text-navy/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:text-navy"
            >
              <X className="size-4" aria-hidden />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-5 text-sm text-muted-foreground">
        Showing {results.length} of {speakers.length} speakers
      </p>

      {results.length > 0 ? (
        <ul className="mt-8 grid gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {results.map((s) => (
            <li key={s.slug}>
              <SpeakerCard speaker={s} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 border border-dashed border-border bg-card px-6 py-14 text-center">
          <p className="font-display text-xl text-navy">No speakers match your search</p>
          <p className="mt-2 text-sm text-muted-foreground">Try a different keyword or speaker type.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setKind("All");
            }}
            className="mt-5 text-sm font-semibold text-blue hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
