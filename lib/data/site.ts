// SAMPLE DATA: venue details, sponsors, FAQ answers and contact info are placeholders.
// Dates, city and "1,000+" come from the existing site metadata. Everything else needs confirming.

export const VENUE = {
  eyebrow: "Atlas Global 2026",
  title: "THREE DAYS IN HYDERABAD",
  intro:
    "Atlas Global brings researchers from the life sciences, physical sciences, earth and climate science, data and methods, and science and society together for three days of talks, workshops and poster sessions on how the work actually gets done.",
  image:
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80&fit=crop",
  details: [
    { label: "Dates", value: "Nov 18–20, 2026" },
    { label: "City", value: "Hyderabad, India" },
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
      { name: "Nimbus Instruments", icon: "Cloud" },
      { name: "Quantora", icon: "Atom" },
      { name: "Helix Biosciences", icon: "Dna" },
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
  { icon: "ChalkboardTeacher", title: "Hear it from the bench", text: "Talks from the people who ran the experiments and the fieldwork: methods, data and what failed, not just the headline result." },
  { icon: "Wrench", title: "Hands-on workshops", text: "Work through real methods problems, from study design to reproducible analysis, in small sessions with a facilitator." },
  { icon: "Target", title: "Five focused tracks", text: "Life Sciences, Physical Sciences, Earth & Climate, Data & Methods, and Science & Society. Pick yours or move between them." },
  { icon: "Users", title: "Meet collaborators", text: "Poster sessions, shared lunches and evenings with researchers from other labs, fields and countries." },
  { icon: "Broadcast", title: "Attend from anywhere", text: "A live stream and recordings for people who cannot travel to Hyderabad." },
  { icon: "Notebook", title: "Take it back to the lab", text: "Slides, posters, links to code and data, and recordings so your group can revisit what mattered." },
];

// Stock photos (Unsplash) as stand-ins. They are NOT from Atlas Global; replace with photos from your own events.
export const GALLERY = [
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80&fit=crop", alt: "Conference audience", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80&fit=crop", alt: "Speaker on stage", span: "" },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80&fit=crop", alt: "Keynote session", span: "" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80&fit=crop", alt: "Networking", span: "" },
  { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80&fit=crop", alt: "Workshop", span: "" },
  { src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1000&q=80&fit=crop", alt: "Main stage", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1000&q=80&fit=crop", alt: "Speaker addressing the audience", span: "col-span-2" },
];

export const FAQS = [
  {
    q: "When and where is Atlas Global 2026?",
    a: "November 18–20, 2026 in Hyderabad, India. The exact venue will be announced soon.",
  },
  {
    q: "Who is the conference for?",
    a: "Researchers at every career stage, from PhD students to principal investigators, plus research engineers, lab managers, funders and science communicators. Each of the five tracks lists the audience it is built for.",
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
    a: "Yes. The Team pass covers labs, departments and groups of five or more. Contact us for volume pricing and invoicing.",
  },
  {
    q: "How do I present a talk or poster, or become a sponsor?",
    a: "Talks and posters go through the open call: send a short proposal or abstract for one of the five tracks. For sponsorship, get in touch through the contact details below and we will reply with next steps.",
  },
];

export const FOOTER = {
  brand: "Atlas Conferences & Events",
  blurb: "Atlas Global 2026. Nov 18–20, Hyderabad, India.",
  email: "hello@atlas-global.example", // PLACEHOLDER: replace with the real contact email
  columns: [
    {
      title: "Event",
      links: [
        { label: "About", href: "/about" },
        { label: "Tracks", href: "/#tracks" },
        { label: "Agenda", href: "/#agenda" },
        { label: "Speakers", href: "/#speakers" },
      ],
    },
    {
      title: "Attend",
      links: [
        { label: "Tickets", href: "/#tickets" },
        { label: "Sponsors", href: "/#sponsors" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    // PLACEHOLDER contact details: replace with the real ones before launch.
    {
      title: "Contact",
      links: [
        { label: "hello@atlas-global.example", href: "mailto:hello@atlas-global.example" },
        { label: "+91 00000 00000", href: "tel:+910000000000" },
        { label: "Hyderabad, India", href: "/#travel" },
        { label: "Contact us", href: "/contact" },
      ],
    },
  ],
  // PLACEHOLDER social and legal links: point these at the real pages.
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Instagram", href: "#" },
  ],
  legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Code of conduct", href: "#" },
  ],
};

// SAMPLE DATA: travel details and call-for-speakers dates are placeholders. Confirm before launch.
export const TRAVEL = [
  {
    icon: "AirplaneLanding",
    title: "Getting there",
    text: "Hyderabad is served by Rajiv Gandhi International Airport (HYD). App-based cabs and airport buses connect it to the city centre; the metro does not reach the airport yet.",
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

// Practical travel facts under the route on the home page. Venue-dependent facts stay "with the venue
// announcement" until the venue is confirmed: do not add distances or hotels before then.
export const TRAVEL_FACTS = [
  {
    icon: "plane",
    label: "Closest airport",
    value: "Rajiv Gandhi International (HYD)",
    note: "At Shamshabad, roughly 25–30 km from the city centre. Direct flights from the Gulf, Southeast Asia and Europe, plus most Indian cities.",
  },
  {
    icon: "taxi",
    label: "Airport to city",
    value: "Cab or airport bus",
    note: "App-based cabs and prepaid taxis wait outside arrivals; TGSRTC Pushpak airport buses run to major city areas. Allow 45–90 minutes by road.",
  },
  {
    icon: "venue",
    label: "Venue distance",
    value: "With the venue announcement",
    note: "Exact distance and travel time from the airport will be listed here once the venue is confirmed.",
  },
  {
    icon: "hotel",
    label: "Hotels nearby",
    value: "Delegate rates coming",
    note: "A block of rooms at a delegate rate near the venue will be published with the venue. We never book rooms through third-party agents.",
  },
  {
    icon: "visa",
    label: "International attendees",
    value: "e-Visa + invitation letter",
    note: "Many nationalities can apply for an Indian e-Visa online at indianvisaonline.gov.in. Registered attendees can request an invitation letter.",
  },
  {
    icon: "clock",
    label: "Time zone",
    value: "IST, UTC+5:30",
    note: "No daylight saving. Sessions run 09:00–18:00 local time.",
  },
  {
    icon: "weather",
    label: "Weather in November",
    value: "Dry and mild",
    note: "Typically around 16–29°C, with cool mornings and evenings. Bring a light layer for air-conditioned halls.",
  },
  {
    icon: "money",
    label: "Money and power",
    value: "Indian rupee (INR) · 230V",
    note: "Cards and UPI are widely accepted. Plugs are types C, D and M; bring an adapter.",
  },
] as const;

export const CFP = {
  title: "SPEAK AT ATLAS GLOBAL",
  text: "We are looking for researchers with work to share: a method, a dataset, a result that held up or one that didn't. Submit a talk proposal or a poster abstract, tell us what other researchers will take away, and we will take it from there.",
  steps: [
    { label: "Submit", text: "Send a talk proposal or poster abstract for one of the five tracks." },
    { label: "Review", text: "The programme committee reads every submission." },
    { label: "Confirm", text: "Accepted speakers get a slot and presenters a poster board, plus logistics support." },
  ],
  cta: "Submit an abstract",
  href: "#contact",
  note: "Abstract deadline to be announced.",
};

// Stock photos (Unsplash) as stand-ins. They are NOT from Atlas Global; replace with photos from your own events.
export const EXPERIENCE = [
  { id: "stage", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80&fit=crop", title: "Main stage", description: "Keynotes and panels" },
  { id: "talks", url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&q=80&fit=crop", title: "Live sessions", description: "Talks from researchers" },
  { id: "workshops", url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1000&q=80&fit=crop", title: "Workshops", description: "Hands-on methods sessions" },
  { id: "network", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=80&fit=crop", title: "Networking", description: "Evenings with peers" },
  { id: "hall", url: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1000&q=80&fit=crop", title: "The venue", description: "Three days in Hyderabad" },
];
