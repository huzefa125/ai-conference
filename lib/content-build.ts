// Pure (no Next.js / network) so it can be tested with plain Node.
import { LOCAL_CONTENT, type SiteContent } from "./content-local";
import type { BlogPost } from "./blog-data";

// Image helper: prefer an uploaded asset, fall back to the external URL field.
const img = (f: string) => `"${f}": coalesce(${f}.asset->url, ${f}Url)`;

export const QUERY = /* groq */ `{
  "settings": *[_id == "siteSettings"][0]{
    venue{ eyebrow, title, intro, ${img("image")}, details[]{label, value}, stats[]{value, label} },
    whyAttend[]{icon, title, text},
    travel[]{icon, title, text},
    cfp{ title, text, steps[]{label, text}, cta, href, note },
    howItWorks{ title, intro, steps[]{number, title, body, theme}, cta{title, body, label, href} },
    footer{ brand, blurb, email, phone, city, socials[]{label, href}, legal[]{label, href} }
  },
  "about": *[_id == "aboutPage"][0]{
    hero{eyebrow, title, text},
    story{ title, paragraphs, ${img("image")}, ${img("image2")}, ${img("banner")}, ${img("ctaImage")} },
    values[]{title, text},
    team[]{ name, role, ${img("photo")}, linkedin },
    teamQuote{ text, name, role, ${img("photo")} },
    city{ title, text, coords, ${img("image")}, facts[]{icon, title, text} },
    process{ title, steps[]{label, text} },
    cta{ title, text, primary{label, href}, secondary{label, href} }
  },
  "contact": *[_id == "contactPage"][0]{
    hero{eyebrow, title, text}, email, phone, address, hours, topics,
    help[]{icon, title, text, topic}, quick[]{label, href}
  },
  "speakers": *[_type == "speaker"] | order(order asc, _createdAt asc){
    name, role, company, track, keynote, linkedin, x, ${img("photo")}
  },
  "tracks": *[_type == "track"]{ trackId, label },
  "agenda": *[_type == "agendaDay"] | order(order asc, _createdAt asc){
    "id": dayId, label, date, sessions[]{time, duration, title, kind, track, speaker, role, room}
  },
  "tickets": *[_type == "ticket"] | order(order asc, _createdAt asc){
    "id": ticketId, name, tagline, price, priceNote, features, cta, href, featured
  },
  "sponsors": *[_type == "sponsor"] | order(order asc, _createdAt asc){ name, tier, icon, ${img("logo")} },
  "faqs": *[_type == "faq"] | order(order asc, _createdAt asc){ "q": question, "a": answer },
  "reviews": *[_type == "testimonial"] | order(order asc, _createdAt asc){
    name, "username": role, "body": quote, "profile": coalesce(photo.asset->url, photoUrl)
  },
  "posts": *[_type == "post" && defined(slug.current)] | order(date desc){
    "slug": slug.current, title, excerpt, category, date, readTime, author{name, role}, ${img("image")}, body
  },
  "conferences": *[_type == "conference"] | order(order asc, _createdAt asc){
    "slug": slug.current, name, city, dates, status, summary, ${img("image")}, href
  },
  "highlights": *[_type == "highlight"] | order(order asc, _createdAt asc){
    eyebrow, title, description, "imageUrl": coalesce(image.asset->url, imageUrl), bgColor
  },
  "experience": *[_type == "galleryItem"] | order(order asc, _createdAt asc){
    "id": _id, title, description, "url": coalesce(image.asset->url, imageUrl)
  }
}`;

/* ------------------------------------------------------------------ */
/* Merging                                                             */
/* ------------------------------------------------------------------ */

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isEmpty = (v: unknown) => v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0);

/** Drops null/empty values so missing Sanity fields never overwrite the local fallback. */
export function clean<T>(v: T): T {
  if (Array.isArray(v)) return v.map(clean).filter((x) => !isEmpty(x)) as T;
  if (isObj(v)) {
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v)) {
      const c = clean(val);
      if (!isEmpty(c)) out[k] = c;
    }
    return out as T;
  }
  return v;
}

/** Remote values win; objects merge key by key; a non-empty remote list replaces the local list. */
function merge<T>(local: T, remote: unknown): T {
  if (isEmpty(remote)) return local;
  if (Array.isArray(local)) return (Array.isArray(remote) ? remote : local) as T;
  if (isObj(local) && isObj(remote)) {
    const out: Record<string, unknown> = { ...local };
    for (const [k, v] of Object.entries(remote)) out[k] = k in local ? merge((local as Record<string, unknown>)[k], v) : v;
    return out as T;
  }
  return remote as T;
}

type Block = { _type: string; children?: { text?: string }[] };
const blocksToParagraphs = (body: unknown): string[] =>
  Array.isArray(body)
    ? (body as Block[])
        .filter((b) => b._type === "block")
        .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
        .filter(Boolean)
    : [];

const TIER_TITLES: Record<string, string> = { headline: "Headline partners", partner: "Partners" };

/* ------------------------------------------------------------------ */

/** Turns the raw query result into site content, falling back to local data field by field. */
export function buildContent(raw: Record<string, unknown>): SiteContent {
  const L = LOCAL_CONTENT;
  const settings = (raw.settings ?? {}) as Record<string, unknown>;

  // phone/city only feed the contact column below; they are not part of the footer shape.
  const { phone, city, ...footer } = merge(L.footer, settings.footer) as typeof L.footer & { phone?: string; city?: string };
  const f = { ...footer, phone, city };
  const contactColumn = {
    title: "Contact",
    links: [
      { label: f.email, href: `mailto:${f.email}` },
      ...(f.phone ? [{ label: f.phone, href: `tel:${f.phone.replace(/[^+\d]/g, "")}` }] : []),
      ...(f.city ? [{ label: f.city, href: "/#travel" }] : []),
      { label: "Contact us", href: "/contact" },
    ],
  };
  // Only rebuild the contact column when Sanity provides the details.
  const footerWithColumns = isObj(settings.footer)
    ? { ...footer, columns: footer.columns.map((c) => (c.title === "Contact" ? contactColumn : c)) }
    : footer;

  const sponsorsRaw = raw.sponsors as { tier: string; name: string; icon?: string; logo?: string }[] | undefined;
  const sponsors = sponsorsRaw?.length
    ? ["headline", "partner"]
        .map((tier) => ({
          tier: TIER_TITLES[tier],
          slots: sponsorsRaw.filter((s) => s.tier === tier).map(({ name, icon, logo }) => ({ name, ...(icon ? { icon } : {}), ...(logo ? { logo } : {}) })),
        }))
        .filter((t) => t.slots.length)
    : undefined;

  const tracksRaw = raw.tracks as { trackId: keyof SiteContent["trackLabels"]; label: string }[] | undefined;
  const trackLabels = tracksRaw?.length
    ? { ...L.trackLabels, ...Object.fromEntries(tracksRaw.map((t) => [t.trackId, t.label])) }
    : undefined;

  const posts = (raw.posts as (Omit<BlogPost, "body"> & { body?: unknown })[] | undefined)?.map((p) => ({
    ...p,
    author: { name: p.author?.name ?? "Atlas team", role: p.author?.role ?? "" },
    readTime: p.readTime ?? "",
    excerpt: p.excerpt ?? "",
    category: p.category ?? "",
    image: p.image ?? "",
    body: blocksToParagraphs(p.body),
  }));

  return {
    venue: merge(L.venue, settings.venue),
    whyAttend: merge(L.whyAttend, settings.whyAttend),
    travel: merge(L.travel, settings.travel),
    cfp: merge(L.cfp, settings.cfp),
    howItWorks: merge(L.howItWorks, settings.howItWorks),
    footer: footerWithColumns,
    sponsors: merge(L.sponsors, sponsors),
    faqs: merge(L.faqs, raw.faqs),
    experience: merge(L.experience, raw.experience),
    speakers: merge(L.speakers, raw.speakers),
    trackLabels: merge(L.trackLabels, trackLabels),
    agenda: merge(L.agenda, raw.agenda),
    // An empty price means "Custom"; the tickets section checks for null specifically.
    tickets: merge(L.tickets, raw.tickets).map((t) => ({ ...t, price: t.price ?? null })),
    reviews: merge(L.reviews, raw.reviews),
    posts: merge(L.posts, posts),
    conferences: merge(L.conferences, raw.conferences),
    highlights: merge(L.highlights, raw.highlights),
    // leadSegments (the pill sentence) stays in code; everything else on the page is editable.
    about: merge(L.about, raw.about),
    contact: merge(L.contact, raw.contact),
  };
}
