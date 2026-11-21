// The site's built-in content, assembled from the lib/*-data.ts files.
// It is the fallback whenever Sanity is not configured, unreachable, or a field is left empty.
import { AGENDA, TRACK_LABELS } from "./agenda-data";
import { POSTS_BY_DATE } from "./blog-data";
import { CONFERENCES } from "./conferences-data";
import { HOW_IT_WORKS } from "./how-it-works-data";
import { ABOUT, CONTACT } from "./pages-data";
import { CFP, EXPERIENCE, FAQS, FOOTER, SPONSORS, TRAVEL, VENUE, WHY_ATTEND } from "./site-data";
import { SPEAKERS } from "./speakers-data";
import { STICKY_FEATURES } from "./sticky-cards-data";
import { REVIEWS } from "./testimonials-data";
import { TICKETS } from "./tickets-data";

export const LOCAL_CONTENT = {
  venue: VENUE,
  whyAttend: WHY_ATTEND,
  travel: TRAVEL,
  cfp: CFP,
  howItWorks: HOW_IT_WORKS,
  footer: FOOTER,
  sponsors: SPONSORS,
  faqs: FAQS,
  experience: EXPERIENCE,
  speakers: SPEAKERS,
  trackLabels: TRACK_LABELS,
  agenda: AGENDA,
  tickets: TICKETS,
  reviews: REVIEWS,
  posts: POSTS_BY_DATE,
  conferences: CONFERENCES,
  highlights: STICKY_FEATURES,
  about: ABOUT,
  contact: CONTACT,
};

export type SiteContent = typeof LOCAL_CONTENT;
