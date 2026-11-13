import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Temporary typographic logo. Swap for the real mark when available. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" aria-label={`${site.name} home`} className={cn("group flex items-center gap-3 whitespace-nowrap", className)}>
      <span
        aria-hidden
        className={cn(
          "relative flex size-9 shrink-0 items-center sm:size-10 justify-center border font-serif text-xl font-semibold",
          light ? "border-white/60 text-white" : "border-navy bg-navy text-white",
        )}
      >
        M
        <span className="absolute -bottom-px -right-px size-2.5 bg-blue" />
      </span>
      <span className="leading-none">
        <span className={cn("block font-serif text-lg font-semibold tracking-tight sm:text-[1.35rem]", light ? "text-white" : "text-navy")}>
          {site.name}
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] min-[400px]:block",
            light ? "text-white/60" : "text-muted-foreground",
          )}
        >
          Conferences &amp; Research
        </span>
      </span>
    </Link>
  );
}
