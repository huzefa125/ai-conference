import { cn } from "@/lib/utils";

interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Run the scroll in the opposite direction. */
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  /** How many copies of the content to render so the loop never shows a gap. */
  repeat?: number;
}

/**
 * Infinite scrolling row. Speed and spacing are set with the CSS variables
 * `--duration` and `--gap` (for example `[--duration:45s] [--gap:0.75rem]`).
 * Copies after the first are hidden from assistive technology.
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
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] motion-reduce:[animation-duration:calc(var(--duration)*2)]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
