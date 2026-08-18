import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80),
  email: z.string().trim().email('Invalid email address'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
});