import type { Meta, StoryObj } from '@storybook/react';
import HeaderPage from '../components/HeaderPage';

const meta: Meta<typeof HeaderPage> = {
  title: 'Page Header',
  component: HeaderPage,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderPage>;

export const WithoutHeart: Story = {
  args: {
    children: 'Page Header',
  },
};
export const WithHeart: Story = {
  args: {
    children: 'Page Header',
    hasHeartButton: true,
  },
};
