// Sanity connection settings. Set these in .env.local (see .env.local.example).
// Until a project ID is set, the site keeps using the local data in lib/data/*.ts.
//
// Two names for each value: the Next.js site only sees NEXT_PUBLIC_* variables, and the Studio
// (built by the Sanity CLI) only sees SANITY_STUDIO_* variables. Set both to the same value.

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-01";

export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);
