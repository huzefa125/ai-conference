"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Mic, Wrench, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface HeroLabel {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface HeroBannerCta {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface HeroBannerProps {
  titleWords?: string[];
  rotatingWords?: string[];
  highlightWords?: string[];
  subtitle?: string;
  labels?: HeroLabel[];
  ctaButton?: HeroBannerCta;
  secondaryButton?: HeroBannerCta;
  className?: string;
}

const DEFAULT_LABELS: HeroLabel[] = [
  { icon: Mic, label: "Keynotes & talks" },
  { icon: Wrench, label: "Hands-on workshops" },
  { icon: Users, label: "Networking evenings" },
];

const DEFAULT_TITLE_WORDS = ["THE", "AI", "SUMMIT", "FOR"];

const DEFAULT_ROTATING_WORDS = ["BUILDERS", "FOUNDERS", "ENGINEERS", "RESEARCHERS", "LEADERS"];

const DEFAULT_HIGHLIGHT_WORDS = ["AI"];

export function HeroBanner({
  titleWords = DEFAULT_TITLE_WORDS,
  rotatingWords = DEFAULT_ROTATING_WORDS,
  highlightWords = DEFAULT_HIGHLIGHT_WORDS,
  subtitle = "Three days of practical talks, hands-on workshops and the people building AI. Live in Hyderabad and streamed worldwide.",
  labels = DEFAULT_LABELS,
  ctaButton = {
    text: "GET TICKETS",
    href: "/#tickets",
  },
  secondaryButton = {
    text: "VIEW AGENDA",
    href: "#agenda",
  },
  className = "",
}: HeroBannerProps) {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);

  // Auto rotate the trailing word every 2.4 seconds
  React.useEffect(() => {
    if (!rotatingWords || rotatingWords.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [rotatingWords]);

  // Split all words except the last one so the last word and the rotating word stay paired together
  const hasRotating = Boolean(rotatingWords && rotatingWords.length > 0);
  const leadingWords = hasRotating && titleWords.length > 0 ? titleWords.slice(0, -1) : titleWords;
  const lastTitleWord = hasRotating && titleWords.length > 0 ? titleWords[titleWords.length - 1] : null;

  return (
    <section className={`py-12 md:py-20 ${className}`}>
      <div className="flex flex-col items-center text-center">
        {/* Event line: name, dates and city up front so it reads as a conference */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border border-primary/30 bg-primary/[0.06] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm"
        >
          <span>Atlas Global 2026</span>
          <span aria-hidden className="text-primary/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Nov 18–20
          </span>
          <span aria-hidden className="text-primary/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> Hyderabad
          </span>
        </motion.p>

        {/* Animated Headline Words with Rotating Completion Word */}
        <motion.h1
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-[2.4rem] font-extrabold sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-7xl max-w-7xl mx-auto leading-[1.08] text-foreground tracking-tighter"
        >
          {leadingWords.map((text, index) => {
            const isHighlight = highlightWords.includes(text.toUpperCase());
            return (
              <motion.span
                key={`${text}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                className={`inline-block mx-1.5 sm:mx-2 md:mx-3 ${
                  isHighlight ? "text-primary font-extrabold" : ""
                }`}
              >
                {text}
              </motion.span>
            );
          })}

          {/* Group the last word and the rotating word together for flawless baseline & horizontal centering */}
          {hasRotating ? (
            <span className="inline-block sm:whitespace-nowrap mx-1.5 sm:mx-2 md:mx-3">
              {lastTitleWord && (
                <motion.span
                  key={`${lastTitleWord}-last`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (titleWords.length - 1) * 0.1,
                    duration: 0.5,
                  }}
                  className={`inline-block mr-2 sm:mr-3 md:mr-4 ${
                    highlightWords.includes(lastTitleWord.toUpperCase())
                      ? "text-primary font-extrabold"
                      : ""
                  }`}
                >
                  {lastTitleWord}
                </motion.span>
              )}

              <span className="inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[currentWordIndex]}
                    initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-primary font-extrabold bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          ) : null}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Floating Feature Badges */}
        {labels.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            {labels.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.2 + index * 0.12,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card border border-border shadow-xs hover:border-primary/50 transition-colors"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {feature.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Action buttons: Get tickets + View agenda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.6,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Button 1: Get tickets */}
          {ctaButton.href ? (
            <Link href={ctaButton.href} className="w-full sm:w-auto">
              <Button
                size="lg"
                className={`w-full sm:w-auto cursor-pointer rounded-none bg-primary hover:bg-primary/90 text-primary-foreground  px-8 py-6 text-base shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] transition-all ${ctaButton.className ||""}`}
              >
                {ctaButton.text || "GET TICKETS"}{" "}
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              onClick={ctaButton.onClick}
              className={`w-full sm:w-auto cursor-pointer rounded-none bg-primary hover:bg-primary/90 text-primary-foreground  px-8 py-6 text-base shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] transition-all ${ctaButton.className ||""}`}
            >
              {ctaButton.text || "GET TICKETS"}{" "}
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          )}

          {/* Button 2 (k baju me): VIEW AGENDA / EXPLORE PROGRAM */}
          {secondaryButton && (
            secondaryButton.href ? (
              <Link href={secondaryButton.href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className={`w-full sm:w-auto cursor-pointer rounded-none border-2 border-border bg-card/80 hover:bg-secondary text-foreground  px-8 py-6 text-base transition-all hover:border-primary/50 shadow-xs ${secondaryButton.className ||""}`}
                >
                  <Calendar className="mr-2 w-4 h-4 text-primary" />
                  {secondaryButton.text || "VIEW AGENDA"}
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={secondaryButton.onClick}
                className={`w-full sm:w-auto cursor-pointer rounded-none border-2 border-border bg-card/80 hover:bg-secondary text-foreground  px-8 py-6 text-base transition-all hover:border-primary/50 shadow-xs ${secondaryButton.className ||""}`}
              >
                <Calendar className="mr-2 w-4 h-4 text-primary" />
                {secondaryButton.text || "VIEW AGENDA"}
              </Button>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
