/**
 * Guide
 * https://jakeprins.com/blog/how-to-implement-netlify-cms-with-next-js
 */

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
      extension: 'json',
      files: [
        {
          label: 'Home',
          name: 'home',
          file: 'content/pages/home.json',
          fields: [
            {
              label: 'Typewriter text',
              name: 'typewriterText',
              widget: 'string',
            },
          ],
        },
      ],
    },
  ],
};
