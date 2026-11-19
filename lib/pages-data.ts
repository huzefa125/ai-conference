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
    // Same word-by-word reveal as the home page statement; pills mark the key phrases.
    leadSegments: [
      { text: "Most AI events are about what might be possible. We wanted one about" },
      { text: "what already works", pill: "accent-solid" as const },
      { text: ", and" },
      { text: "what broke", pill: "maroon-solid" as const },
      { text: "along the way." },
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop",
    image2: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80&fit=crop",
    banner: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1800&q=80&fit=crop",
    ctaImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1800&q=80&fit=crop",
  },
  // Core values: shown as a two-column list on the About page.
  values: [
    { title: "Practitioners first", text: "Speakers are chosen for what they have built and run, not for the title on their badge. We would rather hear from the engineer who shipped it than the slide that announced it." },
    { title: "Honest about what works", text: "Every talk shows what worked, what failed and what it cost. No hype, and no sales pitches dressed up as keynotes." },
    { title: "Built for conversation", text: "Small workshops, shared lunches and open evenings keep the three days conversational, so you leave with people to call, not just notes." },
    { title: "Open to everyone", text: "Students, founders and enterprise teams sit in the same sessions. A good question matters more than seniority." },
    { title: "Respect for your time", text: "Sessions start on time, talks stay focused and every track is planned so you never sit through filler." },
    { title: "Value that lasts", text: "Slides, resources and recordings are shared after the event, so your whole team benefits, not just the people who attended." },
  ],
  // SAMPLE TEAM: fictional names with stock portraits (Unsplash). Replace with the real team and their photos.
  team: [
    { name: "Arjun Varma", role: "Summit Director", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=faces", linkedin: "#" },
    { name: "Sana Kapoor", role: "Head of Programme", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&fit=crop&crop=faces", linkedin: "#" },
    { name: "Dev Malhotra", role: "Partnerships Lead", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop&crop=faces", linkedin: "#" },
    { name: "Leela Menon", role: "Attendee Experience", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&fit=crop&crop=faces", linkedin: "#" },
    { name: "Kabir Sethi", role: "Production Lead", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&fit=crop&crop=faces", linkedin: "#" },
    { name: "Tara Bose", role: "Speaker Relations", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&fit=crop&crop=faces", linkedin: "#" },
  ],
  // SAMPLE QUOTE from the (fictional) team above. Replace with a real one.
  teamQuote: {
    text: "We build the event we always wanted to attend: specific talks, honest speakers and rooms where you can actually meet people.",
    name: "Arjun Varma",
    role: "Summit Director",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=faces",
  },
  city: {
    title: "Why Hyderabad",
    text: "We chose Hyderabad because the people building AI are already here. It is one of India's largest technology hubs, easy to reach and a great city to spend three days in.",
    coords: "17.3850° N, 78.4867° E",
    image: "https://images.unsplash.com/photo-1657981630164-769503f3a9a8?w=1000&q=80&fit=crop",
    facts: [
      { icon: "Code", title: "A tech capital", text: "HITEC City and the Financial District are home to engineering teams from global and Indian tech companies." },
      { icon: "Buildings", title: "Builders nearby", text: "A deep pool of engineers, researchers and founders means the room is full of practitioners." },
      { icon: "AirplaneTilt", title: "Easy to reach", text: "Rajiv Gandhi International Airport (HYD) has domestic and international connections." },
      { icon: "ForkKnife", title: "Worth the trip", text: "From the Charminar to Hyderabadi biryani, the evenings are part of the experience." },
    ],
  },
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
    text: "Three days of talks, workshops and the people building AI. Pick your pass and reserve your seat.",
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
  // Topic cards: "topic" must match one of `topics` so the form can preselect it.
  help: [
    { icon: "Ticket", title: "Tickets and groups", text: "Passes, invoices and bookings for five or more people.", topic: "Group or team booking" },
    { icon: "MicrophoneStage", title: "Speaking", text: "Questions about the call for speakers and your proposal.", topic: "Speaking" },
    { icon: "Handshake", title: "Sponsorship", text: "Partner packages and how to get your team in the room.", topic: "Sponsorship" },
    { icon: "Newspaper", title: "Press and media", text: "Press passes, interviews and media enquiries.", topic: "Press and media" },
  ],
  quick: [
    { label: "Become a sponsor", href: "/#sponsors" },
    { label: "Speak at Atlas Global", href: "/#cfp" },
    { label: "Read the FAQ", href: "#contact-faq" },
  ],
};
