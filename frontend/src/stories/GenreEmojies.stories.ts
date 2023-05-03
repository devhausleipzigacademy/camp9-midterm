import type { Meta, StoryObj } from '@storybook/react';
import Genreonclick from '../components/genre/Genreonclick';

const meta: Meta<typeof Genreonclick> = {
  title: 'Emojies Button',
  component: Genreonclick,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Genreonclick>;

export const Emojie: Story = {
  args: {
    emojie: '🧨',
    genre: 'Action',
    id: 1,
  },
};
export const Emojies: Story = {
  args: {
    emojie: '🤣',
    genre: 'Comedy',
    id: 4,
  },
};
