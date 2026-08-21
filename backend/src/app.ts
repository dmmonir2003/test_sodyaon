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
import categoryRouter from './modules/category/category.route';
import uiSectionRouter from './modules/content/landing/uisection.route';
import campaignRouter from './modules/campaign/campaign.route';

// Import newly added ERD routers
import brandRouter from './modules/brand/brand.route';
import filterRouter from './modules/filter/filter.route';
import couponRouter from './modules/order/coupon.route';
import campaignDealsRouter from './modules/campaign/deals.route';
import reviewRouter from './modules/review/review.route';
import qaRouter from './modules/qa/qa.route';
import userActivityRouter from './modules/userActivity/userActivity.route';
import comboRouter from './modules/campaign/combo.route';
import menuRouter from './modules/menu/menu.route';
import marketingSettingsRouter from './modules/marketingSettings/marketingSettings.route';

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
app.use('/api/users', userRouter);

app.use('/api/products', productRouter);
app.use('/api/product', productRouter);

app.use('/api/cart', cartRouter);
app.use('/api/carts', cartRouter);

app.use('/api/orders', orderRouter);
app.use('/api/order', orderRouter);

app.use('/api/categories', categoryRouter);
app.use('/api/category', categoryRouter);

app.use('/api/content/landing', landingRouter);
app.use('/api/content/blog', blogRouter);
app.use('/api/content/deals', dealsRouter); // Legacy content deals
app.use('/api/ai', aiRouter);
app.use('/api/admin/finance', financeRouter);
app.use('/api/finance', financeRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/content/ui-sections', uiSectionRouter);
app.use('/api/campaigns', campaignRouter);
app.use('/api/campaign', campaignRouter);

// Upgraded ERD Routes mount
app.use('/api/brands', brandRouter);
app.use('/api/brand', brandRouter);

app.use('/api/filters', filterRouter);
app.use('/api/filter', filterRouter);

app.use('/api/coupons', couponRouter);
app.use('/api/coupon', couponRouter);

app.use('/api/campaign-deals', campaignDealsRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/review', reviewRouter);

app.use('/api/qa', qaRouter);
app.use('/api/user-activities', userActivityRouter);
app.use('/api/combos', comboRouter);
app.use('/api/combo', comboRouter);

app.use('/api/menus', menuRouter);
app.use('/api/menu', menuRouter);

app.use('/api/settings/marketing', marketingSettingsRouter);

// Singular-to-Plural Route Aliases & Redirects
app.use('/api/category', (req, res, next) => {
  req.url = req.url === '' ? '/' : req.url;
  categoryRouter(req, res, next);
});
app.use('/api/product', (req, res, next) => {
  req.url = req.url === '' ? '/' : req.url;
  productRouter(req, res, next);
});
app.use('/api/brand', (req, res, next) => {
  req.url = req.url === '' ? '/' : req.url;
  brandRouter(req, res, next);
});
app.use('/api/order', (req, res, next) => {
  req.url = req.url === '' ? '/' : req.url;
  orderRouter(req, res, next);
});
app.use('/api/coupon', (req, res, next) => {
  req.url = req.url === '' ? '/' : req.url;
  couponRouter(req, res, next);
});
app.use('/api/menu', (req, res, next) => {
  req.url = req.url === '' ? '/' : req.url;
  menuRouter(req, res, next);
});

// 8. 404 handler for unmatched routes
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found - ${req.originalUrl}`));
});

// 9. Global error handling middleware
app.use(errorHandler);

export default app;
