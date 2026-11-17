"use client";

import * as React from "react";
import { clsx } from "clsx";

export interface AccordionItem {
  id: string;
  url: string;
  title: string;
  description: string;
}

/**
 * Desktop (md+): a row of images. Hover or focus one and it expands while the rest shrink and blur.
 * Mobile: a swipeable snap carousel with the captions always visible.
 */
export default function TailwindImageAccordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "group -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "md:mx-auto md:w-full md:justify-center md:gap-2 md:overflow-visible md:px-0 md:pb-0",
        className,
      )}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className={clsx(
            "group/article relative w-[80%] shrink-0 snap-center overflow-hidden border border-border bg-muted md:w-full md:shrink",
            "transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)]",
            // siblings shrink while one is hovered / focused
            "md:not-[&:hover]:group-hover:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%]",
            // bottom gradient behind the caption
            "before:absolute before:inset-x-0 before:bottom-0 before:z-[1] before:h-1/2 before:bg-gradient-to-t before:from-foreground/80 before:to-transparent before:transition-opacity",
            "md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100",
            // frosted veil on the shrunk siblings
            "after:absolute after:inset-0 after:bg-background/30 after:opacity-0 after:backdrop-blur-sm after:transition-all",
            "md:not-[&:hover]:group-hover:after:opacity-100 md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-100",
            "focus-within:ring-2 focus-within:ring-primary/60",
          )}
        >
          <a href="#tickets" className="absolute inset-0 z-10 flex flex-col justify-end p-4 text-white">
            <span
              className={clsx(
                "font-mono text-lg font-bold md:truncate md:whitespace-nowrap md:opacity-0",
                "md:translate-y-2 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)]",
                "group-hover/article:translate-y-0 group-hover/article:opacity-100 group-hover/article:delay-300",
                "group-focus-within/article:translate-y-0 group-focus-within/article:opacity-100 group-focus-within/article:delay-300",
              )}
            >
              {item.title}
            </span>
            <span
              className={clsx(
                "mt-0.5 font-mono text-sm text-white/85 md:truncate md:whitespace-nowrap md:opacity-0",
                "md:translate-y-2 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)]",
                "group-hover/article:translate-y-0 group-hover/article:opacity-100 group-hover/article:delay-500",
                "group-focus-within/article:translate-y-0 group-focus-within/article:opacity-100 group-focus-within/article:delay-500",
              )}
            >
              {item.description}
            </span>
          </a>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.url} alt={item.title} loading="lazy" className="h-72 w-full object-cover md:h-[26rem]" />
        </article>
      ))}
    </div>
  );
}
