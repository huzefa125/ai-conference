# Editing the site with Sanity

All site content can be edited in Sanity Studio at **/studio**. Any field left empty in Sanity uses the built-in content in `lib/*-data.ts`, so nothing on the page goes blank.

## How publishing works: the site is static

Content is read from Sanity **once, during `npm run build`**, and baked into static pages. The live site never asks Sanity for content, so it is fast and keeps working even if Sanity is down.

**Publishing in the Studio does not change the live site by itself.** To put changes live:

1. Publish your changes in the Studio.
2. Run a new build and deploy it (`npm run build`, or trigger a deploy on your host).

- **Local preview:** `npm run dev` picks up published changes when you reload the page.
- **Failed builds:** if Sanity cannot be reached during a build, the build stops with an error instead of deploying the built-in content.
- **Static guarantee:** the root layout sets `ensureStatic = "navigation"`, so the build also fails if anyone adds code that would render per request.

**Optional: rebuild automatically on publish.** Most hosts (Vercel, Netlify, Cloudflare Pages) offer a *deploy hook* URL that starts a build. Create a webhook in sanity.io/manage → **API → Webhooks**, pointing at that URL (dataset `production`, triggers Create/Update/Delete, method `POST`). Each publish then starts a fresh build.

## One-time setup

1. **Create a project.** Go to [sanity.io/manage](https://www.sanity.io/manage) and create a free project. Choose the `production` dataset.
2. **Connect it.** Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID` to your project ID. Restart `npm run dev`. Set the same variables in your host's build environment.
3. **Allow the Studio to talk to Sanity.** In sanity.io/manage → your project → **API → CORS origins**, add `http://localhost:3000` and your live domain, each with **Allow credentials** ticked.
4. **Import the current content**, so editors start from what is on the site today:
   ```bash
   npx sanity login
   npx sanity exec scripts/seed-sanity.ts --with-user-token
   ```
   Re-running it is safe: documents that already exist are left alone. Adding `-- --replace` overwrites them with the built-in content, which **discards edits made in the Studio**.
5. **Rebuild** to put the imported content live (see "How publishing works" above).

## What editors can change

| In the Studio | Where it shows on the site |
| --- | --- |
| **Site settings → Event** | Event dates and city details, the 3 / 5 / 1,000+ stats |
| **Site settings → Home sections** | Why attend, Plan your trip, Call for speakers, How it works |
| **Site settings → Footer & contact** | Footer brand, email, phone, city, social and legal links |
| **About page**, **Contact page** | Those pages |
| Speakers, Agenda days, Tracks, Tickets, Sponsors, FAQs, Testimonials | Their home page sections (Speakers also feed the hero avatars) |
| Blog posts | /blog, the blog section on the home page, the navbar menu |
| Conferences | /conferences and the navbar menu (the first one is shown as the flagship) |
| Highlight cards, Experience photos | "Your three days" and "The experience" sections |

**Notes for editors**
- **Images:** upload an image, or paste an external URL. An uploaded image is used if both are set.
- **Order:** lists are shown by **Sort order**, lowest number first.
- **Lists replace the built-in ones.** Once a list has at least one entry in Sanity (for example one speaker), only the Sanity entries are shown. Deleting all entries brings the built-in list back.
- **Blog text** is shown as plain paragraphs. Bold, links and headings in the editor are not rendered yet.
- **Still in code:** the hero headline, the keynote statement and the About page's highlighted sentence are part of the design, so they are not in the Studio.

## Files

- `sanity.config.ts`: Studio setup (sidebar, the three one-off pages)
- `sanity/schemaTypes/`: the editing forms
- `lib/content-build.ts`: the query, and how Sanity content is merged with the built-in content
- `lib/content.ts`: build-time fetch used by pages (`getContent()`)
- `components/content-provider.tsx`: `useContent()` for client components
- `scripts/seed-sanity.ts`: content import
