import { createFileRoute } from '@tanstack/react-router';

/**
 * Decap CMS, served as a standalone document rather than a React route: the CMS bundle
 * stays out of the app entirely, so a CMS upgrade can never break the site build.
 *
 * This is a server route, not a file in `public/`. A static `public/admin/index.html` is
 * only reachable if the host resolves `/admin` to `/admin/index.html` before falling back
 * to the app, which the router does not do locally and which varies by host. Serving it
 * here behaves the same everywhere.
 *
 * The CMS version is pinned deliberately -- floating it would let a CDN release break
 * /admin with no commit here to explain it.
 */
const CMS_VERSION = '3.15.1';

const html = `<!doctype html>
<html lang="da">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
    <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@${CMS_VERSION}/dist/decap-cms.js"></script>
  </body>
</html>
`;

export const Route = createFileRoute('/admin')({
  server: {
    handlers: {
      GET: () =>
        new Response(html, {
          headers: {
            'content-type': 'text/html; charset=utf-8',
            'x-robots-tag': 'noindex',
          },
        }),
    },
  },
});
