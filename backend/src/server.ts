import 'dotenv/config';
import app from './app';
import { connectDB } from './config/db';

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('[UNCAUGHT EXCEPTION] Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Server Running] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[Server Running] Listening at: http://localhost:${PORT}`);
});

// Connect to Database asynchronously
connectDB();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  console.error('[UNHANDLED REJECTION] Log:', err?.message || err);
});
