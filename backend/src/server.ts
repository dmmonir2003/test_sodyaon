import app from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('[UNCAUGHT EXCEPTION] Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`[Server Running] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`[Server Running] Listening at: http://localhost:${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: any) => {
    console.error('[UNHANDLED REJECTION] Shutting down gracefully...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
});
