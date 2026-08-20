import type { Meta, StoryObj } from '@storybook/react-vite';

import { SeasonalBackground } from './SeasonalBackground';

const meta = {
  title: 'SeasonalBackground',
  component: SeasonalBackground,
} satisfies Meta<typeof SeasonalBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Christmas: Story = {
  args: {
    season: 'christmas',
  },
};

export const Birthday: Story = {
  args: {
    season: 'birthday',
  },
};
