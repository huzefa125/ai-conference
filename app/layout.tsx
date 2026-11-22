import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF8F5",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Atlas Conferences & Events | Global Innovation & Frontier Summit 2026",
  description:
    "Join 1,000+ industry pioneers, founders, researchers, and capital allocators at the Atlas Global Innovation Summit. Live in Hyderabad, India and streaming worldwide.",
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable} ${mono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FAF8F5] text-[#0F172A] antialiased font-sans selection:bg-[#2563EB] selection:text-[#FAF8F5]">
        <ContentProvider value={content}>{children}</ContentProvider>
      </body>
    </html>
  );
}
