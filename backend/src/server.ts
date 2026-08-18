import mongoose from 'mongoose';
import { createApp } from './app.js';
import { env } from './config/env.js';

async function start(): Promise<void> {
  if (!env.mongoUri) {
    console.warn('[server] MONGODB_URI not set — starting without database connection.');
  } else {
    await mongoose.connect(env.mongoUri);
    console.log('[server] MongoDB connected');
  }

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`[server] Slekco API listening on http://localhost:${env.port} (${env.nodeEnv})`);
  });
}

start().catch((err) => {
  console.error('[server] failed to start', err);
  process.exit(1);
});