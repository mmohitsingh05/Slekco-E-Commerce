import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import orderRoutes from './routes/order.routes.js';
import contactRoutes from './routes/contact.routes.js';

export function createApp(): express.Express {
  const app = express();

  const origins =
    env.clientOrigins.length > 0 ? env.clientOrigins : ['http://localhost:3000'];

  app.use(helmet());
  app.use(cors({ origin: origins, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (env.nodeEnv !== 'test') {
    app.use(morgan('dev'));
  }

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

  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/orders', orderRoutes);
  app.use('/api/v1/contact', contactRoutes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware as unknown as (err: Error, req: Request, res: Response, next: NextFunction) => void);

  return app;
}