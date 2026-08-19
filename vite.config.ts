import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import netlify from '@netlify/vite-plugin-tanstack-start';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import matter from 'gray-matter';
import { defineConfig, type Plugin } from 'vite';

const CONTENT_FILES = {
  homeContent: 'content/pages/home.md',
  wishesContent: 'content/pages/oensker.md',
} as const;

/**
 * Page content is a build-time constant, so the frontmatter is parsed here and the
 * client receives plain JSON. Importing gray-matter from a route instead put 54 kB
 * gzipped of YAML parser — and a direct `eval` — into every page load.
 */
function pageContent(): Plugin {
  const VIRTUAL_ID = 'virtual:page-content';
  const paths = Object.values(CONTENT_FILES).map((file) => resolve(file));

  return {
    name: 'page-content',
    resolveId: (id) => (id === VIRTUAL_ID ? `\0${VIRTUAL_ID}` : undefined),
    load(id) {
      if (id !== `\0${VIRTUAL_ID}`) return undefined;
      for (const path of paths) this.addWatchFile(path);

      return Object.entries(CONTENT_FILES)
        .map(([name, file]) => {
          const { data } = matter(readFileSync(resolve(file), 'utf-8'));
          return `export const ${name} = ${JSON.stringify(data)};`;
        })
        .join('\n');
    },
    configureServer(server) {
      server.watcher.on('change', (changed) => {
        if (!paths.includes(resolve(changed))) return;
        const mod = server.moduleGraph.getModuleById(`\0${VIRTUAL_ID}`);
        if (mod) server.reloadModule(mod);
      });
    },
  };
}

// Storybook builds stories, not the app. It loads this config, and tanstackStart() then
// sees Storybook's own entry and fails with "multiple entries detected", so the app-only
// plugins are left out of that build.
const isStorybook = process.env.STORYBOOK === 'true';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    pageContent(),
    ...(isStorybook
      ? []
      : [
          tanstackStart({
            prerender: {
              enabled: true,
              // Both routes are static, so autoStaticPathsDiscovery finds them.
              // crawlLinks alone would miss /oensker: nothing links to it.
              autoStaticPathsDiscovery: true,
              crawlLinks: true,
              failOnError: true,
            },
          }),
          netlify(),
        ]),
    viteReact(),
  ],
});
