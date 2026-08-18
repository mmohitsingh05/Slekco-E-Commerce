import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { success } from '../utils/response.js';

export const contactController = asyncHandler(async (_req: Request, res: Response) => {
  success(res, { message: 'Message received successfully.' });
});