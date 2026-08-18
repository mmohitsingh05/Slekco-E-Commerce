import type { Request, RequestHandler, Response } from 'express';
import type { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';

export function validate<T extends z.ZodType>(
  schema: T,
  source: 'body' | 'query' = 'body',
): RequestHandler {
  return (req: Request, res: Response, next) => {
    const result = schema.safeParse(source === 'query' ? req.query : req.body);
    if (!result.success) {
      const details = result.error.issues.map(
        (issue) => `${issue.path.join('.') || source}: ${issue.message}`,
      );
      throw new ApiError(422, 'Validation failed', details);
    }
    if (source === 'query') res.locals.validatedQuery = result.data;
    else req.body = result.data;
    next();
  };
}