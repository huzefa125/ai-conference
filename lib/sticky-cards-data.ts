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
    title: "Keynotes on the main stage",
    description:
      "Open with talks from the people running AI in production. Hear what worked, what broke, and what they would do differently.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80&fit=crop",
    bgColor: "bg-[#e8effd]",
  },
  {
    eyebrow: "Day 2",
    title: "Hands-on workshops",
    description:
      "Small studio sessions led by practitioners. Work through a real problem with a facilitator and leave with something you can use on Monday.",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1000&q=80&fit=crop",
    bgColor: "bg-accent",
  },
  {
    eyebrow: "Every evening",
    title: "Meet the builders",
    description:
      "Networking evenings and shared lunches put you at the same table as founders, engineers and enterprise leaders in your field.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=80&fit=crop",
    bgColor: "bg-secondary",
  },
  {
    eyebrow: "Day 3 and after",
    title: "Take it all home",
    description:
      "Slides, resources and session recordings are yours after the event, so your whole team can catch up on what they missed.",
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1000&q=80&fit=crop",
    bgColor: "bg-muted",
  },
];
