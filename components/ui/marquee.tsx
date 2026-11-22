import * as React from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Reverse the scroll direction. */
  reverse?: boolean;
  /** Pause the animation while the pointer is over the marquee. */
  pauseOnHover?: boolean;
  /** Scroll top to bottom instead of left to right. */
  vertical?: boolean;
  /** How many times the children are repeated to fill the track. */
  repeat?: number;
  children: React.ReactNode;
}

/**
 * Infinite scrolling marquee. Speed is set with the `--duration` CSS variable
 * (e.g. `[--duration:20s]`) and spacing with `--gap`.
 * The keyframes are injected once (React 19 dedupes a `<style>` with href + precedence).
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      <style href="marquee-03-keyframes" precedence="default">{`
@keyframes mq-horizontal { from { transform: translateX(0); } to { transform: translateX(calc(-100% - var(--gap))); } }
@keyframes mq-vertical { from { transform: translateY(0); } to { transform: translateY(calc(-100% - var(--gap))); } }
.mq-track { animation: mq-horizontal var(--duration) linear infinite; }
.mq-track.mq-v { animation-name: mq-vertical; }
.mq-track.mq-reverse { animation-direction: reverse; }
@media (prefers-reduced-motion: reduce) { .mq-track { animation: none; } }
`}</style>
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "mq-track flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "mq-v flex-col" : "flex-row",
            reverse && "mq-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
