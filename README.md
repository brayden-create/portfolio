# Brayden Gregersen · portfolio + resume

Live: https://bedtimebuilds.com

SvelteKit (Svelte 5 runes, TypeScript), prerendered and deployed to Cloudflare Pages. The visual design is a from-scratch homage to nexplayground.com, using open-source fonts (Rubik, Be Vietnam Pro). It isn't affiliated with Nex.

## How it's put together

- `src/lib/data/projects.ts` holds the content model. Projects are typed documents, so they could move into a headless CMS (for example Sanity) without touching components.
- `src/lib/components/` is the small component set: `Nav`, `Button`, `ProjectCard`, `WordBands`, `Cube` (a CSS-only 3D cube) and `Footer`.
- `src/routes/resume/` is the resume. A print stylesheet turns the same page into a one-page letter PDF.
- `scripts/scrub.js` is a copy lint that runs before every build and fails it on em/en dashes and stock AI phrasing.

## Develop

```bash
npm install
npm run dev        # local dev
npm run check      # svelte-check + TypeScript
npm run build      # copy lint + prerendered build to .svelte-kit/cloudflare
npx wrangler pages deploy .svelte-kit/cloudflare --project-name=brayden-gregersen --branch=main
```
