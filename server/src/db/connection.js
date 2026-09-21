import mongoose from 'mongoose';
import config from '../config/env.js';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(config.mongoUri);
    isConnected = true;
    console.log(`  MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('  MongoDB connection error:', error.message);
    process.exit(1);
  }
}

export default mongoose;
