import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDb(): Promise<void> {
  if (!env.mongoUri) {
    throw new Error('MONGODB_URI is not set. Copy backend/.env.example to backend/.env and add your MongoDB connection string.');
  }
  await mongoose.connect(env.mongoUri);
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect();
}