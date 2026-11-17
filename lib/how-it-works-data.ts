export type StepTheme = "primary" | "navy" | "cream";

export const HOW_IT_WORKS = {
  title: "Three simple steps to your seat.",
  intro:
    "Pick your pass, confirm your details, and arrive ready. We handle everything in between.",
  steps: [
    {
      number: "01",
      title: "Choose your pass",
      body: "Pick the ticket that fits you, from a single day to the full three days at Atlas Global.",
      theme: "primary" as StepTheme,
    },
    {
      number: "02",
      title: "Confirm your details",
      body: "Share your name, company, and email. We send your confirmation and your personal schedule right away.",
      theme: "navy" as StepTheme,
    },
    {
      number: "03",
      title: "Arrive and connect",
      body: "Show your QR code at the door, collect your badge, and meet the speakers and founders you came for.",
      theme: "cream" as StepTheme,
    },
  ],
  cta: {
    title: "Walk in ready.",
    body: "When your plan is set before the doors open, you spend the days learning and meeting people instead of queueing.",
    label: "Get your ticket",
    href: "#tickets",
  },
};
