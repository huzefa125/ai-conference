// SAMPLE DATA: prices, tiers and inclusions are placeholders. Replace with the real offer before launch.

export interface Ticket {
  id: string;
  name: string;
  tagline: string;
  price: number | null; // USD; null shows "Contact us"
  priceNote: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

export const TICKETS: Ticket[] = [
  {
    id: "virtual",
    name: "Virtual",
    tagline: "Follow the main stage from anywhere.",
    price: 149,
    priceNote: "per person",
    features: [
      "Live stream of the plenary talks",
      "Session recordings for 90 days",
      "Slides and e-posters",
      "Attendee Q&A chat",
    ],
    cta: "Get virtual pass",
    href: "#register",
  },
  {
    id: "full",
    name: "Full Access",
    tagline: "Three days in Hyderabad, all five tracks.",
    price: 699,
    priceNote: "per person",
    features: [
      "All sessions across five tracks",
      "Workshops and lab sessions",
      "Lunch and refreshments, all days",
      "Poster sessions and networking evenings",
      "Session recordings for one year",
    ],
    cta: "Get full access",
    href: "#register",
    featured: true,
  },
  {
    id: "team",
    name: "Lab & Group",
    tagline: "For labs and departments sending five or more people.",
    price: null,
    priceNote: "volume pricing",
    features: [
      "Everything in Full Access",
      "Group discount from five seats",
      "Group check-in and reserved seating",
      "Invoice and purchase-order billing",
    ],
    cta: "Talk to us",
    href: "#contact",
  },
];
