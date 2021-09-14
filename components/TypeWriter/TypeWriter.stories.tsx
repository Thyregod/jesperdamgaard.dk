import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TypeWriter } from './TypeWriter';

export default {
  title: TypeWriter.name,
  component: TypeWriter,
} as ComponentMeta<typeof TypeWriter>;

const Template: ComponentStory<typeof TypeWriter> = (args) => <TypeWriter {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  texts: ['Hi', 'I am Jesper Damgaard'],
};
