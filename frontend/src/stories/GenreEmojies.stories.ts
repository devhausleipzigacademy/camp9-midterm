import type { Meta, StoryObj } from '@storybook/react';
import GenreBtn from '../components/GenreBtn';

const meta: Meta<typeof GenreBtn> = {
  title: 'Emojies Button',
  component: GenreBtn,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GenreBtn>;

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
