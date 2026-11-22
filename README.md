# Atlas Global 2026 website

Next.js site for Atlas Global 2026, with content managed in Sanity. The site is fully static: content is read during `npm run build`. See [SANITY.md](SANITY.md) for editing and publishing.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local site at http://localhost:3000, Studio at /studio |
| `npm run build` | Production build (reads content from Sanity) |
| `npm run lint` | Lint |
| `npm run sanity:push` | Overwrite Sanity with the content in `lib/data/` |
| `npm run sanity:seed` | Add any missing documents to Sanity, without overwriting |

## Folder structure

```
app/                     routes: home, about, blog, conferences, contact, studio
components/
  sections/              page sections (hero, agenda, speakers, travel, tickets…)
  layout/                navbar, footers, page shell, background bands (tone)
  ui/                    building blocks (button, card, sheet, navigation menu, marquee)
  icons/                 brand marks
  providers/             content provider (useContent for client components)
lib/
  data/                  built-in content, also what `sanity:push` sends to Sanity
  content.ts             getContent(): build-time fetch, falls back to lib/data
  content-build.ts       Sanity query and the merge with built-in content
  icons.ts, utils.ts     shared helpers
sanity/                  Studio forms (schemaTypes) and client settings
scripts/                 Sanity import (seed) script
public/                  logo, images, icons
```

## Environment

Copy `.env.local.example` to `.env.local` and set the Sanity project ID. Without it, the site uses the content in `lib/data/`.
