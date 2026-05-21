import app from '../src/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sodayon';

// Ensure a single cached database connection in Serverless environments
let cachedConnection: any = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }
  
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      bufferCommands: false, // Disable Mongoose buffering for faster serverless responses
    });
    cachedConnection = conn;
    console.log(`[MongoDB Serverless Connected] Host: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    console.error(`[MongoDB Serverless Connection Error] ${error.message}`);
    throw error;
  }
};

export default async function handler(req: any, res: any) {
  // 1. Establish database connection before processing request
  await connectDB();

  // 2. Delegate request handling directly to Express
  return app(req, res);
}
