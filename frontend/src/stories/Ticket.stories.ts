import { Story, Meta } from '@storybook/react';
import Ticket from '../pages/Ticket';

export default {
  title: 'Components/Ticket',
  component: Ticket,
} as Meta;

const Template: Story<TicketProps> = args => <Ticket {...args} />;

export const Default = Template.bind({});
Default.args = {
  movieTitle: 'The Matrix',
  movieTime: '7:00 PM',
  movieDate: 'April 21, 2023',
};
