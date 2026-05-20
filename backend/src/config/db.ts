import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sodayon';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('[MongoDB Warning] Disconnected from database');
});

mongoose.connection.on('error', (err) => {
  console.error(`[MongoDB Runtime Error] ${err.message}`);
});
