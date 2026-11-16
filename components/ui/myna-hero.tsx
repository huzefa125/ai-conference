"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart,
  Menu,
  Plug,
  Sparkles,
  Zap,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "SOLUTIONS", href: "#solutions" },
  { title: "AGENDA", href: "#agenda" },
  { title: "SPEAKERS", href: "#speakers" },
  { title: "ABOUT US", href: "#about" },
];

const labels = [
  { icon: Sparkles, label: "Predictive Analytics" },
  { icon: Plug, label: "Machine Learning" },
  { icon: Activity, label: "Natural Language Processing" },
];

const features = [
  {
    icon: BarChart,
    label: "Advanced Analytics",
    description: "Gain deeper insights from your data with our cutting-edge predictive models.",
  },
  {
    icon: Zap,
    label: "Intelligent Automation",
    description: "Streamline your processes with AI-powered automation solutions.",
  },
  {
    icon: Activity,
    label: "Real-time Insights",
    description: "Make informed decisions faster with our real-time data processing capabilities.",
  },
];

export function MynaHero() {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const titleWords = [
    "THE",
    "AI", 
    "REVOLUTION",
    "FOR",
    "BUSINESS",
    "INTELLIGENCE",
  ];

  return (
    <div className="container mx-auto px-4 min-h-screen bg-background text-foreground">
      <header>
        <div className="flex h-20 items-center justify-between border-b border-border/80">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-36 sm:w-44 aspect-[16/9] overflow-hidden">
              <Image
                src="/atlas-logo.png"
                alt="Atlas Conferences & Events"
                fill
                priority
                className="object-contain object-left group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 140px, 180px"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="text-sm font-mono text-foreground/80 hover:text-primary transition-colors font-medium tracking-wider"
              >
                {item.title}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              className="rounded-none hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all"
            >
              GET STARTED <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden border border-border">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                <nav className="flex flex-col gap-6 mt-6">
                  {navigationItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="text-sm font-mono text-foreground hover:text-primary transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                  <Button className="cursor-pointer rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono">
                    GET STARTED <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <section className="container py-20 md:py-28">
          <div className="flex flex-col items-center text-center">
            {/* Animated Title Words */}
            <motion.h1
              initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative font-mono text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight text-foreground"
            >
              {titleWords.map((text, index) => {
                const isHighlight = text === "AI" || text === "INTELLIGENCE";
                return (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.15, 
                      duration: 0.6 
                    }}
                    className={`inline-block mx-2 md:mx-4 ${
                      isHighlight ? "text-primary underline decoration-primary/40 underline-offset-8" : ""
                    }`}
                  >
                    {text}
                  </motion.span>
                );
              })}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground font-mono leading-relaxed"
            >
              We empower businesses with cutting-edge AI solutions to transform
              data into actionable insights.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6"
            >
              {labels.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1.8 + (index * 0.15), 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card border border-border shadow-xs hover:border-primary/50 transition-colors"
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs sm:text-sm font-mono font-medium text-foreground">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 2.4, 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            >
              <Button
                size="lg"
                className="cursor-pointer rounded-none mt-12 bg-primary hover:bg-primary/90 text-primary-foreground font-mono px-8 py-6 text-base shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] transition-all"
              >
                GET STARTED <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* 3-Column Feature Cards */}
        <section className="container pb-24" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 3.0, 
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="text-center text-3xl sm:text-4xl font-mono font-bold mb-10 text-foreground"
          >
            Unlock the Power of AI
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="grid md:grid-cols-3 max-w-6xl mx-auto gap-px bg-border border border-border overflow-hidden"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 3.2 + (index * 0.2), 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="flex flex-col items-center text-center p-8 bg-card hover:bg-secondary/40 transition-colors"
              >
                <div className="mb-6 rounded-full bg-primary/10 border border-primary/20 p-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-mono font-bold text-foreground">
                  {feature.label}
                </h3>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}

