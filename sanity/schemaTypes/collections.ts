import { defineArrayMember, defineField, defineType } from "sanity";
import { TRACK_OPTIONS, iconField, imageFields, orderField } from "./helpers";

const ordered = [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" as const }] }];

export const speaker = defineType({
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "track", type: "string", options: { list: TRACK_OPTIONS } }),
    defineField({ name: "keynote", title: "Keynote speaker", type: "boolean", initialValue: false }),
    ...imageFields("photo", "Photo"),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "string" }),
    defineField({ name: "x", title: "X / Twitter URL", type: "string" }),
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const track = defineType({
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    defineField({ name: "trackId", title: "Track", type: "string", options: { list: TRACK_OPTIONS }, validation: (r) => r.required() }),
    defineField({ name: "label", title: "Display name", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "trackId" } },
});

export const agendaDay = defineType({
  name: "agendaDay",
  title: "Agenda day",
  type: "document",
  fields: [
    defineField({ name: "dayId", title: "Day ID", type: "string", description: 'e.g. "day-1"', validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", description: 'e.g. "Day 1"', validation: (r) => r.required() }),
    defineField({ name: "date", type: "string", description: 'e.g. "Wed, Nov 18"', validation: (r) => r.required() }),
    defineField({
      name: "sessions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "session",
          fields: [
            defineField({ name: "time", type: "string", description: '24h start time, e.g. "09:30"', validation: (r) => r.required().regex(/^\d{2}:\d{2}$/) }),
            defineField({ name: "duration", title: "Duration (minutes)", type: "number", validation: (r) => r.required().min(5) }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "kind",
              type: "string",
              options: { list: ["keynote", "talk", "workshop", "panel", "break"] },
              validation: (r) => r.required(),
            }),
            defineField({ name: "track", type: "string", options: { list: TRACK_OPTIONS }, description: "Leave empty for keynotes and breaks." }),
            defineField({ name: "speaker", type: "string" }),
            defineField({ name: "role", type: "string" }),
            defineField({ name: "room", type: "string" }),
          ],
          preview: { select: { title: "title", time: "time", kind: "kind" }, prepare: (s) => ({ title: `${s.time} · ${s.title}`, subtitle: s.kind }) },
        }),
      ],
    }),
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "label", subtitle: "date" } },
});

export const ticket = defineType({
  name: "ticket",
  title: "Ticket",
  type: "document",
  fields: [
    defineField({ name: "ticketId", title: "Ticket ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "price", title: "Price (USD)", type: "number", description: 'Leave empty to show "Custom".' }),
    defineField({ name: "priceNote", type: "string", description: 'e.g. "per person"' }),
    defineField({ name: "features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cta", title: "Button text", type: "string" }),
    defineField({ name: "href", title: "Button link", type: "string" }),
    defineField({ name: "featured", title: "Highlight as most popular", type: "boolean", initialValue: false }),
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "name", subtitle: "tagline" } },
});

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "tier",
      type: "string",
      options: { list: [{ title: "Headline partner", value: "headline" }, { title: "Partner", value: "partner" }], layout: "radio" },
      initialValue: "partner",
      validation: (r) => r.required(),
    }),
    ...imageFields("logo", "Logo"),
    { ...iconField("Shown when there is no logo."), title: "Placeholder icon" },
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "name", subtitle: "tier", media: "logo" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "question" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role and company", type: "string" }),
    defineField({ name: "quote", type: "text", rows: 3, validation: (r) => r.required() }),
    ...imageFields("photo", "Photo"),
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "date", title: "Publish date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "readTime", title: "Read time", type: "string", description: 'e.g. "5 min read"' }),
    defineField({
      name: "author",
      type: "object",
      fields: [defineField({ name: "name", type: "string" }), defineField({ name: "role", type: "string" })],
    }),
    ...imageFields("image", "Cover image"),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
});

export const conference = defineType({
  name: "conference",
  title: "Conference",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "dates", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["Flagship", "Upcoming", "Coming soon"] },
      initialValue: "Upcoming",
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    ...imageFields("image", "Image"),
    defineField({ name: "href", title: "Link", type: "string" }),
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "name", subtitle: "city", media: "image" } },
});

export const highlight = defineType({
  name: "highlight",
  title: "Highlight card",
  description: 'The stacked cards in "Your three days".',
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    ...imageFields("image", "Image"),
    defineField({
      name: "bgColor",
      title: "Background",
      type: "string",
      options: {
        list: [
          { title: "Light blue", value: "bg-[#e8effd]" },
          { title: "Sage", value: "bg-accent" },
          { title: "Sand", value: "bg-secondary" },
          { title: "Muted", value: "bg-muted" },
        ],
      },
      initialValue: "bg-secondary",
    }),
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
});

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Experience photo",
  description: 'Photos in "The experience" gallery.',
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "string" }),
    ...imageFields("image", "Photo"),
    orderField,
  ],
  orderings: ordered,
  preview: { select: { title: "title", subtitle: "description", media: "image" } },
});
