import type { Meta, StoryObj } from '@storybook/react';
import Credits from '../pages/Credits';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta<typeof Credits> = {
  title: 'Credits Page',
  component: Credits,
  decorators: [withRouter],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
export default meta;
export const Default: StoryObj<typeof Credits> = {
  args: {
    movieId: 5,
  },
};
