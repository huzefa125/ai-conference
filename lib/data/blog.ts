// SAMPLE BLOG POSTS: placeholder articles so the blog layout can be reviewed.
// Replace titles, authors, dates and body text with real posts before launch.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date, used for sorting
  readTime: string;
  author: { name: string; role: string };
  image: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-to-expect-at-atlas-global-2026",
    title: "What to expect at Atlas Global 2026",
    excerpt: "Three days, five tracks and a lot of corridor conversations. Here is how the programme is put together and how to plan your days.",
    category: "Event news",
    date: "2026-10-28",
    readTime: "5 min read",
    author: { name: "Arjun Varma", role: "Summit Director" },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80&fit=crop",
    body: [
      "Atlas Global 2026 runs from November 18 to 20 in Hyderabad. The programme is split into five tracks: Life Sciences, Physical Sciences, Earth & Climate, Data & Methods, and Science & Society.",
      "Mornings are for plenary talks from researchers who walk through how the work was done: the methods, the data, the dead ends. Afternoons split into track sessions, hands-on workshops and lab sessions.",
      "The poster sessions run over lunch on all three days. They are where early-career researchers present, and where many of the best questions get asked.",
      "Before you arrive, look through the agenda, mark two or three sessions you do not want to miss and leave the rest of the day flexible. Evenings are kept open on purpose.",
    ],
  },
  {
    slug: "how-we-pick-talks-for-the-programme",
    title: "How we pick talks for the programme",
    excerpt: "We look for people doing the research, not just reporting it. Here is what the programme committee looks for in an abstract.",
    category: "Programme",
    date: "2026-10-14",
    readTime: "4 min read",
    author: { name: "Sana Kapoor", role: "Head of Programme" },
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80&fit=crop",
    body: [
      "Every abstract is read by at least two reviewers from the relevant track. We look first at what the speaker actually did: the design of the study, the data collected, the analysis run.",
      "The strongest talks explain the method in enough detail that someone in a neighbouring field could follow it, and are honest about what did not work. Negative and null results are welcome.",
      "We also aim for a mix of career stages, institution types and regions, so the room hears from PhD students, postdocs, lab managers and principal investigators alike.",
      "If your abstract is not accepted for a talk, we may offer a poster slot instead, and we send short written feedback either way.",
    ],
  },
  {
    slug: "planning-your-trip-to-hyderabad",
    title: "Planning your trip to Hyderabad",
    excerpt: "Where to stay, how to get around and what to eat while you are in town for the summit.",
    category: "Travel",
    date: "2026-09-30",
    readTime: "6 min read",
    author: { name: "Leela Menon", role: "Attendee Experience" },
    image: "https://images.unsplash.com/photo-1657981630164-769503f3a9a8?w=1400&q=80&fit=crop",
    body: [
      "Rajiv Gandhi International Airport (HYD) has direct flights from most Indian cities and many international hubs. If you need a visa invitation letter, request it from the registration page at least six weeks ahead.",
      "HITEC City and the Financial District are close to the venue and have hotels at different price points. We hold a block of discounted rooms for students and early-career researchers.",
      "App-based cabs are the easiest way to get around. Allow extra time during the morning and evening rush, and if you are bringing a poster tube, keep it as cabin luggage.",
      "Keep one evening free for the old city: the Charminar, the markets around it and, of course, Hyderabadi biryani.",
    ],
  },
  {
    slug: "what-makes-a-good-poster-session",
    title: "What makes a good poster session",
    excerpt: "A poster is a conversation, not a paper on a board. A little preparation turns a quiet hour into useful feedback on your work.",
    category: "Tips",
    date: "2026-09-16",
    readTime: "4 min read",
    author: { name: "Kabir Sethi", role: "Production Lead" },
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1400&q=80&fit=crop",
    body: [
      "Lead with the question and the one figure that answers it. Most visitors decide in a few seconds whether to stop, so the main result should be readable from two metres away.",
      "Keep the methods short on the board and be ready to talk through them in detail. The people who stop for longest usually want to know how you did it.",
      "Prepare a two-minute version and a ten-minute version of your story. Have a QR code that links to your preprint, data or code, so people can follow up later.",
      "Write down every question you were asked. They are often the best preview of what reviewers will ask when you submit the paper.",
    ],
  },
  {
    slug: "reproducibility-in-practice",
    title: "Reproducibility in practice",
    excerpt: "Everyone agrees reproducibility matters. This year's Data & Methods track is about what it looks like day to day in a lab or field team.",
    category: "Programme",
    date: "2026-09-02",
    readTime: "5 min read",
    author: { name: "Dev Malhotra", role: "Track Chair, Data & Methods" },
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&q=80&fit=crop",
    body: [
      "Most reproducibility problems are not dramatic. They come from an undocumented change to a protocol, a spreadsheet edited by hand, or an analysis script that only runs on one person's laptop.",
      "The sessions in this track are led by researchers and research engineers who have fixed those problems in their own groups: lab notebooks people actually use, version-controlled analysis, pre-registration and shared data standards.",
      "One workshop takes a published dataset and asks participants to reproduce a key figure from scratch. It is a useful, slightly humbling exercise.",
      "If your group has a practice worth sharing, even a small one, the poster session is a good place to bring it.",
    ],
  },
  {
    slug: "a-look-back-at-last-year",
    title: "A look back at last year",
    excerpt: "The lessons we learned from our last event, and the changes we made for 2026 because of your feedback.",
    category: "Event news",
    date: "2026-08-19",
    readTime: "5 min read",
    author: { name: "Tara Bose", role: "Speaker Relations" },
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=80&fit=crop",
    body: [
      "After every event we send a short survey and read every answer. The most common request was more time between sessions and longer slots for questions.",
      "This year breaks are longer, every talk has at least ten minutes of discussion, and the poster hall is open all day rather than for a single hour.",
      "You also asked for more hands-on content, so we added a third day of workshops and lab sessions, and more travel grants for students and early-career researchers.",
      "Thank you to everyone who shared feedback. Keep it coming.",
    ],
  },
];

export const POSTS_BY_DATE = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
