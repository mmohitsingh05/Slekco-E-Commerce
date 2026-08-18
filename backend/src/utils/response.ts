import type { Response } from 'express';

export function success(res: Response, data: unknown, status = 200): void {
  res.status(status).json({ success: true, data });
}

export function fail(res: Response, status: number, message: string, errors?: unknown[]): void {
  res.status(status).json({ success: false, message, ...(errors ? { errors } : {}) });
}