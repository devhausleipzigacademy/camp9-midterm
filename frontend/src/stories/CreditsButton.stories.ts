import { Meta, StoryObj } from '@storybook/react';
import CreditsButton from '../components/credits/CreditsButton';

const meta: Meta<typeof CreditsButton> = {
  title: 'CreditsButton',
  component: CreditsButton,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreditsButton>;

export const Default: Story = {
  args: {
    children: 'Cast',
  },
};

export const Active: Story = {
  args: {
    children: 'Cast',
    status: 'active',
  },
};

export const Passive: Story = {
  args: {
    children: 'Crew',
    status: 'passive',
  },
};
