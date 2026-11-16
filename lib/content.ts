/*
  Sample content for the demo site. Every name, organisation, figure and article
  below is fictional placeholder material. Do not import lib/data.ts from here
  (data.ts re-exports `speakers` from this file).
*/

/* ───────────── Speakers ───────────── */
export type Speaker = {
  slug: string;
  name: string;
  role: string;
  org: string;
  country: string;
  focus: string;
  /** Optional: speakers without a photo render a monogram. */
  image?: string;
  kind: "Keynote" | "Plenary" | "Invited";
  bio: string;
  talk: { title: string; abstract: string };
};

export const allSpeakers: Speaker[] = [
  {
    slug: "elena-marchetti", name: "Dr. Elena Marchetti", role: "Professor of Molecular Medicine", org: "Sample Institute of Life Sciences", country: "Italy",
    focus: "Translational genomics", image: "/images/speaker-1.jpg", kind: "Keynote",
    bio: "Sample biography. Dr. Marchetti leads a research group studying how genomic variation shapes disease risk and treatment response. Her work bridges laboratory genomics and clinical practice, and she has advised several national precision-medicine programmes.",
    talk: { title: "From genome to clinic: closing the translation gap (sample)", abstract: "Sample abstract. This keynote reviews recent progress in moving genomic discoveries into routine care, and the practical barriers that remain around data sharing, validation and equitable access." },
  },
  {
    slug: "jonathan-reyes", name: "Dr. Jonathan Reyes", role: "Director, Applied AI Laboratory", org: "Sample University of Technology", country: "United States",
    focus: "Machine learning systems", image: "/images/speaker-2.jpg", kind: "Keynote",
    bio: "Sample biography. Dr. Reyes directs an applied AI laboratory focused on reliable machine learning systems for science and industry. His group publishes on model evaluation, robustness and human oversight of automated decisions.",
    talk: { title: "Building machine learning systems people can trust (sample)", abstract: "Sample abstract. What does it take for an AI system to be dependable outside the lab? This talk covers evaluation, monitoring and the organisational practices that make AI deployments safe and useful." },
  },
  {
    slug: "priya-nandakumar", name: "Dr. Priya Nandakumar", role: "Principal Research Scientist", org: "Sample Materials Research Centre", country: "India",
    focus: "Sustainable catalysis", image: "/images/speaker-3.jpg", kind: "Keynote",
    bio: "Sample biography. Dr. Nandakumar develops low-energy catalytic processes for industrial chemistry. Her team works closely with manufacturers to scale greener synthesis routes from the bench to pilot plants.",
    talk: { title: "Greener catalysis at industrial scale (sample)", abstract: "Sample abstract. A tour of catalytic routes that cut energy use and waste, with lessons from scaling three processes from gram to tonne quantities." },
  },
  {
    slug: "anders-lindqvist", name: "Prof. Anders Lindqvist", role: "Chair of Environmental Science", org: "Sample Nordic Research Academy", country: "Sweden",
    focus: "Climate resilience", image: "/images/speaker-4.jpg", kind: "Keynote",
    bio: "Sample biography. Prof. Lindqvist studies how ecosystems and communities adapt to climate extremes. He has contributed to international assessment reports and leads a long-running field observatory.",
    talk: { title: "Designing for resilience in a warming world (sample)", abstract: "Sample abstract. Evidence from two decades of field observation on which adaptation strategies hold up under compound climate extremes." },
  },
  {
    slug: "sofia-alvarez", name: "Dr. Sofia Alvarez", role: "Associate Professor of Computer Science", org: "Sample Polytechnic University", country: "Spain",
    focus: "Responsible AI", kind: "Plenary",
    bio: "Sample biography. Dr. Alvarez researches fairness, transparency and accountability in machine learning, and co-chairs a regional working group on AI governance.",
    talk: { title: "Auditing algorithms in the real world (sample)", abstract: "Sample abstract. Practical methods for auditing deployed AI systems, drawn from case studies in public services and finance." },
  },
  {
    slug: "kenji-watanabe", name: "Prof. Kenji Watanabe", role: "Professor of Robotics", org: "Sample Institute of Engineering", country: "Japan",
    focus: "Autonomous systems", kind: "Plenary",
    bio: "Sample biography. Prof. Watanabe's lab builds robots that work alongside people in hospitals, warehouses and homes, with an emphasis on safe physical interaction.",
    talk: { title: "Robots that share our spaces (sample)", abstract: "Sample abstract. Design principles for collaborative robots, and results from long-term deployments in care settings." },
  },
  {
    slug: "amara-okafor", name: "Dr. Amara Okafor", role: "Head of Clinical Pharmacology", org: "Sample Medical Research Council", country: "Nigeria",
    focus: "Clinical pharmacology", kind: "Invited",
    bio: "Sample biography. Dr. Okafor leads clinical pharmacology studies on treatment response across diverse populations, and mentors early-career researchers across the region.",
    talk: { title: "Why population diversity matters in drug trials (sample)", abstract: "Sample abstract. Evidence that more representative trial populations change dosing decisions, and how to design studies that achieve it." },
  },
  {
    slug: "lukas-brenner", name: "Dr. Lukas Brenner", role: "Group Leader, Energy Systems", org: "Sample Centre for Applied Research", country: "Germany",
    focus: "Energy transition", kind: "Invited",
    bio: "Sample biography. Dr. Brenner models how grids, storage and demand interact as energy systems decarbonise, working with utilities and city planners.",
    talk: { title: "Grid flexibility for a renewable future (sample)", abstract: "Sample abstract. How storage, demand response and smarter planning can keep grids stable as renewable share rises." },
  },
];

/** Home-page featured speakers keep the original 4-item shape. */
export const speakers = allSpeakers.slice(0, 4).map((s) => ({ ...s, image: s.image! }));
export const getSpeaker = (slug: string) => allSpeakers.find((s) => s.slug === slug);

/* ───────────── News / articles ───────────── */
export type Post = {
  slug: string;
  tag: "Conference Update" | "Research" | "Publications" | "Community" | "Guides";
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  /** Paragraphs. Strings starting with "## " render as subheadings. */
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "keynote-programme-2027", tag: "Conference Update", title: "What to expect from this year’s keynote programme",
    excerpt: "Sample article. A first look at the themes, formats and speakers shaping the 2027 keynote line-up.", date: "02 November 2026", author: "Programme Committee", readTime: "4 min read", image: "/images/keynote.jpg",
    body: [
      "Sample article text. This year’s keynote programme has been built around three themes that cut across our disciplines: trustworthy technology, translational research and climate resilience.",
      "## A broader mix of formats",
      "Alongside traditional keynote talks, several sessions will run as conversations between two speakers from different fields, followed by extended audience Q&A.",
      "## Speakers from every region",
      "The committee set out to invite speakers from every continent, with a deliberate balance of established leaders and early-career researchers.",
      "Full session details will be added to each conference page as they are confirmed.",
    ],
  },
  {
    slug: "abstract-that-stands-out", tag: "Guides", title: "Preparing an abstract that stands out to reviewers",
    excerpt: "Sample article. Practical advice from committee members on structure, clarity and the common mistakes to avoid.", date: "20 October 2026", author: "Scientific Committee", readTime: "6 min read", image: "/images/lab.jpg",
    body: [
      "Sample article text. Reviewers read hundreds of abstracts in a short window. The ones that stand out make their contribution clear in the first two sentences.",
      "## Lead with the problem and the result",
      "State the question you addressed and the main finding before you describe methods in detail.",
      "## Be specific",
      "Replace general claims with concrete numbers, sample sizes or effect sizes wherever possible.",
      "## Respect the format",
      "Keep within the word limit, choose the right topic track and check that author affiliations are complete.",
    ],
  },
  {
    slug: "conference-paper-to-proceedings", tag: "Publications", title: "From conference paper to published proceedings",
    excerpt: "Sample article. How accepted presentations move through review and into the published conference record.", date: "08 October 2026", author: "Publications Team", readTime: "5 min read", image: "/images/hall.jpg",
    body: [
      "Sample article text. Presenting at a conference is often the first step towards a lasting, citable record of your work.",
      "## The review process",
      "Full papers submitted after the event are reviewed by at least two members of the scientific committee.",
      "## Timelines",
      "Most proceedings are published within a few months of the conference closing.",
    ],
  },
  {
    slug: "virtual-attendance-tips", tag: "Guides", title: "Getting the most from a virtual conference",
    excerpt: "Sample article. How to plan your schedule, network online and present confidently from a distance.", date: "25 September 2026", author: "Events Team", readTime: "4 min read", image: "/images/attend.jpg",
    body: [
      "Sample article text. Virtual events reward a little preparation. Plan your sessions in advance and block time in your calendar as you would for travel.",
      "## Network deliberately",
      "Use the attendee directory and topic lounges to arrange short one-to-one meetings.",
      "## Test your setup",
      "If you are presenting, run a technical check with the event team a day before your session.",
    ],
  },
  {
    slug: "young-researcher-awards-2026", tag: "Community", title: "Celebrating the 2026 young researcher award winners",
    excerpt: "Sample article. Meet the early-career scientists recognised for outstanding work at this year’s events.", date: "12 September 2026", author: "Awards Committee", readTime: "3 min read", image: "/images/stage.jpg",
    body: [
      "Sample article text. Each year, our young researcher awards recognise outstanding presentations by students and early-career scientists.",
      "## How winners are chosen",
      "Session chairs nominate presenters, and a panel reviews each nomination against originality, rigour and clarity of presentation.",
    ],
  },
  {
    slug: "new-research-journal-launch", tag: "Research", title: "Launching a new open-access journal for applied science",
    excerpt: "Sample article. A new peer-reviewed home for interdisciplinary applied research, open to submissions now.", date: "30 August 2026", author: "Editorial Board", readTime: "5 min read", image: "/images/lab-2.jpg",
    body: [
      "Sample article text. The new journal will publish applied research that crosses traditional discipline boundaries.",
      "## Scope",
      "Submissions are welcome across engineering, life sciences, chemistry and environmental research where findings have a clear route to application.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/* ───────────── Advisory board ───────────── */
export const advisoryBoard = [
  { name: "Prof. Margaret Ellison", role: "Board Chair", org: "Sample University of Science", country: "United Kingdom", expertise: "Biomedical engineering" },
  { name: "Prof. Rahul Mehta", role: "Vice Chair", org: "Sample Institute of Technology", country: "India", expertise: "Artificial intelligence" },
  { name: "Dr. Hannah Schulz", role: "Board Member", org: "Sample Research Centre", country: "Germany", expertise: "Materials science" },
  { name: "Prof. Carlos Mendes", role: "Board Member", org: "Sample Federal University", country: "Brazil", expertise: "Environmental chemistry" },
  { name: "Dr. Mei Lin Tan", role: "Board Member", org: "Sample National University", country: "Singapore", expertise: "Pharmaceutical sciences" },
  { name: "Prof. Samuel Adeyemi", role: "Board Member", org: "Sample College of Medicine", country: "Nigeria", expertise: "Public health" },
  { name: "Dr. Isabelle Laurent", role: "Board Member", org: "Sample School of Engineering", country: "France", expertise: "Energy systems" },
  { name: "Prof. Yusuf Al-Rashid", role: "Board Member", org: "Sample University of Sciences", country: "United Arab Emirates", expertise: "Water resources" },
];

/* ───────────── Partners ───────────── */
export const partners = [
  { name: "Sample Academy of Sciences", type: "Academic", short: "SAS" },
  { name: "Sample Research Council", type: "Academic", short: "SRC" },
  { name: "Sample Institute of Technology", type: "Academic", short: "SIT" },
  { name: "Sample Medical Society", type: "Society", short: "SMS" },
  { name: "Sample Engineering Society", type: "Society", short: "SES" },
  { name: "Sample Chemical Association", type: "Society", short: "SCA" },
  { name: "Sample Labs Inc.", type: "Industry", short: "SLI" },
  { name: "Sample Analytics Group", type: "Industry", short: "SAG" },
  { name: "Sample Instruments Ltd.", type: "Industry", short: "SIL" },
  { name: "Sample Science Press", type: "Media", short: "SSP" },
  { name: "Sample Research Network", type: "Media", short: "SRN" },
  { name: "Sample Open Data Foundation", type: "Society", short: "ODF" },
] as const;

/* ───────────── Sponsorship packages ───────────── */
export const sponsorshipPackages = [
  {
    tier: "Platinum", price: "$00,000", highlight: true,
    benefits: ["Headline branding across all event materials", "Keynote session sponsorship and speaking slot", "Premium 6×6 m exhibition space", "8 full delegate passes", "Logo on website, programme and stage screens", "Dedicated email to all delegates"],
  },
  {
    tier: "Gold", price: "$00,000", highlight: false,
    benefits: ["Session or workshop sponsorship", "3×6 m exhibition space", "5 full delegate passes", "Logo on website and programme", "Half-page advert in programme book"],
  },
  {
    tier: "Silver", price: "$0,000", highlight: false,
    benefits: ["3×3 m exhibition space", "3 full delegate passes", "Logo on website", "Insert in delegate bag"],
  },
  {
    tier: "Exhibitor", price: "$0,000", highlight: false,
    benefits: ["Table-top exhibition space", "2 exhibitor passes", "Listing in exhibitor directory"],
  },
];

/* ───────────── Registration tiers ───────────── */
export const registrationTiers = [
  { name: "Academic", early: "$000", standard: "$000", onsite: "$000", features: ["All scientific sessions", "Conference kit and programme", "Lunch and refreshments", "Certificate of attendance", "Access to proceedings"], highlight: true },
  { name: "Industry", early: "$000", standard: "$000", onsite: "$000", features: ["All scientific sessions", "Conference kit and programme", "Lunch and refreshments", "Networking reception", "Access to proceedings"], highlight: false },
  { name: "Student", early: "$000", standard: "$000", onsite: "$000", features: ["All scientific sessions", "Lunch and refreshments", "Young researcher forum", "Certificate of attendance"], highlight: false },
  { name: "Virtual", early: "$000", standard: "$000", onsite: "—", features: ["Live stream of all sessions", "On-demand recordings for 60 days", "Virtual poster hall", "E-certificate"], highlight: false },
];

/* ───────────── Testimonials ───────────── */
export const testimonials = [
  { quote: "Sample testimonial. The quality of the sessions and the range of countries represented made this one of the most useful meetings of my year.", name: "Dr. A. Sample", role: "Associate Professor, Sample University", event: "AI & ML 2026" },
  { quote: "Sample testimonial. I presented my first poster here and left with two new collaborators and an invitation to submit a full paper.", name: "B. Sample", role: "PhD Candidate, Sample Institute", event: "Life Sciences 2026" },
  { quote: "Sample testimonial. Well organised, genuinely interdisciplinary and a great place to meet researchers working on applied problems.", name: "C. Sample", role: "R&D Lead, Sample Labs Inc.", event: "Materials 2026" },
  { quote: "Sample testimonial. The hybrid format worked smoothly. Our remote team members could follow and question every session live.", name: "Prof. D. Sample", role: "Head of Department, Sample College", event: "Engineering 2026" },
];

/* ───────────── Awards ───────────── */
export const awards = [
  { title: "Best Paper Award", description: "Recognises the most significant and rigorous full paper presented at each conference." },
  { title: "Young Researcher Award", description: "For an outstanding oral presentation by a student or researcher within five years of their PhD." },
  { title: "Best Poster Award", description: "Celebrates clear, original and well-presented work in the poster sessions." },
  { title: "Outstanding Contribution Award", description: "Honours a senior scientist for sustained contributions to their field and community." },
];

/* ───────────── Past events ───────────── */
export const pastEvents = [
  { title: "International Conference on Artificial Intelligence 2026", date: "March 2026", location: "Amsterdam, Netherlands", attendees: "000+", image: "/images/hall.jpg" },
  { title: "Global Summit on Life Sciences 2026", date: "May 2026", location: "Online", attendees: "000+", image: "/images/lab-2.jpg" },
  { title: "World Congress on Materials 2026", date: "September 2026", location: "Seoul, South Korea", attendees: "000+", image: "/images/lab.jpg" },
  { title: "Engineering and Smart Systems 2025", date: "June 2025", location: "Vienna, Austria", attendees: "000+", image: "/images/lecture.jpg" },
  { title: "Environmental Sciences Symposium 2025", date: "November 2025", location: "Lisbon, Portugal", attendees: "000+", image: "/images/stage.jpg" },
  { title: "Pharmaceutical Sciences Conference 2025", date: "October 2025", location: "Online", attendees: "000+", image: "/images/panel.jpg" },
];

/* ───────────── Journals ───────────── */
export const journals = [
  { slug: "applied-ai", title: "Sample Journal of Applied Artificial Intelligence", issn: "0000-0000", frequency: "Quarterly", access: "Open access", discipline: "Artificial Intelligence" },
  { slug: "biomedical-research", title: "Sample Journal of Biomedical Research", issn: "0000-0001", frequency: "Bi-monthly", access: "Open access", discipline: "Medical & Life Sciences" },
  { slug: "engineering-systems", title: "Sample Journal of Engineering Systems", issn: "0000-0002", frequency: "Quarterly", access: "Hybrid", discipline: "Engineering & Technology" },
  { slug: "materials-chemistry", title: "Sample Journal of Materials and Chemistry", issn: "0000-0003", frequency: "Monthly", access: "Open access", discipline: "Chemistry & Materials" },
  { slug: "environmental-science", title: "Sample Journal of Environmental Science", issn: "0000-0004", frequency: "Quarterly", access: "Open access", discipline: "Environmental Sciences" },
  { slug: "pharmaceutical-sciences", title: "Sample Journal of Pharmaceutical Sciences", issn: "0000-0005", frequency: "Bi-monthly", access: "Hybrid", discipline: "Pharmaceutical Research" },
];

export const proceedings = [
  { title: "Proceedings of the International Conference on AI 2026", volume: "Vol. 0", year: "2026", papers: "000 papers" },
  { title: "Proceedings of the Global Summit on Life Sciences 2026", volume: "Vol. 0", year: "2026", papers: "000 papers" },
  { title: "Proceedings of the World Congress on Materials 2026", volume: "Vol. 0", year: "2026", papers: "000 papers" },
  { title: "Proceedings of Engineering and Smart Systems 2025", volume: "Vol. 0", year: "2025", papers: "000 papers" },
];

/* ───────────── FAQs ───────────── */
export const faqs = [
  { question: "Who can attend our conferences?", answer: "Placeholder answer. Researchers, academicians, students and industry professionals are welcome to attend as delegates, speakers or poster presenters." },
  { question: "How do I submit an abstract?", answer: "Placeholder answer. Choose a conference, follow its abstract guidelines and submit through the Call for Abstracts page before the stated deadline." },
  { question: "Can I attend virtually?", answer: "Placeholder answer. Selected events are offered online or in a hybrid format. The format is shown on each conference card." },
  { question: "Are conference proceedings published?", answer: "Placeholder answer. Accepted contributions may be considered for conference proceedings and associated publications." },
  { question: "How can my organisation sponsor an event?", answer: "Placeholder answer. Visit the Sponsorship page or contact the team to discuss sponsorship and exhibition opportunities." },
  { question: "Is there a registration fee?", answer: "Placeholder answer. Fees, categories and any concessions are listed on the Registration page and on each conference page." },
  { question: "Will I receive a certificate?", answer: "Placeholder answer. All registered delegates receive a certificate of attendance. Presenters also receive a certificate of presentation." },
  { question: "Can I get a visa invitation letter?", answer: "Placeholder answer. Registered delegates can request an invitation letter from the team once their registration fee has been paid." },
  { question: "What is the cancellation policy?", answer: "Placeholder answer. Cancellations made before the early bird deadline are eligible for a partial refund. Full terms are listed on the Terms page." },
];
