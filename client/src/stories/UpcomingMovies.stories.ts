import type { Meta, StoryObj } from '@storybook/react';
import UpcomingMovies from '../components/UpcomingMovies';

const meta: Meta<typeof UpcomingMovies> = {
  title: 'UpcomingMovies',
  component: UpcomingMovies,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UpcomingMovies>;

export const Default: Story = {
  // args: {
  //   children: 'UpcomingMovies',
  // },
};
