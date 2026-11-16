import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
    "Join 1,000+ industry pioneers, founders, researchers, and capital allocators at the Atlas Global Innovation Summit. Live in San Francisco and streaming worldwide.",
  icons: {
    icon: "/atlas-logo.png",
    apple: "/atlas-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FAF8F5] text-[#0F172A] antialiased font-sans selection:bg-[#2563EB] selection:text-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
