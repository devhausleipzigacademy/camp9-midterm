import { z } from 'zod';
export const bookingValidation = z.object({
  seats: z.array(z.string()),
  time: z.string(),
  date: z.string(),
  movieId: z.string(),
});

export type Booking = z.infer<typeof bookingValidation>;
