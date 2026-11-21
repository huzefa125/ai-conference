import { defineField } from "sanity";
import { ICON_NAMES } from "../../lib/icon-names";

/** An uploadable image plus a URL fallback (the seeded content uses external URLs). Upload wins when both are set. */
export function imageFields(name: string, title: string, group?: string) {
  return [
    defineField({ name, title, type: "image", options: { hotspot: true }, group }),
    defineField({
      name: `${name}Url`,
      title: `${title} (external URL)`,
      type: "url",
      description: "Used only when no image is uploaded above.",
      group,
    }),
  ];
}

/** Manual sort order for lists shown on the site. Lower numbers come first. */
export const orderField = defineField({
  name: "order",
  title: "Sort order",
  type: "number",
  description: "Lower numbers appear first.",
  initialValue: 100,
});

export const TRACK_OPTIONS = [
  { title: "AI Frontiers", value: "ai-frontiers" },
  { title: "AI Builders", value: "ai-builders" },
  { title: "The AI Stack", value: "ai-stack" },
  { title: "Applied AI", value: "applied-ai" },
  { title: "AI Strategy", value: "ai-strategy" },
];

/** Dropdown of the icons the site can render (see lib/icons.ts). */
export const iconField = (description?: string) =>
  defineField({
    name: "icon",
    type: "string",
    description,
    options: { list: ICON_NAMES.map((n) => ({ title: n.replace(/([a-z])([A-Z])/g, "$1 $2"), value: n })) },
  });
