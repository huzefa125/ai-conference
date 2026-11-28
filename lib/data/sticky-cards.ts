// Stock photos (Unsplash) as stand-ins. They are NOT from Atlas Global; replace with photos from your own events.
export interface StickyFeature {
  title: string;
  eyebrow: string;
  description: string;
  imageUrl: string;
  /** Tailwind background class from the Atlas theme. */
  bgColor: string;
}

export const STICKY_FEATURES: StickyFeature[] = [
  {
    eyebrow: "Day 1",
    title: "Plenary talks from working researchers",
    description:
      "Open with talks from the people doing the research. Hear how the study was designed, what the data showed, and what they would do differently.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80&fit=crop",
    bgColor: "bg-[#eef3ff]",
  },
  {
    eyebrow: "Day 2",
    title: "Workshops and lab sessions",
    description:
      "Small hands-on sessions led by researchers. Work through a real protocol, dataset or analysis and leave with something you can use back in the lab.",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1000&q=80&fit=crop",
    bgColor: "bg-accent",
  },
  {
    eyebrow: "Lunchtimes and evenings",
    title: "Posters and people",
    description:
      "Poster sessions over lunch and open evenings put you at the same table as PhD students, postdocs, lab managers and PIs working on problems close to yours.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=80&fit=crop",
    bgColor: "bg-secondary",
  },
  {
    eyebrow: "Day 3 and after",
    title: "Take it all home",
    description:
      "Slides, posters and session recordings are yours after the event, so the rest of your group can catch up on what they missed.",
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1000&q=80&fit=crop",
    bgColor: "bg-muted",
  },
];
