import type { CSSProperties, ReactNode } from "react";

/**
 * Background "bands" for page rhythm. Instead of rewriting each section, this re-points the
 * theme tokens (background, card, text, border...) for everything inside, so existing
 * components that use bg-card / text-foreground / border-border pick up the new palette.
 *
 * - "white": a plain white band; cards switch to cream so they still stand apart.
 * - "dark":  a navy band; text turns light and cards become a slightly lighter navy.
 */
const TONES: Record<"white" | "dark", CSSProperties> = {
  white: {
    "--background": "#ffffff",
    "--card": "#faf8f5",
    "--secondary": "#f4efea",
    "--border": "#e4e6ea",
  } as CSSProperties,
  dark: {
    "--background": "#0f172a",
    "--foreground": "#f8fafc",
    "--card": "#16213b",
    "--card-foreground": "#f8fafc",
    "--popover": "#16213b",
    "--popover-foreground": "#f8fafc",
    "--secondary": "#1e2a47",
    "--secondary-foreground": "#f8fafc",
    "--muted": "#1e2a47",
    "--muted-foreground": "#a5b0c4",
    "--accent": "#1e2a47",
    "--accent-foreground": "#f8fafc",
    "--border": "rgba(255,255,255,0.12)",
    "--input": "rgba(255,255,255,0.16)",
    "--primary": "#3b82f6",
    "--shadow-subtle": "0 1px 2px rgba(0,0,0,0.3)",
    "--shadow-hover": "0 12px 32px rgba(0,0,0,0.45)",
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
