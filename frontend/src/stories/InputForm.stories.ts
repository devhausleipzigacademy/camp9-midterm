import type { Meta, StoryObj } from '@storybook/react';
import SingleInputFieldLogIn from '../components/SingleInputField';

const meta: Meta<typeof SingleInputFieldLogIn> = {
  title: 'InputForm',
  component: SingleInputFieldLogIn,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SingleInputFieldLogIn>;

export const Default: Story = {
  args: {
    placeholder: 'your@email.com',
  },
};

export const Email: Story = {
  args: {
    placeholder: 'your@email.com',
    svg: 'email',
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Enter your Password',
    svg: 'key',
  },
};
