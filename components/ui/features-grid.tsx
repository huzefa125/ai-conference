"use client";

import * as React from "react";
import { BarChart, Zap, Activity } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

export interface FeatureCardItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

export interface FeaturesGridProps {
  title?: string;
  features?: FeatureCardItem[];
  className?: string;
}

const DEFAULT_FEATURES: FeatureCardItem[] = [
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

export function FeaturesGrid({
  title = "Unlock the Power of AI",
  features = DEFAULT_FEATURES,
  className = "",
}: FeaturesGridProps) {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section className={`pb-24 ${className}`} ref={ref}>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="text-center text-3xl sm:text-4xl font-mono font-bold mb-10 text-foreground"
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid md:grid-cols-3 max-w-6xl mx-auto gap-px bg-border border border-border overflow-hidden"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                delay: 0.2 + index * 0.18,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="flex flex-col items-center text-center p-8 bg-card hover:bg-secondary/40 transition-colors"
            >
              <div className="mb-6 rounded-full bg-primary/10 border border-primary/20 p-4">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-mono font-bold text-foreground">
                {feature.label}
              </h3>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

