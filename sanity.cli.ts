import { defineCliConfig } from "sanity/cli";

// Used by `npm run studio`, `npm run studio:deploy` and the seed scripts.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  // The hosted Studio's address: <studioHost>.sanity.studio. Leave unset and `studio:deploy`
  // asks for a name the first time, or set it here, e.g. studioHost: "atlas-global".
});
