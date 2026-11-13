import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = { colorScheme: "light", themeColor: "#29323d" };

export const metadata: Metadata = {
  title: `${site.name} | International Scientific Conferences`,
  description:
    "Bringing together researchers, scientists, academicians and industry leaders to exchange knowledge, present discoveries and shape the future of scientific innovation.",
  openGraph: {
    title: `${site.name} | International Scientific Conferences`,
    description: "Advancing science through global collaboration.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
