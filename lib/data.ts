import {
  BrainCircuit, Dna, Cog, FlaskConical, Leaf, Pill, Globe2, Presentation, Mic, Users, Factory, Lightbulb,
} from "lucide-react";

/* ----- Statistics: SAMPLE PLACEHOLDERS. Replace with verified figures. ----- */
export const stats = [
  { value: "00+", label: "Annual Conferences" },
  { value: "00,000+", label: "Global Participants" },
  { value: "00+", label: "Countries Represented" },
  { value: "0,000+", label: "Academic Publications" },
];

/* ----- Conferences: SAMPLE LISTINGS ----- */
export type Mode = "In-person" | "Virtual" | "Hybrid";
export type Conference = {
  id: string;
  title: string;
  discipline: string;
  date: string;
  location: string;
  mode: Mode;
  description: string;
  image: string;
};

export const conferences: Conference[] = [
  {
    id: "ai-2027",
    title: "International Conference on Artificial Intelligence and Machine Learning",
    discipline: "Artificial Intelligence",
    date: "14 – 16 March 2027",
    location: "London, United Kingdom",
    mode: "In-person",
    description: "Sample description: advances in learning systems, responsible AI and applied intelligence across industries.",
    image: "/images/keynote.jpg",
  },
  {
    id: "life-2027",
    title: "Global Summit on Medical and Life Sciences",
    discipline: "Medical & Life Sciences",
    date: "22 – 23 May 2027",
    location: "Online",
    mode: "Virtual",
    description: "Sample description: translational medicine, genomics and clinical innovation presented by researchers worldwide.",
    image: "/images/lab-2.jpg",
  },
  {
    id: "mat-2027",
    title: "World Congress on Chemistry and Advanced Materials",
    discipline: "Chemistry & Materials",
    date: "09 – 11 September 2027",
    location: "Singapore",
    mode: "Hybrid",
    description: "Sample description: functional materials, catalysis and sustainable chemistry from lab bench to industry.",
    image: "/images/lab.jpg",
  },
  {
    id: "env-2027",
    title: "International Symposium on Environmental Sciences and Sustainability",
    discipline: "Environmental Sciences",
    date: "18 – 19 November 2027",
    location: "Dubai, United Arab Emirates",
    mode: "In-person",
    description: "Sample description: climate research, ecosystem resilience and policy-relevant environmental science.",
    image: "/images/stage.jpg",
  },
];

/* ----- Research areas ----- */
export const researchAreas = [
  { title: "Artificial Intelligence", description: "Machine learning, robotics, language models and the responsible use of intelligent systems.", icon: BrainCircuit },
  { title: "Medical and Life Sciences", description: "Genomics, clinical research, neuroscience and translational medicine.", icon: Dna },
  { title: "Engineering and Technology", description: "Energy systems, robotics, computing, communications and smart infrastructure.", icon: Cog },
  { title: "Chemistry and Materials Science", description: "Catalysis, polymers, nanomaterials and sustainable chemical processes.", icon: FlaskConical },
  { title: "Environmental Sciences", description: "Climate science, biodiversity, water resources and sustainable development.", icon: Leaf },
  { title: "Pharmaceutical Research", description: "Drug discovery, formulation, pharmacology and regulatory science.", icon: Pill },
];

/* ----- Why attend ----- */
export const benefits = [
  { title: "Global networking", description: "Meet peers from universities, institutes and laboratories across continents.", icon: Globe2 },
  { title: "Research presentations", description: "Share original findings in oral, poster and workshop formats.", icon: Presentation },
  { title: "Expert keynotes", description: "Hear leading scientists frame the questions shaping their fields.", icon: Mic },
  { title: "Academic collaboration", description: "Form partnerships that continue long after the closing session.", icon: Users },
  { title: "Industry connections", description: "Engage with organisations translating research into practice.", icon: Factory },
  { title: "Knowledge sharing", description: "Take home new methods, datasets and perspectives for your work.", icon: Lightbulb },
];

/* ----- Speakers: SAMPLE PROFILES (fictional) ----- */
export const speakers = [
  { name: "Dr. Elena Marchetti", role: "Professor of Molecular Medicine", org: "Sample Institute of Life Sciences", focus: "Translational genomics", image: "/images/speaker-1.jpg" },
  { name: "Dr. Jonathan Reyes", role: "Director, Applied AI Laboratory", org: "Sample University of Technology", focus: "Machine learning systems", image: "/images/speaker-2.jpg" },
  { name: "Dr. Priya Nandakumar", role: "Principal Research Scientist", org: "Sample Materials Research Centre", focus: "Sustainable catalysis", image: "/images/speaker-3.jpg" },
  { name: "Prof. Anders Lindqvist", role: "Chair of Environmental Science", org: "Sample Nordic Research Academy", focus: "Climate resilience", image: "/images/speaker-4.jpg" },
];

/* ----- Gallery ----- */
export const gallery = [
  { src: "/images/hall.jpg", alt: "Delegates seated in a large international conference hall", caption: "International conference halls", className: "col-span-2 sm:row-span-2" },
  { src: "/images/keynote.jpg", alt: "Microphone in front of an audience at a keynote presentation", caption: "Keynote presentations", className: "" },
  { src: "/images/panel.jpg", alt: "Researchers in discussion during a scientific session", caption: "Scientific discussions", className: "" },
  { src: "/images/attend.jpg", alt: "Attendees networking in a conference venue", caption: "Networking sessions", className: "" },
  { src: "/images/stage.jpg", alt: "Presenter on stage in front of a projection screen", caption: "Panel discussions", className: "" },
];
