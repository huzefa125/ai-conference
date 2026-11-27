// SAMPLE COPY: the About and Contact pages use placeholder facts and contact details.
// Replace every value below with confirmed information before launch.

export const ABOUT = {
  hero: {
    eyebrow: "About Atlas Global",
    title: "Where science gets done, not just presented.",
    // Big uppercase headline, one entry per line; the last line is set in brand blue.
    lines: ["Built for", "people who", "do science."],
    // Written in by the animated pen under the headline.
    note: "...and the experiments that failed.",
    caption: "The main hall",
    link: { label: "Read our story", href: "#story" },
    text: "Atlas Global is a three-day summit for the people who do the research: scientists, lab and field teams, research engineers and the people who fund them, together in Hyderabad.",
  },
  story: {
    title: "Why we run Atlas Global",
    paragraphs: [
      "Most science conferences are a parade of polished results. We wanted one about what the data showed, and what didn't replicate along the way.",
      "So every session at Atlas Global comes from someone doing the work: in the lab, in the field or at the analysis bench. Talks cover methods, data, what failed and what it cost, workshops are hands-on, and the evenings are designed so you actually meet the people you came to meet.",
      "The summit is organised by Atlas Conferences & Events, with a programme committee that reads every talk proposal and poster abstract.",
    ],
    // Same word-by-word reveal as the home page statement; pills mark the key phrases.
    leadSegments: [
      { text: "Most science conferences are a parade of polished results. We wanted one about" },
      { text: "what the data showed", pill: "accent-solid" as const },
      { text: ", and" },
      { text: "what didn't replicate", pill: "maroon-solid" as const },
      { text: "along the way." },
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop",
    image2: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80&fit=crop",
    banner: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1800&q=80&fit=crop",
    ctaImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1800&q=80&fit=crop",
  },
  // Core values: header copy, a handwritten aside, then a 3x2 grid on the About page.
  valuesIntro: {
    eyebrow: "What we stand for",
    text: "The rules we use to pick speakers, review abstracts and run the three days. If a decision breaks one of these, we change the decision.",
    note: "six promises, no spin.",
  },
  values: [
    { title: "Researchers first", text: "Speakers are chosen for the work they have done, not for the title on their badge. We would rather hear from the postdoc who ran the experiment than the press release that announced it." },
    { title: "Methods, not just results", text: "Every talk shows how the work was done: the design, the data, what failed and what it cost. No spin, and no sales pitches dressed up as keynotes." },
    { title: "Built for conversation", text: "Small workshops, poster sessions, shared lunches and open evenings keep the three days conversational, so you leave with collaborators, not just notes." },
    { title: "Open across fields", text: "PhD students, principal investigators and industry scientists from every track sit in the same sessions. A good question matters more than seniority." },
    { title: "Respect for your time", text: "Sessions start on time, talks stay focused and every track is planned so you never sit through filler." },
    { title: "Open by default", text: "Slides, posters, links to code and data, and recordings are shared after the event, so your whole group benefits, not just the people who attended." },
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
    text: "We build the meeting we always wanted to attend: talks about how the work was really done, honest speakers and rooms where you can actually meet people.",
    name: "Arjun Varma",
    role: "Summit Director",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=faces",
  },
  city: {
    title: "Why Hyderabad",
    text: "We chose Hyderabad because a lot of the research is already happening here. The city has major universities, national research institutes and one of India's largest life-sciences clusters, and it is easy to reach and a great place to spend three days.",
    coords: "17.3850° N, 78.4867° E",
    image: "https://images.unsplash.com/photo-1657981630164-769503f3a9a8?w=1000&q=80&fit=crop",
    facts: [
      { icon: "Flask", title: "A research city", text: "Universities and national institutes such as CCMB, NGRI and ICRISAT work across biology, geoscience and agriculture." },
      { icon: "Dna", title: "Genome Valley", text: "A large biotech and pharma cluster on the edge of the city, with research labs and R&D teams close by." },
      { icon: "AirplaneTilt", title: "Easy to reach", text: "Rajiv Gandhi International Airport (HYD) has domestic and international connections." },
      { icon: "ForkKnife", title: "Worth the trip", text: "From the Charminar to Hyderabadi biryani, the evenings are part of the experience." },
    ],
  },
  process: {
    title: "How the programme is built",
    steps: [
      { label: "Open call", text: "Researchers submit a talk proposal or poster abstract for one of the five tracks." },
      { label: "Committee review", text: "A programme committee drawn from each field reads every submission against the same criteria." },
      { label: "Curated tracks", text: "Accepted talks and posters are grouped into tracks and scheduled across three days." },
    ],
  },
  // Closing "passes" section: headline on the left, two ticket-shaped cards on the right.
  passes: {
    eyebrow: "Next summit",
    titleLead: "Share your work",
    titleMid: "at",
    titleBrand: "Atlas",
    titleTail: "Global",
    text: "Three days of talks, workshops, posters and the people doing the research.",
    cards: [
      {
        variant: "perforated" as const,
        tag: "Teams of 5+",
        title: "Bring your whole lab",
        text: "Group passes for labs and departments, one invoice and seats together for every session. Tell us how many are coming and we'll put an offer together.",
        cta: { label: "Plan a group booking", href: "/contact?topic=Group%20or%20team%20booking" },
      },
      {
        variant: "notched" as const,
        tag: "Admit one",
        title: "Get your ticket now",
        text: "Talks, hands-on workshops, poster sessions, lunches and the evenings, plus recordings after the event.",
        cta: { label: "Choose your pass", href: "/#tickets" },
      },
    ],
  },
  cta: {
    title: "Join us in Hyderabad",
    text: "Three days of talks, workshops and the people doing the research. Pick your pass and reserve your seat.",
    primary: { label: "Get your ticket", href: "/#tickets" },
    secondary: { label: "Contact the team", href: "/contact" },
  },
};

export const CONTACT = {
  hero: {
    eyebrow: "Contact",
    title: "Get in touch",
    text: "Questions about tickets, speaking, posters, sponsorship or group bookings? Send us a note and the team will reply.",
  },
  email: "hello@atlas-global.example",
  phone: "+91 00000 00000",
  address: ["Venue to be announced", "Hyderabad, India"],
  hours: "Mon to Fri, 10:00 to 18:00 IST",
  topics: ["Tickets", "Group or team booking", "Speaking", "Posters and abstracts", "Sponsorship", "Press and media", "Something else"],
  // Topic cards: "topic" must match one of `topics` so the form can preselect it.
  help: [
    { icon: "Ticket", title: "Tickets and groups", text: "Passes, invoices and bookings for labs and groups of five or more.", topic: "Group or team booking" },
    { icon: "MicrophoneStage", title: "Speaking and posters", text: "Questions about the call for talks and posters, or your abstract.", topic: "Speaking" },
    { icon: "Handshake", title: "Sponsorship", text: "Partner packages for institutes, funders and companies that support research.", topic: "Sponsorship" },
    { icon: "Newspaper", title: "Press and media", text: "Press passes, interviews with speakers and media enquiries.", topic: "Press and media" },
  ],
  quick: [
    { label: "Become a sponsor", href: "/#sponsors" },
    { label: "Speak at Atlas Global", href: "/#cfp" },
    { label: "Read the FAQ", href: "#contact-faq" },
  ],
};
