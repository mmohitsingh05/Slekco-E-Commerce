import { connectDb, disconnectDb } from './config/db.js';
import { createApp } from './app.js';
import { env } from './config/env.js';

async function start(): Promise<void> {
  await connectDb();
  console.log('[server] MongoDB connected');

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`[server] Slekco API listening on http://localhost:${env.port} (${env.nodeEnv})`);
  });

  const shutdown = async (): Promise<void> => {
    server.close();
    await disconnectDb();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

start().catch((err) => {
  console.error('[server] failed to start', err);
  process.exit(1);
});