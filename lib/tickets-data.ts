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
      "Live stream of the main hall",
      "Session recordings for 90 days",
      "Slides and resources",
      "Attendee Q&A chat",
    ],
    cta: "Get virtual pass",
    href: "#register",
  },
  {
    id: "full",
    name: "Full Access",
    tagline: "Three days in Hyderabad, every track.",
    price: 699,
    priceNote: "per person",
    features: [
      "All sessions across five tracks",
      "Workshops and studio sessions",
      "Lunch and refreshments, all days",
      "Networking evenings",
      "Session recordings for one year",
    ],
    cta: "Get full access",
    href: "#register",
    featured: true,
  },
  {
    id: "team",
    name: "Team",
    tagline: "For companies sending five or more people.",
    price: null,
    priceNote: "volume pricing",
    features: [
      "Everything in Full Access",
      "Group discount from five seats",
      "Dedicated seating and team check-in",
      "Invoice and purchase-order billing",
    ],
    cta: "Talk to us",
    href: "#contact",
  },
];
