// Sanity connection settings. Set these in .env.local (see .env.local.example).
// Until a project ID is set, the site keeps using the local data in lib/data/*.ts.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-01";

export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);
