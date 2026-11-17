export type RevealSegment =
  | { text: string }
  | {
      text: string;
      pill: "accent" | "maroon" | "accent-solid" | "maroon-solid";
      icon?: string;
      iconAlt?: string;
      iconPosition?: "left" | "right";
      iconClassName?: string;
    }
  | { text: string; bold: true };

export const aboutDesk: {
  segments: RevealSegment[];
  pillars: { label: string; detail: string }[];
} = {
  segments: [
    { text: "Atlas Global is where AI gets built, not just discussed. Join" },
    { text: "1,000+ builders", pill: "accent-solid", icon: "/bloub-default-cycle.gif", iconAlt: "", iconPosition: "right" },
    { text: ". Across" },
    { text: "5 focused tracks", pill: "maroon-solid" },
    { text: "you will hear from" },
    { text: "working practitioners", pill: "accent" },
    { text: "and join hands-on" },
    { text: "workshops", pill: "maroon" },
    { text: ". Every session is built only from" },
    { text: "real production experience", pill: "accent-solid" },
    { text: "shared on stage, never theory. What you take home stays" },
    { text: "yours to use", pill: "maroon-solid" },
    { text: ", giving your team the confidence to ship." },
  ],
  pillars: [
    { label: "Production focused", detail: "Every talk comes from teams running AI in the real world." },
    { label: "Three days, five tracks", detail: "A clear schedule so you can plan your days before you arrive." },
    { label: "Recordings included", detail: "Watch sessions you missed, with slides and resources." },
  ],
};
