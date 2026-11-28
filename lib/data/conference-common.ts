// Shared content for every conference page, from 01-common-pages.md.
// Placeholders in the markdown ([DATE], $[699], [XX]%, [EMAIL]...) are NOT published: amounts and dates
// read "To be announced", and sentences that depended on a placeholder are reworded.

export const ORGANIZER = "Atlas Conferences & Events";

export const ABSTRACTS = {
  why: "Presenting puts your work in front of an international audience of peers, collaborators and potential employers. Accepted abstracts are published in the official Conference Abstract Book and are eligible for Best Presentation awards.",
  who: "Researchers, physicians, surgeons, nurses, allied health professionals, academics, PhD and master's students, industry scientists and policymakers working in a field related to the conference theme.",
  categories: [
    { category: "Keynote / Plenary", format: "By invitation of the Scientific Committee", duration: "30–40 min" },
    { category: "Oral Presentation", format: "In person or virtual", duration: "20 min + 5 min Q&A" },
    { category: "Poster Presentation", format: "Printed poster (in person) or e-poster (virtual)", duration: "10–15 min incl. discussion" },
    { category: "Workshop / Symposium", format: "Proposal with multiple speakers", duration: "60–90 min" },
    { category: "Young Researcher Forum", format: "Students and early-career researchers (≤5 years post-PhD)", duration: "15 min + 5 min Q&A" },
    { category: "E-Poster", format: "Virtual display only", duration: "Asynchronous" },
  ],
  guidelines: [
    "English only, 250–300 words (excluding title, authors and affiliations)",
    "Structure: Background / Objective · Methods · Results · Conclusion (case reports and reviews may be free-form)",
    "Title of at most 20 words, sentence case, no abbreviations",
    "Full author names, affiliations and country, with the presenting author underlined",
    "A 100–150 word biography and a professional photo (JPEG, at least 600×600 px) of the presenting author",
    "3–5 keywords",
    "Submitted as a Word file using the abstract template (PDF is not accepted)",
    "Original work not previously published in a peer-reviewed journal",
    "Ethics committee approval for studies involving humans or animals",
  ],
  review: [
    "Acknowledgement email within 24 hours of submission",
    "Each abstract reviewed by at least two Scientific Committee members",
    "Decision within 5–7 working days",
    "Accepted presenters register by the deadline in their acceptance letter to keep their slot",
  ],
};

export const REGISTRATION = {
  inPerson: [
    "All scientific sessions, keynotes, workshops and the exhibition",
    "Conference kit, printed program and abstract book",
    "Coffee breaks and lunch on all conference days",
    "Certificate of participation / presentation",
    "Networking reception",
  ],
  virtual: [
    "Live stream of all sessions",
    "Virtual presentation slot (for presenters)",
    "E-abstract book and e-certificate",
    "Access to session recordings after the event",
  ],
  categories: [
    "Speaker (in person / virtual)",
    "Poster presenter (in person / virtual)",
    "Delegate / listener (in person / virtual)",
    "Student (in person, valid ID required)",
    "Young Researcher Forum",
    "Exhibitor booth (includes 2 passes)",
    "Accompanying person (no session access)",
  ],
  // Early bird / standard / final deadlines and fees: to be announced.
  tiers: ["Early bird", "Standard", "Final / on-site"],
  groups: "Group discounts are available for three or more registrations from one institution.",
  payment: "Credit/debit card (Visa, MasterCard, American Express) via a secure gateway, PayPal or bank transfer. An invoice and receipt are issued automatically.",
  cancellation: [
    "More than 90 days before the conference: full refund minus an administration fee",
    "60–90 days before: 50% refund",
    "Less than 60 days before: no refund; the amount can be credited to a future conference within 12 months",
    "Registrations can be transferred to a colleague free of charge with written notice at least 14 days before",
    "Visa refusal: full refund minus a processing fee on receipt of the official refusal letter, if requested at least 30 days before",
  ],
};

export const AWARDS = {
  list: [
    { title: "Best Oral Presentation", text: "Certificate and award" },
    { title: "Best Poster Presentation", text: "Certificate and award" },
    { title: "Young Researcher Award", text: "For presenters under 35 or currently enrolled students" },
    { title: "Outstanding Speaker Award", text: "For invited and keynote speakers, based on audience feedback" },
    { title: "Excellence in Research Award", text: "By Scientific Committee nomination" },
  ],
  judging: "Winners are judged by the Scientific Committee on originality, scientific quality, clarity of presentation and handling of questions, and announced at the closing ceremony.",
};

export const IMPORTANT_DATES = [
  "Abstract submission opens",
  "Early bird abstract deadline",
  "Early bird registration deadline",
  "Standard abstract deadline",
  "Standard registration deadline",
  "Final abstract deadline",
  "Final program released",
  "Conference dates",
];

export const VENUE = {
  text: "The venue will offer full audio-visual support, high-speed Wi-Fi and accessible facilities, with a block of rooms held at a special delegate rate.",
  scam: `${ORGANIZER} does not use third-party housing agents. If anyone contacts you claiming to book rooms on our behalf, do not share payment details and let us know.`,
};

export const FAQS = [
  { q: "Can I attend without presenting?", a: "Yes. Register in the Delegate / Listener category." },
  { q: "Will I get CME / CPD credits?", a: "Certificates of attendance list contact hours you can submit to your licensing body." },
  { q: "Can I present virtually?", a: "Yes. The conference is hybrid, and virtual oral and poster slots are available." },
  { q: "Will you send me a visa invitation letter?", a: "Yes. A visa letter is issued after full registration payment. Apply early: we cannot contact embassies on your behalf." },
  { q: "Can I submit more than one abstract?", a: "Yes, but each accepted presentation needs its own registration. Additional presentations are discounted." },
  { q: "Will my abstract be published?", a: "Accepted abstracts appear in the Conference Abstract Book." },
  { q: "Can I change from in-person to virtual?", a: "Yes, up to 30 days before the event. The fee difference is credited." },
  { q: "Is lunch included?", a: "Yes. In-person registration includes lunch and coffee breaks on all conference days." },
  { q: "Who do I contact with questions?", a: "Use the email or phone number on this page. We reply within one business day." },
];
