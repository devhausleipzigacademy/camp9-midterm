import { z } from 'zod';
export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export type LoginUser = z.infer<typeof loginValidation>;
