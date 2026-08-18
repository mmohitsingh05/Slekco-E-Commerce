import { z } from 'zod';

const objectId = /^[a-f\d]{24}$/i;

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        product: z.string().regex(objectId, 'Invalid product id'),
        quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1').max(99),
      }),
    )
    .min(1, 'At least one item is required'),
});