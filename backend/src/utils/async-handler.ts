import type { NextFunction, Request, RequestHandler, Response } from 'express';

type RouteParams = Record<string, string | string[]>;

export function asyncHandler<P = RouteParams>(
  fn: (req: Request<P>, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler<P> {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}