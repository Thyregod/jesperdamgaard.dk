import type { Meta, StoryObj } from '@storybook/react-vite';

import { TypeWriter } from './TypeWriter';

const meta = {
  title: 'TypeWriter',
  component: TypeWriter,
} satisfies Meta<typeof TypeWriter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    texts: ['Hi', 'I am Jesper Damgaard'],
  },
};
