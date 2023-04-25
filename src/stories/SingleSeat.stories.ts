import type { Meta, StoryObj } from '@storybook/react';
import SingleSeat from '../components/selectSeats/SingleSeat';

const meta: Meta<typeof SingleSeat> = {
  title: 'SingleSeat',
  component: SingleSeat,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SingleSeat>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const notSelected: Story = {
  args: {
    disabled: false,
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    disabled: false,
    isSelected: true,
  },
};
