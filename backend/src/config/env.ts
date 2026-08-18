import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGODB_URI ?? '',
  clientOrigins:
    process.env.CLIENT_ORIGINS?.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean) ?? [],
};