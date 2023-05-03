import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../components/Searchbar';

const meta: Meta<typeof SearchBar> = {
  title: 'SearchBar',
  component: SearchBar,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    children: 'SearchBar',
  },
};
