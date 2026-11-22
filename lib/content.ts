import "server-only";
import { cacheLife } from "next/cache";
import { client } from "@/sanity/client";
import { LOCAL_CONTENT, type SiteContent } from "./content-local";
import { QUERY, buildContent, clean } from "./content-build";

export type { SiteContent };

/**
 * All site content, read from Sanity once during `next build` and baked into the static pages.
 * Production never refetches: publishing in Sanity changes the live site only after the next build.
 * In `next dev` it refreshes on reload so you can preview edits locally.
 * Falls back to the local data (lib/data/*.ts) field by field.
 */
export async function getContent(): Promise<SiteContent> {
  "use cache";
  cacheLife(
    process.env.NODE_ENV === "development"
      ? // Server copy refreshes 1s after a request, so a reload shows new edits. stale/expire stay at
        // Next's 5-minute minimum: anything shorter is pushed out of the static shell and flagged in dev.
        { stale: 300, revalidate: 1, expire: 300 }
      : { stale: Infinity, revalidate: Infinity, expire: Infinity },
  );

  if (!client) return LOCAL_CONTENT;
  try {
    return buildContent(clean(await client.fetch<Record<string, unknown>>(QUERY)));
  } catch (err) {
    // A production build must not quietly ship the built-in content instead of what editors published.
    if (process.env.NODE_ENV !== "development") {
      throw new Error("Could not load content from Sanity, so the build was stopped. Check the project ID and try again.", { cause: err });
    }
    console.error("[sanity] fetch failed, using local content:", err);
    return LOCAL_CONTENT;
  }
}

export async function getPost(slug: string) {
  const { posts } = await getContent();
  return posts.find((p) => p.slug === slug);
}
