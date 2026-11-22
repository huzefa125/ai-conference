// The documents the seed script writes, built from the local data files. Pure, so it can be tested offline.
import { AGENDA, TRACK_LABELS } from "../lib/data/agenda";
import { BLOG_POSTS } from "../lib/data/blog";
import { CONFERENCES } from "../lib/data/conferences";
import { HOW_IT_WORKS } from "../lib/data/how-it-works";
import { ABOUT, CONTACT } from "../lib/data/pages";
import { CFP, EXPERIENCE, FAQS, FOOTER, SPONSORS, TRAVEL, VENUE, WHY_ATTEND } from "../lib/data/site";
import { SPEAKERS } from "../lib/data/speakers";
import { STICKY_FEATURES } from "../lib/data/sticky-cards";
import { REVIEWS } from "../lib/data/testimonials";
import { TICKETS } from "../lib/data/tickets";

export type Doc = { _id: string; _type: string; [k: string]: unknown };

/** Sanity needs a unique _key on every object inside an array. */
export function keyed<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((v, i) => (v && typeof v === "object" && !Array.isArray(v) ? { _key: `k${i}`, ...keyed(v) } : keyed(v))) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, keyed(v)])) as T;
  }
  return value;
}

const block = (text: string, i: number) => ({
  _type: "block",
  _key: `b${i}`,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
});

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const contactLinks = FOOTER.columns.find((c) => c.title === "Contact")?.links ?? [];

export const SEED_DOCS: Doc[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    venue: {
      eyebrow: VENUE.eyebrow,
      title: VENUE.title,
      intro: VENUE.intro,
      imageUrl: VENUE.image,
      details: VENUE.details,
      stats: VENUE.stats,
    },
    whyAttend: WHY_ATTEND,
    travel: TRAVEL,
    cfp: CFP,
    howItWorks: HOW_IT_WORKS,
    footer: {
      brand: FOOTER.brand,
      blurb: FOOTER.blurb,
      email: FOOTER.email,
      phone: contactLinks.find((l) => l.href.startsWith("tel:"))?.label,
      city: contactLinks.find((l) => l.href === "/#travel")?.label,
      socials: FOOTER.socials,
      legal: FOOTER.legal,
    },
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    hero: ABOUT.hero,
    story: {
      title: ABOUT.story.title,
      paragraphs: ABOUT.story.paragraphs,
      imageUrl: ABOUT.story.image,
      image2Url: ABOUT.story.image2,
      bannerUrl: ABOUT.story.banner,
      ctaImageUrl: ABOUT.story.ctaImage,
    },
    values: ABOUT.values,
    team: ABOUT.team.map(({ photo, ...m }) => ({ ...m, photoUrl: photo })),
    teamQuote: { text: ABOUT.teamQuote.text, name: ABOUT.teamQuote.name, role: ABOUT.teamQuote.role, photoUrl: ABOUT.teamQuote.photo },
    city: { title: ABOUT.city.title, text: ABOUT.city.text, coords: ABOUT.city.coords, imageUrl: ABOUT.city.image, facts: ABOUT.city.facts },
    process: ABOUT.process,
    cta: ABOUT.cta,
  },
  { _id: "contactPage", _type: "contactPage", ...CONTACT },

  ...(Object.entries(TRACK_LABELS) as [string, string][]).map(([trackId, label]) => ({
    _id: `track-${trackId}`,
    _type: "track",
    trackId,
    label,
  })),
  ...SPEAKERS.map(({ photo, ...s }, i) => ({ _id: `speaker-${i + 1}`, _type: "speaker", ...s, photoUrl: photo, order: (i + 1) * 10 })),
  ...AGENDA.map(({ id, ...d }, i) => ({ _id: `agenda-${id}`, _type: "agendaDay", dayId: id, ...d, order: (i + 1) * 10 })),
  ...TICKETS.map(({ id, price, ...t }, i) => ({
    _id: `ticket-${id}`,
    _type: "ticket",
    ticketId: id,
    ...t,
    ...(price === null ? {} : { price }),
    order: (i + 1) * 10,
  })),
  ...SPONSORS.flatMap((group, gi) =>
    group.slots.map(({ logo, ...s }, i) => ({
      _id: `sponsor-${slugify(s.name)}`,
      _type: "sponsor",
      ...s,
      ...(logo ? { logoUrl: logo } : {}),
      tier: gi === 0 ? "headline" : "partner",
      order: (gi * 100 + i + 1) * 10,
    })),
  ),
  ...FAQS.map((f, i) => ({ _id: `faq-${i + 1}`, _type: "faq", question: f.q, answer: f.a, order: (i + 1) * 10 })),
  ...REVIEWS.map((r, i) => ({
    _id: `testimonial-${i + 1}`,
    _type: "testimonial",
    name: r.name,
    role: r.username,
    quote: r.body,
    ...(r.profile ? { photoUrl: r.profile } : {}),
    order: (i + 1) * 10,
  })),
  ...BLOG_POSTS.map(({ slug, image, body, ...p }) => ({
    _id: `post-${slug}`,
    _type: "post",
    ...p,
    slug: { _type: "slug", current: slug },
    imageUrl: image,
    body: body.map(block),
  })),
  ...CONFERENCES.map(({ slug, image, ...c }, i) => ({
    _id: `conference-${slug}`,
    _type: "conference",
    ...c,
    slug: { _type: "slug", current: slug },
    imageUrl: image,
    order: (i + 1) * 10,
  })),
  ...STICKY_FEATURES.map(({ imageUrl, ...h }, i) => ({ _id: `highlight-${i + 1}`, _type: "highlight", ...h, imageUrl, order: (i + 1) * 10 })),
  ...EXPERIENCE.map(({ id, url, ...g }, i) => ({ _id: `gallery-${id}`, _type: "galleryItem", ...g, imageUrl: url, order: (i + 1) * 10 })),
];
