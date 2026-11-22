// The site's built-in content, assembled from the lib/data/*.ts files.
// It is the fallback whenever Sanity is not configured, unreachable, or a field is left empty.
import { AGENDA, TRACK_LABELS } from "./data/agenda";
import { POSTS_BY_DATE } from "./data/blog";
import { CONFERENCES } from "./data/conferences";
import { HOW_IT_WORKS } from "./data/how-it-works";
import { ABOUT, CONTACT } from "./data/pages";
import { CFP, EXPERIENCE, FAQS, FOOTER, SPONSORS, TRAVEL, VENUE, WHY_ATTEND } from "./data/site";
import { SPEAKERS } from "./data/speakers";
import { STICKY_FEATURES } from "./data/sticky-cards";
import { REVIEWS } from "./data/testimonials";
import { TICKETS } from "./data/tickets";

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
