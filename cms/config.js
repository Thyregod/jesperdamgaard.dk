/**
 * Guide
 * https://jakeprins.com/blog/how-to-implement-netlify-cms-with-next-js
 */

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  cms_manual_init: true,
  backend: {
    name: 'github',
    repo: 'Thyregod/jesperdamgaard.dk',
    branch: 'main',
  },
  media_folder: 'public/img',
  public_folder: 'img',
  collections: [
    {
      name: 'pages',
      label: 'Pages',
      files: [
        {
          label: 'Home',
          name: 'home',
          file: 'content/pages/home.md',
          fields: [
            {
              label: 'Typewriter texts',
              name: 'typewriterTexts',
              widget: 'list',
            },
            {
              label: 'LinkedIn href',
              name: 'linkedInHref',
              widget: 'string',
            },
          ],
        },
        {
          label: 'Ønsker',
          name: 'wishes',
          file: 'content/pages/oensker.md',
          fields: [
            {
              label: 'Ønske',
              name: 'wishes',
              widget: 'list',
              field: { label: 'Ønske', name: 'wish', widget: 'text' },
            },
          ],
        },
      ],
    },
  ],
};
