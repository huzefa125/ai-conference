import {
  BrainCircuit, Dna, Cog, FlaskConical, Leaf, Pill, Globe2, Presentation, Mic, Users, Factory, Lightbulb,
} from "lucide-react";

/* Statistics (SAMPLE PLACEHOLDERS. Replace with verified figures) */
export const stats = [
  { value: "00+", label: "Annual Conferences" },
  { value: "00,000+", label: "Global Participants" },
  { value: "00+", label: "Countries Represented" },
  { value: "0,000+", label: "Academic Publications" },
];

/* Disciplines. `slug` is used by /conferences/category/[slug]. */
export const disciplines = [
  { slug: "artificial-intelligence", name: "Artificial Intelligence", description: "Machine learning, robotics, language models and the responsible use of intelligent systems.", icon: BrainCircuit, image: "/images/keynote.jpg" },
  { slug: "medical-life-sciences", name: "Medical & Life Sciences", description: "Genomics, clinical research, neuroscience and translational medicine.", icon: Dna, image: "/images/lab-2.jpg" },
  { slug: "engineering-technology", name: "Engineering & Technology", description: "Energy systems, robotics, computing, communications and smart infrastructure.", icon: Cog, image: "/images/lecture.jpg" },
  { slug: "chemistry-materials", name: "Chemistry & Materials", description: "Catalysis, polymers, nanomaterials and sustainable chemical processes.", icon: FlaskConical, image: "/images/lab.jpg" },
  { slug: "environmental-sciences", name: "Environmental Sciences", description: "Climate science, biodiversity, water resources and sustainable development.", icon: Leaf, image: "/images/stage.jpg" },
  { slug: "pharmaceutical-research", name: "Pharmaceutical Research", description: "Drug discovery, formulation, pharmacology and regulatory science.", icon: Pill, image: "/images/panel.jpg" },
] as const;

export type DisciplineSlug = (typeof disciplines)[number]["slug"];

/* Conferences (SAMPLE LISTINGS) */
export type Mode = "In-person" | "Virtual" | "Hybrid";

export type AgendaSession = { time: string; title: string; type: "Keynote" | "Session" | "Panel" | "Workshop" | "Break" | "Poster" | "Ceremony"; speaker?: string };
export type AgendaDay = { day: string; date: string; sessions: AgendaSession[] };

export type Conference = {
  /** Also the URL slug: /conferences/[id] */
  id: string;
  title: string;
  shortTitle: string;
  discipline: string;
  disciplineSlug: DisciplineSlug;
  date: string;
  /** ISO start, used by the countdown and for sorting. */
  startDate: string;
  location: string;
  mode: Mode;
  description: string;
  overview: string;
  image: string;
  venue: { name: string; address: string; city: string; mapQuery: string };
  topics: string[];
  deadlines: { label: string; date: string }[];
  fees: { category: string; early: string; standard: string }[];
  agenda: AgendaDay[];
  /** Speaker slugs from lib/content.ts */
  speakerSlugs: string[];
};

const standardFees = [
  { category: "Academic delegate", early: "$000", standard: "$000" },
  { category: "Industry delegate", early: "$000", standard: "$000" },
  { category: "Student", early: "$000", standard: "$000" },
  { category: "Virtual attendance", early: "$000", standard: "$000" },
];

const agendaTemplate = (d1: string, d2: string, d3?: string): AgendaDay[] => [
  {
    day: "Day 1",
    date: d1,
    sessions: [
      { time: "08:30", title: "Registration and welcome coffee", type: "Break" },
      { time: "09:30", title: "Opening ceremony and welcome address", type: "Ceremony" },
      { time: "10:00", title: "Opening keynote (sample title)", type: "Keynote", speaker: "Dr. Jonathan Reyes" },
      { time: "11:00", title: "Scientific session 1: emerging methods", type: "Session" },
      { time: "13:00", title: "Lunch and networking", type: "Break" },
      { time: "14:00", title: "Panel discussion: research to practice", type: "Panel" },
      { time: "16:00", title: "Poster session and exhibition", type: "Poster" },
    ],
  },
  {
    day: "Day 2",
    date: d2,
    sessions: [
      { time: "09:00", title: "Plenary keynote (sample title)", type: "Keynote", speaker: "Dr. Elena Marchetti" },
      { time: "10:00", title: "Scientific session 2: applied research", type: "Session" },
      { time: "11:30", title: "Hands-on workshop (sample)", type: "Workshop" },
      { time: "13:00", title: "Lunch and networking", type: "Break" },
      { time: "14:00", title: "Young researcher forum", type: "Session" },
      { time: "16:30", title: d3 ? "Session wrap-up" : "Awards and closing ceremony", type: "Ceremony" },
    ],
  },
  ...(d3
    ? [
        {
          day: "Day 3",
          date: d3,
          sessions: [
            { time: "09:00", title: "Closing keynote (sample title)", type: "Keynote" as const, speaker: "Prof. Anders Lindqvist" },
            { time: "10:00", title: "Scientific session 3: future directions", type: "Session" as const },
            { time: "12:00", title: "Best paper awards and closing ceremony", type: "Ceremony" as const },
          ],
        },
      ]
    : []),
];

export const conferences: Conference[] = [
  {
    id: "ai-2027",
    title: "International Conference on Artificial Intelligence and Machine Learning",
    shortTitle: "AI & ML 2027",
    discipline: "Artificial Intelligence",
    disciplineSlug: "artificial-intelligence",
    date: "14 to 16 March 2027",
    startDate: "2027-03-14T09:00:00Z",
    location: "London, United Kingdom",
    mode: "In-person",
    description: "Sample description: advances in learning systems, responsible AI and applied intelligence across industries.",
    overview:
      "Sample overview. This three-day programme brings together researchers, engineers and industry practitioners to share progress in machine learning, language models, computer vision and the responsible deployment of intelligent systems. Expect keynote talks, peer-reviewed paper sessions, hands-on workshops and a dedicated young researcher forum.",
    image: "/images/keynote.jpg",
    venue: { name: "Sample Convention Centre", address: "1 Sample Street, Westminster", city: "London, United Kingdom", mapQuery: "Westminster, London" },
    topics: ["Deep learning", "Large language models", "Computer vision", "Reinforcement learning", "AI ethics and governance", "AI in healthcare", "Robotics and autonomy", "Data science and analytics"],
    deadlines: [
      { label: "Abstract submission opens", date: "01 October 2026" },
      { label: "Early bird registration ends", date: "15 December 2026" },
      { label: "Abstract submission closes", date: "15 January 2027" },
      { label: "Notification of acceptance", date: "05 February 2027" },
      { label: "Final registration deadline", date: "28 February 2027" },
    ],
    fees: standardFees,
    agenda: agendaTemplate("14 March 2027", "15 March 2027", "16 March 2027"),
    speakerSlugs: ["jonathan-reyes", "elena-marchetti", "sofia-alvarez", "kenji-watanabe"],
  },
  {
    id: "life-2027",
    title: "Global Summit on Medical and Life Sciences",
    shortTitle: "Life Sciences 2027",
    discipline: "Medical & Life Sciences",
    disciplineSlug: "medical-life-sciences",
    date: "22 to 23 May 2027",
    startDate: "2027-05-22T09:00:00Z",
    location: "Online",
    mode: "Virtual",
    description: "Sample description: translational medicine, genomics and clinical innovation presented by researchers worldwide.",
    overview:
      "Sample overview. A two-day virtual summit connecting clinicians, biomedical scientists and public health researchers. Live-streamed keynotes, moderated Q&A, virtual poster halls and networking lounges make it easy to take part from anywhere.",
    image: "/images/lab-2.jpg",
    venue: { name: "Virtual Event Platform", address: "Access link sent after registration", city: "Online", mapQuery: "" },
    topics: ["Genomics and precision medicine", "Clinical trials", "Neuroscience", "Immunology", "Public health", "Medical imaging", "Regenerative medicine", "Digital health"],
    deadlines: [
      { label: "Abstract submission opens", date: "01 December 2026" },
      { label: "Early bird registration ends", date: "15 February 2027" },
      { label: "Abstract submission closes", date: "15 March 2027" },
      { label: "Notification of acceptance", date: "05 April 2027" },
      { label: "Final registration deadline", date: "15 May 2027" },
    ],
    fees: standardFees,
    agenda: agendaTemplate("22 May 2027", "23 May 2027"),
    speakerSlugs: ["elena-marchetti", "amara-okafor", "lukas-brenner"],
  },
  {
    id: "eng-2027",
    title: "International Conference on Engineering, Energy and Smart Systems",
    shortTitle: "Engineering 2027",
    discipline: "Engineering & Technology",
    disciplineSlug: "engineering-technology",
    date: "21 to 23 June 2027",
    startDate: "2027-06-21T09:00:00Z",
    location: "Berlin, Germany",
    mode: "Hybrid",
    description: "Sample description: energy systems, robotics, communications and the infrastructure of smart cities.",
    overview:
      "Sample overview. A hybrid programme for engineers and technologists working on energy transition, autonomous systems, communications and resilient infrastructure. Attend in Berlin or follow every session live online.",
    image: "/images/lecture.jpg",
    venue: { name: "Sample Science Forum", address: "Sample Allee 10", city: "Berlin, Germany", mapQuery: "Berlin Mitte" },
    topics: ["Renewable energy systems", "Robotics and automation", "Internet of Things", "5G and communications", "Smart cities", "Embedded systems", "Power electronics", "Structural engineering"],
    deadlines: [
      { label: "Abstract submission opens", date: "15 December 2026" },
      { label: "Early bird registration ends", date: "15 March 2027" },
      { label: "Abstract submission closes", date: "15 April 2027" },
      { label: "Notification of acceptance", date: "05 May 2027" },
      { label: "Final registration deadline", date: "10 June 2027" },
    ],
    fees: standardFees,
    agenda: agendaTemplate("21 June 2027", "22 June 2027", "23 June 2027"),
    speakerSlugs: ["kenji-watanabe", "lukas-brenner", "jonathan-reyes"],
  },
  {
    id: "mat-2027",
    title: "World Congress on Chemistry and Advanced Materials",
    shortTitle: "Materials 2027",
    discipline: "Chemistry & Materials",
    disciplineSlug: "chemistry-materials",
    date: "09 to 11 September 2027",
    startDate: "2027-09-09T09:00:00Z",
    location: "Singapore",
    mode: "Hybrid",
    description: "Sample description: functional materials, catalysis and sustainable chemistry from lab bench to industry.",
    overview:
      "Sample overview. Chemists and materials scientists meet to discuss catalysis, nanomaterials, polymers and green chemistry, with a strong focus on routes from laboratory discovery to industrial scale.",
    image: "/images/lab.jpg",
    venue: { name: "Sample Marina Expo Hall", address: "10 Sample Bay Road", city: "Singapore", mapQuery: "Marina Bay, Singapore" },
    topics: ["Catalysis", "Nanomaterials", "Polymer science", "Green chemistry", "Electrochemistry and batteries", "Computational chemistry", "Biomaterials", "Surface science"],
    deadlines: [
      { label: "Abstract submission opens", date: "01 March 2027" },
      { label: "Early bird registration ends", date: "15 May 2027" },
      { label: "Abstract submission closes", date: "15 June 2027" },
      { label: "Notification of acceptance", date: "10 July 2027" },
      { label: "Final registration deadline", date: "30 August 2027" },
    ],
    fees: standardFees,
    agenda: agendaTemplate("09 September 2027", "10 September 2027", "11 September 2027"),
    speakerSlugs: ["priya-nandakumar", "sofia-alvarez", "amara-okafor"],
  },
  {
    id: "pharma-2027",
    title: "International Conference on Pharmaceutical Sciences and Drug Discovery",
    shortTitle: "Pharma 2027",
    discipline: "Pharmaceutical Research",
    disciplineSlug: "pharmaceutical-research",
    date: "14 to 15 October 2027",
    startDate: "2027-10-14T09:00:00Z",
    location: "Online",
    mode: "Virtual",
    description: "Sample description: drug discovery, formulation science, pharmacology and regulatory pathways.",
    overview:
      "Sample overview. A focused virtual meeting covering the full pipeline from target discovery to regulatory approval, with sessions designed for both academic and industry researchers.",
    image: "/images/panel.jpg",
    venue: { name: "Virtual Event Platform", address: "Access link sent after registration", city: "Online", mapQuery: "" },
    topics: ["Drug discovery", "Formulation and delivery", "Pharmacokinetics", "Clinical pharmacology", "Biologics", "Regulatory science", "Pharmacovigilance", "AI in drug design"],
    deadlines: [
      { label: "Abstract submission opens", date: "01 April 2027" },
      { label: "Early bird registration ends", date: "15 June 2027" },
      { label: "Abstract submission closes", date: "15 August 2027" },
      { label: "Notification of acceptance", date: "05 September 2027" },
      { label: "Final registration deadline", date: "07 October 2027" },
    ],
    fees: standardFees,
    agenda: agendaTemplate("14 October 2027", "15 October 2027"),
    speakerSlugs: ["amara-okafor", "priya-nandakumar", "elena-marchetti"],
  },
  {
    id: "env-2027",
    title: "International Symposium on Environmental Sciences and Sustainability",
    shortTitle: "Environment 2027",
    discipline: "Environmental Sciences",
    disciplineSlug: "environmental-sciences",
    date: "18 to 19 November 2027",
    startDate: "2027-11-18T09:00:00Z",
    location: "Dubai, United Arab Emirates",
    mode: "In-person",
    description: "Sample description: climate research, ecosystem resilience and policy-relevant environmental science.",
    overview:
      "Sample overview. Researchers, policymakers and practitioners discuss climate science, biodiversity, water security and sustainable development, with sessions linking evidence directly to policy and practice.",
    image: "/images/stage.jpg",
    venue: { name: "Sample International Convention Centre", address: "Sample Trade Centre Road", city: "Dubai, United Arab Emirates", mapQuery: "Trade Centre, Dubai" },
    topics: ["Climate modelling", "Biodiversity and conservation", "Water resources", "Renewable energy policy", "Circular economy", "Air quality", "Sustainable agriculture", "Environmental policy"],
    deadlines: [
      { label: "Abstract submission opens", date: "01 May 2027" },
      { label: "Early bird registration ends", date: "15 July 2027" },
      { label: "Abstract submission closes", date: "15 September 2027" },
      { label: "Notification of acceptance", date: "05 October 2027" },
      { label: "Final registration deadline", date: "10 November 2027" },
    ],
    fees: standardFees,
    agenda: agendaTemplate("18 November 2027", "19 November 2027"),
    speakerSlugs: ["anders-lindqvist", "sofia-alvarez", "lukas-brenner"],
  },
];

export const getConference = (id: string) => conferences.find((c) => c.id === id);
export const getDiscipline = (slug: string) => disciplines.find((d) => d.slug === slug);
/** The next upcoming conference (sorted by start date). */
export const nextConference = [...conferences].sort((a, b) => a.startDate.localeCompare(b.startDate))[0];

/* Research areas */
export const researchAreas = disciplines.map((d) => ({ title: d.name.replace("&", "and"), description: d.description, icon: d.icon, slug: d.slug }));

/* Why attend */
export const benefits = [
  { title: "Global networking", description: "Meet peers from universities, institutes and laboratories across continents.", icon: Globe2 },
  { title: "Research presentations", description: "Share original findings in oral, poster and workshop formats.", icon: Presentation },
  { title: "Expert keynotes", description: "Hear leading scientists frame the questions shaping their fields.", icon: Mic },
  { title: "Academic collaboration", description: "Form partnerships that continue long after the closing session.", icon: Users },
  { title: "Industry connections", description: "Engage with organisations translating research into practice.", icon: Factory },
  { title: "Knowledge sharing", description: "Take home new methods, datasets and perspectives for your work.", icon: Lightbulb },
];

/* Featured speakers on the home page (first four of the full list in lib/content.ts) */
export { speakers } from "./content";

/* Gallery */
export const gallery = [
  { src: "/images/hall.jpg", alt: "Delegates seated in a large international conference hall", caption: "International conference halls", className: "col-span-2 sm:row-span-2" },
  { src: "/images/keynote.jpg", alt: "Microphone in front of an audience at a keynote presentation", caption: "Keynote presentations", className: "" },
  { src: "/images/panel.jpg", alt: "Researchers in discussion during a scientific session", caption: "Scientific discussions", className: "" },
  { src: "/images/attend.jpg", alt: "Attendees networking in a conference venue", caption: "Networking sessions", className: "" },
  { src: "/images/stage.jpg", alt: "Presenter on stage in front of a projection screen", caption: "Panel discussions", className: "" },
];
