"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky in-page navigation. Highlights the section currently in view.
 * Sits directly under the 72px sticky site header.
 */
export function SectionNav({ items, label = "On this page" }: { items: { id: string; label: string }[]; label?: string }) {
  const [active, setActive] = React.useState(items[0]?.id);
  const navTrackRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  React.useEffect(() => {
    if (!active || !navTrackRef.current) return;
    const activeEl = navTrackRef.current.querySelector<HTMLElement>(`[data-section-id="${active}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-[72px] z-40 border-b border-border/70 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto w-full max-w-7xl px-4 min-[400px]:px-5 sm:px-8 lg:px-10 2xl:max-w-[1440px]">
        <ul ref={navTrackRef} className="flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id} data-section-id={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "flex h-10 items-center rounded-full px-3.5 sm:px-4 text-xs sm:text-sm font-semibold transition-colors",
                    isActive ? "bg-navy text-white shadow-card" : "text-navy/65 hover:bg-surface hover:text-navy",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
