// Sanity Studio config. The Studio is not part of the public site: it runs with the Sanity CLI,
// locally with `npm run studio` and hosted on Sanity with `npm run studio:deploy` (<host>.sanity.studio).
import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { SINGLETONS, schemaTypes } from "./sanity/schemaTypes";

const SINGLETON_TITLES: Record<(typeof SINGLETONS)[number], string> = {
  siteSettings: "Site settings",
  aboutPage: "About page",
  contactPage: "Contact page",
};

// Sidebar: the three one-off pages first, then every list.
const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((id) =>
        S.listItem().title(SINGLETON_TITLES[id]).id(id).child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() as (typeof SINGLETONS)[number])),
    ]);

export default defineConfig({
  name: "atlas",
  title: "Atlas Global",
  projectId: projectId || "missing-project-id",
  dataset,
  schema: {
    types: schemaTypes,
    // Hide "create new" for singletons.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType as never)),
  },
  document: {
    // No duplicate/delete for singletons.
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType as never)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
