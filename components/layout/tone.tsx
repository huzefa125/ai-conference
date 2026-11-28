import type { CSSProperties, ReactNode } from "react";

/**
 * Background "bands" for page rhythm. Instead of rewriting each section, this re-points the
 * theme tokens (background, card, text, border...) for everything inside, so existing
 * components that use bg-card / text-foreground / border-border pick up the band's palette.
 *
 * The page canvas is Crisp Gallery White (#FFFFFF). Bands alternate with it:
 * - "white": an Alabaster Slate band (#F6F8FB) with white cards and hairline borders. (Name kept so
 *   existing <Tone tone="white"> usages need no change.)
 * - "dark":  a Midnight Obsidian block (#070B14); cards share the obsidian, outlined in a faint cyan line;
 *   text is white, secondary text and accents are the pure Signal Cyan.
 */
const COBALT = "#0052ff";
const CYAN = "#00b8d9";
const OBSIDIAN = "#070b14";

const TONES: Record<"white" | "dark", CSSProperties> = {
  white: {
    "--background": "#f6f8fb",
    "--card": "#ffffff",
    "--secondary": "#ffffff",
    "--muted": "#ffffff",
    "--border": "#e2e8f0",
  } as CSSProperties,
  dark: {
    "--background": OBSIDIAN,
    "--foreground": "#ffffff",
    "--card": OBSIDIAN,
    "--card-foreground": "#ffffff",
    "--popover": OBSIDIAN,
    "--popover-foreground": "#ffffff",
    "--secondary": `color-mix(in srgb, ${COBALT} 14%, ${OBSIDIAN})`,
    "--secondary-foreground": "#ffffff",
    "--muted": `color-mix(in srgb, ${COBALT} 14%, ${OBSIDIAN})`,
    "--muted-foreground": CYAN,
    "--accent": `color-mix(in srgb, ${COBALT} 14%, ${OBSIDIAN})`,
    "--accent-foreground": "#ffffff",
    "--tertiary-ink": CYAN,
    "--tertiary-strong": CYAN,
    "--border": `color-mix(in srgb, ${CYAN} 32%, ${OBSIDIAN})`,
    "--input": `color-mix(in srgb, ${CYAN} 32%, ${OBSIDIAN})`,
    "--shadow-subtle": "none",
    "--shadow-hover": "none",
    colorScheme: "dark",
  } as CSSProperties,
};

export default function Tone({ tone, children }: { tone: "white" | "dark"; children: ReactNode }) {
  return (
    <div style={TONES[tone]} className="bg-background text-foreground">
      {children}
    </div>
  );
}
