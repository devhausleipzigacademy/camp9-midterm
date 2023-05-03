import { Meta, StoryObj } from '@storybook/react';
import BookingBtn from '../components/BookingBtn';

const meta: Meta<typeof BookingBtn> = {
  title: 'BookingBtn',
  component: BookingBtn,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookingBtn>;

export const Default: Story = {
  args: {
    children: '29 Dez',
  },
};

export const Available: Story = {
  args: {
    children: '29 Dez',
    disabled: true,
  },
};

export const NotAvailable: Story = {
  args: {
    children: '29 Dez',
    disabled: false,
  },
};
