# Personal site

[TanStack Start](https://tanstack.com/start) on Vite, fully prerendered to static HTML and
deployed on Netlify. Content is Markdown frontmatter edited through
[Decap CMS](https://decapcms.org/), which commits straight back to this repo.

Served on Netlify's own `*.netlify.app` subdomain. There is no custom domain — the
`jesperdamgaard.dk` domain is no longer registered, though the GitHub repo keeps that name.

## Getting started

Requires Node 24 (see `.nvmrc`) and pnpm.

```bash
pnpm install
pnpm dev
```

The site runs on http://localhost:3000.

## Scripts

| Script                  | What it does                                          |
| ----------------------- | ----------------------------------------------------- |
| `pnpm dev`              | Dev server with Netlify platform emulation            |
| `pnpm build`            | Prerender every route to static HTML in `dist/client` |
| `pnpm start`            | Serve the production build locally                    |
| `pnpm typecheck`        | `tsc --noEmit`                                        |
| `pnpm lint`             | Biome lint + format check                             |
| `pnpm format`           | Biome, writing fixes                                  |
| `pnpm storybook`        | Storybook on http://localhost:6006                    |

## Content

Pages read their content from `content/pages/*.md`. The frontmatter is parsed at build time
by the small `page-content` plugin in `vite.config.ts`, which exposes it as the virtual module
`virtual:page-content`; `src/pageContent.ts` re-exports it with types. Parsing at build time
keeps the YAML parser out of the browser bundle entirely — importing `gray-matter` from a route
instead cost 54 kB gzipped per page load and shipped a direct `eval`.

Editing happens at `/admin`, configured in `public/admin/config.yml`. That file and the
frontmatter keys in `content/pages/*.md` have to agree — if you rename a field in one, rename
it in the other, or the page will render nothing.

`/admin` is a server route (`src/routes/admin.ts`) returning a standalone HTML document that
loads a pinned Decap build from a CDN. The CMS stays out of the app bundle, so a CMS upgrade
can never break the site build. It is a server route rather than a file in `public/` because a
static `public/admin/index.html` is only reachable if the host resolves `/admin` to
`/admin/index.html` before falling back to the app — which the router does not do locally, and
which varies by host.

## Deployment

Netlify builds from `main` and serves the site on its own `*.netlify.app` subdomain — there is
no custom domain. `netlify.toml` sets the build command and publish directory, and `.nvmrc`
pins Node; both override anything configured in the Netlify dashboard.

## Notes

- **`typed.js` is pinned to `2.1.0` on purpose.** It is the last MIT release; `3.0.0`
  relicensed to GPL-3.0, which would attach copyleft obligations to the bundle served to
  visitors. Do not bump it without deciding that is acceptable.
- **There is no ESLint.** `typescript-eslint` declares `peerDependencies.typescript` as
  `<6.1.0` and cannot run on TypeScript 7, which ships without the public compiler API until
  7.1. Biome covers linting and formatting instead.
