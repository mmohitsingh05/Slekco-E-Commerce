import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { success } from '../utils/response.js';
import { createOrder, getOrderById } from '../services/order.service.js';

export const createOrderController = asyncHandler(async (req: Request, res: Response) => {
  const order = await createOrder({ items: req.body.items });
  success(res, { order }, 201);
});

export const getOrderController = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const order = await getOrderById(req.params.id);
  success(res, { order });
});