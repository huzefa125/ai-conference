// Conferences shown in the navbar dropdown and on /conferences.
// Atlas Global 2026 is the real flagship event (its full details live on the home page).
// The other entries are SAMPLE placeholders: replace names, cities, dates and images with real events.

export type Conference = {
  slug: string;
  name: string;
  city: string;
  dates: string;
  status: "Flagship" | "Upcoming" | "Coming soon";
  summary: string;
  image: string;
  href: string;
};

export const CONFERENCES: Conference[] = [
  {
    slug: "atlas-global-2026",
    name: "Atlas Global 2026",
    city: "Hyderabad, India",
    dates: "Nov 18–20, 2026",
    status: "Flagship",
    summary: "Three days of talks, lab sessions and poster sessions across five research tracks, led by the people doing the science.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop",
    href: "/",
  },
  {
    slug: "sample-event-one",
    name: "SAMPLE: Atlas Life Sciences Forum",
    city: "Bengaluru, India",
    dates: "Dates TBA",
    status: "Upcoming",
    summary: "Placeholder event. Replace with the real name, city, dates and a short description.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&fit=crop",
    href: "/conferences#sample-event-one",
  },
  {
    slug: "sample-event-two",
    name: "SAMPLE: Atlas Earth & Climate Meeting",
    city: "Mumbai, India",
    dates: "Dates TBA",
    status: "Coming soon",
    summary: "Placeholder event. Replace with the real name, city, dates and a short description.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&fit=crop",
    href: "/conferences#sample-event-two",
  },
  {
    slug: "sample-event-three",
    name: "SAMPLE: Atlas Research Methods Day",
    city: "Ahmedabad, India",
    dates: "Dates TBA",
    status: "Coming soon",
    summary: "Placeholder event. Replace with the real name, city, dates and a short description.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80&fit=crop",
    href: "/conferences#sample-event-three",
  },
];
