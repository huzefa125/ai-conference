// Display font class string, shared by server and client components (no "use client" here, so server
// pages can import it). The font is loaded in app/layout.tsx as --font-display (Franie). It lacks some
// punctuation (: ; quotes & ( ) /), which falls back to Plus Jakarta Sans.
export const DISPLAY_FONT =
  "font-[family-name:var(--font-display),var(--font-jakarta),ui-sans-serif,system-ui,sans-serif] font-bold tracking-[-0.01em]";
