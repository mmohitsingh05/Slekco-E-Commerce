import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError.js';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message = status >= 500 ? 'Internal server error' : err.message;

  if (status >= 500) console.error(err);

  res.status(status).json({ success: false, message });
}