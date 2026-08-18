import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';

export function createApp(): express.Express {
  const app = express();

  const origins =
    env.clientOrigins.length > 0 ? env.clientOrigins : ['http://localhost:3000'];

  app.use(helmet());
  app.use(cors({ origin: origins, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/api/v1/health', (_req: Request, res: Response) => {
    const dbState = mongoose.connection.readyState;
    res.json({
      success: true,
      data: {
        status: 'ok',
        db: dbState === 1 ? 'connected' : 'disconnected',
        uptime: Math.round(process.uptime()),
      },
    });
  });

  app.use(notFoundMiddleware);
  app.use(errorMiddleware as unknown as (err: Error, req: Request, res: Response, next: NextFunction) => void);

  return app;
}