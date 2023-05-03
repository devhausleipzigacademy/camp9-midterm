import { Meta, StoryObj } from '@storybook/react';
import CreditsListItem from '../components/credits/CreditsListItem';

const meta: Meta<typeof CreditsListItem> = {
  title: 'CreditsListItem',
  component: CreditsListItem,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreditsListItem>;

export const Default: Story = {
  args: {
    url: 'https://image.tmdb.org/t/p/original/ewNO5cjiCa3d1qKnPhrapyz58od.jpg',
    actorName: 'some man',
    character: 'some role',
  },
};
