import React from 'react';
import '../styles/globals.scss';

export const decorators = [(Story) => <Story />];
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
