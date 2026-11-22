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
    excerpt: "Three days, four tracks and a lot of hallway conversations. Here is how the programme is put together and how to plan your days.",
    category: "Event news",
    date: "2026-10-28",
    readTime: "5 min read",
    author: { name: "Arjun Varma", role: "Summit Director" },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80&fit=crop",
    body: [
      "Atlas Global 2026 runs from November 18 to 20 in Hyderabad. Each day has a clear theme, so you can pick the sessions that match the work you do.",
      "Mornings are for keynotes and main-stage talks. Afternoons split into smaller workshops where you can ask questions and work through real examples.",
      "Evenings are kept open on purpose. Some of the most useful conversations happen over dinner, so we plan the schedule to leave room for them.",
      "Before you arrive, look through the agenda, mark two or three sessions you do not want to miss and leave the rest of the day flexible.",
    ],
  },
  {
    slug: "how-we-choose-speakers",
    title: "How we choose our speakers",
    excerpt: "We look for people who have built and shipped AI systems. Here is what our programme team looks for in a proposal.",
    category: "Speakers",
    date: "2026-10-14",
    readTime: "4 min read",
    author: { name: "Sana Kapoor", role: "Head of Programme" },
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80&fit=crop",
    body: [
      "Every proposal is read by at least two people on the programme team. We look first at what the speaker has actually built, run or measured.",
      "The strongest talks share what worked, what failed and what it cost. Specific numbers and honest lessons beat broad predictions.",
      "We also aim for a mix of company sizes, roles and backgrounds, so the room hears from startups, large teams and researchers alike.",
      "If your proposal is not accepted this year, we share short feedback so you can submit again next time.",
    ],
  },
  {
    slug: "a-first-timers-guide-to-hyderabad",
    title: "A first-timer's guide to Hyderabad",
    excerpt: "Where to stay, how to get around and what to eat while you are in town for the conference.",
    category: "Travel",
    date: "2026-09-30",
    readTime: "6 min read",
    author: { name: "Leela Menon", role: "Attendee Experience" },
    image: "https://images.unsplash.com/photo-1657981630164-769503f3a9a8?w=1400&q=80&fit=crop",
    body: [
      "Rajiv Gandhi International Airport (HYD) has direct flights from most Indian cities and many international hubs.",
      "HITEC City and the Financial District are close to most tech offices and have plenty of hotels at different price points.",
      "App-based cabs are the easiest way to get around. Allow extra time during the morning and evening rush.",
      "Keep one evening free for the old city: the Charminar, the markets around it and, of course, Hyderabadi biryani.",
    ],
  },
  {
    slug: "making-the-most-of-workshops",
    title: "Making the most of the workshops",
    excerpt: "Workshops are small and hands-on. A little preparation helps you leave with something you can use the next week.",
    category: "Tips",
    date: "2026-09-16",
    readTime: "3 min read",
    author: { name: "Kabir Sethi", role: "Production Lead" },
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1400&q=80&fit=crop",
    body: [
      "Workshop seats are limited, so register for the ones you want as soon as the schedule opens.",
      "Bring a laptop with the setup steps from the workshop page already done. It saves the first twenty minutes for everyone.",
      "Come with one real problem from your own work. Facilitators are happy to use it as an example.",
      "Afterwards, write down one thing you will try within a week, while it is still fresh.",
    ],
  },
  {
    slug: "why-sponsors-join-atlas-global",
    title: "Why teams sponsor Atlas Global",
    excerpt: "Sponsorship is about meeting the right people, not just putting a logo on a banner. Here is how partners get value from the event.",
    category: "Partners",
    date: "2026-09-02",
    readTime: "4 min read",
    author: { name: "Dev Malhotra", role: "Partnerships Lead" },
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&q=80&fit=crop",
    body: [
      "Our attendees are mostly engineers, product leaders and founders who are building with AI today.",
      "Partners can host workshops, join panels or run small roundtables, which leads to deeper conversations than a booth alone.",
      "We work with each partner on clear goals before the event and share a short report afterwards.",
      "If you would like to explore a partnership, get in touch through the contact page.",
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
      "After every event we send a short survey and read every answer. The most common request was more time between sessions.",
      "This year breaks are longer, and the main hall has more space for informal meetings.",
      "You also asked for more practical content, so we added a third day focused on workshops and live demos.",
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
