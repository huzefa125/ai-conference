// SAMPLE DATA: venue details, sponsors, FAQ answers and contact info are placeholders.
// Dates, city and "1,000+" come from the existing site metadata. Everything else needs confirming.

export const VENUE = {
  eyebrow: "Atlas Global 2026",
  title: "THREE DAYS IN SAN FRANCISCO",
  intro:
    "Atlas Global brings founders, engineers, researchers and enterprise leaders together for three days of talks, workshops and working sessions on AI in production.",
  image:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1400&q=80&fit=crop",
  details: [
    { label: "Dates", value: "Nov 18–20, 2026" },
    { label: "City", value: "San Francisco, California" },
    { label: "Venue", value: "To be announced" },
    { label: "Format", value: "In person, with a live stream" },
  ],
  stats: [
    { value: "3", label: "Days" },
    { value: "5", label: "Tracks" },
    { value: "1,000+", label: "Attendees" },
  ],
};

export interface SponsorSlot {
  name: string;
  icon?: string; // placeholder mark (icon key); swap for `logo` when real
  logo?: string; // path under /public, e.g. "/sponsors/acme.svg"
}

// FICTIONAL placeholder companies. Not real sponsors; replace with confirmed sponsors and their logos.
export const SPONSORS: { tier: string; slots: SponsorSlot[] }[] = [
  {
    tier: "Headline partners",
    slots: [
      { name: "Nimbus Systems", icon: "Cloud" },
      { name: "Quantora", icon: "Atom" },
      { name: "Helix Data", icon: "Dna" },
    ],
  },
  {
    tier: "Partners",
    slots: [
      { name: "Brightpath", icon: "SunHorizon" },
      { name: "Orbital", icon: "Planet" },
      { name: "Stratus Labs", icon: "Flask" },
      { name: "Kestrel", icon: "Bird" },
      { name: "Meridian", icon: "GlobeHemisphereWest" },
      { name: "Vantage", icon: "Mountains" },
    ],
  },
];

export const WHY_ATTEND = [
  { icon: "ChalkboardTeacher", title: "Learn from practitioners", text: "Sessions led by people who run AI systems in production, not just talk about them." },
  { icon: "Wrench", title: "Hands-on workshops", text: "Work through real problems in small studio sessions with a facilitator." },
  { icon: "Target", title: "Five focused tracks", text: "Pick the track for your role: research, engineering, infrastructure, product or strategy." },
  { icon: "Handshake", title: "Meet your peers", text: "Networking evenings and shared lunches with founders, engineers and executives." },
  { icon: "Broadcast", title: "Attend from anywhere", text: "A live stream and recordings for people who cannot travel to San Francisco." },
  { icon: "Notebook", title: "Take it home", text: "Slides, resources and recordings so your team can revisit what mattered." },
];

// Stock photos (Unsplash) as stand-ins. They are NOT from Atlas Global; replace with photos from your own events.
export const GALLERY = [
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80&fit=crop", alt: "Conference audience", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80&fit=crop", alt: "Speaker on stage", span: "" },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80&fit=crop", alt: "Keynote session", span: "" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80&fit=crop", alt: "Networking", span: "" },
  { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80&fit=crop", alt: "Workshop", span: "" },
  { src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1000&q=80&fit=crop", alt: "Main stage", span: "col-span-2" },
];

export const FAQS = [
  {
    q: "When and where is Atlas Global 2026?",
    a: "November 18–20, 2026 in San Francisco. The exact venue will be announced soon.",
  },
  {
    q: "Who is the conference for?",
    a: "Founders, engineers, researchers and enterprise leaders. Each of the five tracks lists the audience it is built for.",
  },
  {
    q: "Can I attend online?",
    a: "Yes. The Virtual pass includes the live stream of the main hall and session recordings.",
  },
  {
    q: "Are sessions recorded?",
    a: "Main hall sessions are recorded. Recordings are available to Virtual and Full Access pass holders for the period listed on each pass.",
  },
  {
    q: "Do you offer group or company rates?",
    a: "Yes. The Team pass covers groups of five or more. Contact us for volume pricing and invoicing.",
  },
  {
    q: "How do I become a speaker or sponsor?",
    a: "Get in touch through the contact details below and tell us which you are interested in. We will reply with next steps.",
  },
];

export const FOOTER = {
  brand: "Atlas Conferences & Events",
  blurb: "Atlas Global 2026. Nov 18–20, San Francisco.",
  email: "", // add a contact email to show it in the footer
  columns: [
    {
      title: "Event",
      links: [
        { label: "About", href: "#about" },
        { label: "Tracks", href: "#tracks" },
        { label: "Agenda", href: "#agenda" },
        { label: "Speakers", href: "#speakers" },
      ],
    },
    {
      title: "Attend",
      links: [
        { label: "Tickets", href: "#tickets" },
        { label: "Sponsors", href: "#sponsors" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
};

// SAMPLE DATA: travel details and call-for-speakers dates are placeholders. Confirm before launch.
export const TRAVEL = [
  {
    icon: "AirplaneTilt",
    title: "Getting there",
    text: "San Francisco is served by SFO, with Oakland (OAK) and San Jose (SJC) as nearby alternatives. BART and rideshare connect each to downtown.",
  },
  {
    icon: "Bed",
    title: "Where to stay",
    text: "A discounted hotel block near the venue will be listed here once the venue is confirmed.",
  },
  {
    icon: "Wheelchair",
    title: "Access and visas",
    text: "Tell us about accessibility needs when you register. Visa invitation letters are available to registered attendees on request.",
  },
];

export const CFP = {
  title: "SPEAK AT ATLAS GLOBAL",
  text: "We are looking for practitioners with something specific to teach. Pick a track, tell us what attendees will be able to do afterwards, and we will take it from there.",
  steps: [
    { label: "Submit", text: "Send a short proposal for one of the five tracks." },
    { label: "Review", text: "The program committee reads every submission." },
    { label: "Confirm", text: "Accepted speakers get a slot, a room and logistics support." },
  ],
  cta: "Submit a proposal",
  href: "#contact",
  note: "Submission deadline to be announced.",
};
