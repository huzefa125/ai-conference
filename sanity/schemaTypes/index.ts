import {
  agendaDay,
  conference,
  faq,
  galleryItem,
  highlight,
  post,
  speaker,
  sponsor,
  testimonial,
  ticket,
  track,
} from "./collections";
import { aboutPage, contactPage, siteSettings } from "./singletons";

export const schemaTypes = [
  siteSettings,
  aboutPage,
  contactPage,
  speaker,
  agendaDay,
  track,
  ticket,
  sponsor,
  faq,
  testimonial,
  post,
  conference,
  highlight,
  galleryItem,
];

/** One-off documents: edited in place, never created or deleted from the Studio. */
export const SINGLETONS = ["siteSettings", "aboutPage", "contactPage"] as const;
