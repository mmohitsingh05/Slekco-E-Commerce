import type { RequestHandler } from 'express';
import type { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';

export function validate<T extends z.ZodType>(
  schema: T,
  source: 'body' | 'query' = 'body',
): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const details = result.error.issues.map(
        (issue) => `${issue.path.join('.') || 'body'}: ${issue.message}`,
      );
      throw new ApiError(422, 'Validation failed', details);
    }
    if (source === 'query') Object.assign(req.query, result.data);
    else req.body = result.data;
    next();
  };
}