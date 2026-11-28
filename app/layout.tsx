import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { getContent } from "@/lib/content";
import { ContentProvider } from "@/components/providers/content-provider";

// The whole site is static: every page is generated at build time, and the build fails
// if anything would need to render per request.
export const ensureStatic = "navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Display font (headings + accent lines): Franie by ThatThatType, Regular to Black. To change it, swap the files here.
// These are the "Franie Test" trial files: check the licence (ThatThatType.com) before launch.
// The files lack some punctuation (: ; ' " & ( ) /), which falls back to Plus Jakarta Sans (see --font-heading).
const display = localFont({
  src: [
    { path: "./fonts/franie/Franie-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/franie/Franie-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/franie/Franie-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/franie/Franie-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "./fonts/franie/Franie-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

// Serif headings for the academic conference pages (app/conferences/[slug]).
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Atlas Global Summit 2026 | Science & Research Conference, Hyderabad",
  description:
    "Join 1,000+ researchers and scientists at Atlas Global 2026: three days of talks, workshops and poster sessions across five research tracks. Live in Hyderabad, India and streaming worldwide.",
  icons: {
    icon: "/atlas-logo.png",
    apple: "/atlas-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  return (
    // suppressHydrationWarning: browser extensions add attributes (e.g. inline styles) to <html> before
    // React loads. It only covers this element's own attributes, not the page inside it.
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable} ${mono.variable} ${display.variable} ${serif.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FFFFFF] text-[#0a0f1c] antialiased font-sans selection:bg-[#0052ff] selection:text-[#FFFFFF]">
        <ContentProvider value={content}>{children}</ContentProvider>
      </body>
    </html>
  );
}
