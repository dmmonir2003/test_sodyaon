import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Import routers
import authRouter from './modules/auth/auth.route';
import userRouter from './modules/user/user.route';
import productRouter from './modules/product/product.route';
import cartRouter from './modules/cart/cart.route';
import orderRouter from './modules/order/order.route';
import landingRouter from './modules/content/landing/landing.route';
import blogRouter from './modules/content/blog/blog.route';
import dealsRouter from './modules/content/deals/deals.route';
import aiRouter from './modules/ai/ai.route';
import financeRouter from './modules/finance/finance.route';
import uploadRouter from './modules/upload/upload.route';

// Import error handler
import { errorHandler } from './middleware/errorHandler';
import { ApiError } from './utils/ApiError';

const app = express();

// 1. Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// 2. CORS Setup (flexible for development)
app.use(
  cors({
    origin: true, // Allow all origins in dev, configure for production
    credentials: true,
  })
);

// 3. Request Body Parsers (including Raw body for Stripe Webhook)
app.use(
  express.json({
    limit: '10mb',
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Sanitize data against NoSQL query injection
app.use(mongoSanitize());

// 5. Rate Limiting for Auth API paths
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP. Please try again after 15 minutes',
});
app.use('/api/auth', authLimiter);

// 6. Static files directory for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

// 7. Route Mappings
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/content/landing', landingRouter);
app.use('/api/content/blog', blogRouter);
app.use('/api/content/deals', dealsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/admin/finance', financeRouter);
app.use('/api/upload', uploadRouter);

// 8. 404 handler for unmatched routes
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found - ${req.originalUrl}`));
});

// 9. Global error handling middleware
app.use(errorHandler);

export default app;
