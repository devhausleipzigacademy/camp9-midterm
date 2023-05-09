import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button';
import PaginationButtons from '../components/PaginationButtons';

const meta: Meta<typeof PaginationButtons> = {
  title: 'PaginationButtons',
  component: PaginationButtons,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationButtons>;

export const Default: Story = {
  args: {},
};
