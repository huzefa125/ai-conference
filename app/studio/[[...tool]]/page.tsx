// Sanity Studio, served at /studio. Editors sign in with their Sanity account.
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

// The Studio is a single client-side app: prerender /studio itself; its inner screens route in the browser.
export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 font-sans">
        <h1 className="text-2xl font-bold">Sanity is not connected yet</h1>
        <p className="mt-4 text-muted-foreground">
          Create a free project at sanity.io/manage, then add its project ID to <code>.env.local</code> as{" "}
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and restart the dev server. The site keeps using its built-in
          content until then.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
