import type { Meta, StoryObj } from '@storybook/react';
import WelcomeHeader from '../components/WelcomeHeader';

const meta: Meta<typeof WelcomeHeader> = {
  title: 'WelcomeHeader',
  component: WelcomeHeader,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
export default meta;

type Story = StoryObj<typeof WelcomeHeader>;

export const Default: Story = {
  args: {},
};
