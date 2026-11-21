import { defineArrayMember, defineField, defineType } from "sanity";
import { iconField, imageFields } from "./helpers";

const link = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", title: "Link", type: "string" })],
  });

const linkList = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "link",
        fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", title: "Link", type: "string" })],
        preview: { select: { title: "label", subtitle: "href" } },
      }),
    ],
  });

const iconCards = (name: string, title: string, extra: ReturnType<typeof defineField>[] = []) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "iconCard",
        fields: [
          iconField(),
          defineField({ name: "title", type: "string" }),
          defineField({ name: "text", type: "text", rows: 3 }),
          ...extra,
        ],
        preview: { select: { title: "title", subtitle: "icon" } },
      }),
    ],
  });

const labelText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "step",
        fields: [defineField({ name: "label", type: "string" }), defineField({ name: "text", type: "text", rows: 2 })],
        preview: { select: { title: "label", subtitle: "text" } },
      }),
    ],
  });

const pageHero = defineField({
  name: "hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "text", type: "text", rows: 3 }),
  ],
});

/* ------------------------------------------------------------------ */

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "event", title: "Event", default: true },
    { name: "sections", title: "Home sections" },
    { name: "footer", title: "Footer & contact" },
  ],
  fields: [
    defineField({
      name: "venue",
      title: "Event details",
      type: "object",
      group: "event",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 3 }),
        ...imageFields("image", "Image"),
        defineField({
          name: "details",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "detail",
              fields: [defineField({ name: "label", type: "string" }), defineField({ name: "value", type: "string" })],
              preview: { select: { title: "label", subtitle: "value" } },
            }),
          ],
        }),
        defineField({
          name: "stats",
          description: 'The "3 Days / 5 Tracks / 1,000+ Attendees" numbers.',
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "stat",
              fields: [
                defineField({ name: "value", type: "string", description: 'e.g. "3" or "1,000+"' }),
                defineField({ name: "label", type: "string" }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
        }),
      ],
    }),
    iconCards("whyAttend", "Why attend", []),
    iconCards("travel", "Plan your trip"),
    defineField({
      name: "cfp",
      title: "Call for speakers",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 3 }),
        labelText("steps", "Steps"),
        defineField({ name: "cta", title: "Button text", type: "string" }),
        defineField({ name: "href", title: "Button link", type: "string" }),
        defineField({ name: "note", type: "string" }),
      ],
    }),
    defineField({
      name: "howItWorks",
      title: "How it works",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 2 }),
        defineField({
          name: "steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "howStep",
              fields: [
                defineField({ name: "number", type: "string" }),
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 2 }),
                defineField({ name: "theme", type: "string", options: { list: ["primary", "navy", "cream"] } }),
              ],
              preview: { select: { title: "title", subtitle: "number" } },
            }),
          ],
        }),
        defineField({
          name: "cta",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text", rows: 2 }),
            defineField({ name: "label", title: "Button text", type: "string" }),
            defineField({ name: "href", title: "Button link", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "brand", type: "string" }),
        defineField({ name: "blurb", type: "string" }),
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "city", type: "string" }),
        linkList("socials", "Social links"),
        linkList("legal", "Legal links"),
      ],
    }),
  ].map((f) =>
    // Put the list fields into the right tab.
    f.name === "whyAttend" || f.name === "travel" ? { ...f, group: "sections" } : f,
  ),
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    pageHero,
    defineField({
      name: "story",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
        ...imageFields("image", "Image"),
        ...imageFields("image2", "Second image"),
        ...imageFields("banner", "Banner image"),
        ...imageFields("ctaImage", "CTA image"),
      ],
    }),
    defineField({
      name: "values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [defineField({ name: "title", type: "string" }), defineField({ name: "text", type: "text", rows: 3 })],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "team",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "member",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "role", type: "string" }),
            ...imageFields("photo", "Photo"),
            defineField({ name: "linkedin", title: "LinkedIn URL", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "photo" } },
        }),
      ],
    }),
    defineField({
      name: "teamQuote",
      type: "object",
      fields: [
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "name", type: "string" }),
        defineField({ name: "role", type: "string" }),
        ...imageFields("photo", "Photo"),
      ],
    }),
    defineField({
      name: "city",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "coords", title: "Coordinates", type: "string" }),
        ...imageFields("image", "Image"),
        iconCards("facts", "Facts"),
      ],
    }),
    defineField({
      name: "process",
      type: "object",
      fields: [defineField({ name: "title", type: "string" }), labelText("steps", "Steps")],
    }),
    defineField({
      name: "cta",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 2 }),
        link("primary", "Primary button"),
        link("secondary", "Secondary button"),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    pageHero,
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "address", title: "Address lines", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "hours", type: "string" }),
    defineField({ name: "topics", title: "Form topics", type: "array", of: [{ type: "string" }] }),
    iconCards("help", "Help cards", [
      defineField({ name: "topic", type: "string", description: "Must match one of the form topics above." }),
    ]),
    linkList("quick", "Quick links"),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});
