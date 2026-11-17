// SAMPLE COPY: the About and Contact pages use placeholder facts and contact details.
// Replace every value below with confirmed information before launch.

export const ABOUT = {
  hero: {
    eyebrow: "About Atlas Global",
    title: "Where AI gets built, not just discussed.",
    text: "Atlas Global is a three-day summit for the people who ship AI: founders, engineers, researchers and enterprise leaders, together in Hyderabad.",
  },
  story: {
    title: "Why we run Atlas Global",
    paragraphs: [
      "Most AI events are about what might be possible. We wanted one about what is already working, and what broke along the way.",
      "So every session at Atlas Global comes from someone running AI in production. Talks are specific, workshops are hands-on, and the evenings are designed so you actually meet the people you came to meet.",
      "The summit is organised by Atlas Conferences & Events, with a programme committee that reads every speaker submission.",
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop",
  },
  values: [
    { title: "Practitioners first", text: "Speakers are chosen for what they have built and run, not for their job titles." },
    { title: "Production over hype", text: "We ask every speaker to show what worked, what failed and what it cost." },
    { title: "Rooms you can talk in", text: "Small workshops, shared lunches and open evenings keep the days conversational." },
    { title: "Useful afterwards", text: "Slides, resources and recordings are shared so your whole team benefits." },
  ],
  process: {
    title: "How the programme is built",
    steps: [
      { label: "Open call", text: "Practitioners submit a short proposal for one of the five tracks." },
      { label: "Committee review", text: "The programme committee reads every submission against the same criteria." },
      { label: "Curated tracks", text: "Accepted talks are grouped into tracks and scheduled across three days." },
    ],
  },
  cta: {
    title: "Join us in Hyderabad",
    text: "Nov 18 to 20, 2026. Pick your pass and reserve your seat.",
    primary: { label: "Get your ticket", href: "/#tickets" },
    secondary: { label: "Contact the team", href: "/contact" },
  },
};

export const CONTACT = {
  hero: {
    eyebrow: "Contact",
    title: "Get in touch",
    text: "Questions about tickets, speaking, sponsorship or group bookings? Send us a note and the team will reply.",
  },
  email: "hello@atlas-global.example",
  phone: "+91 00000 00000",
  address: ["Venue to be announced", "Hyderabad, India"],
  hours: "Mon to Fri, 10:00 to 18:00 IST",
  topics: ["Tickets", "Group or team booking", "Speaking", "Sponsorship", "Press and media", "Something else"],
  quick: [
    { label: "Become a sponsor", href: "/#sponsors" },
    { label: "Speak at Atlas Global", href: "/#cfp" },
    { label: "Read the FAQ", href: "/#faq" },
  ],
};
