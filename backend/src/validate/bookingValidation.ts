import { z } from 'zod';
export const bookingValidation = z.object({
  seats: z.array(z.string()),
  date: z.date(),
  movieId: z.string(),
});

export type Booking = z.infer<typeof bookingValidation>;
