import { Router } from 'express';
import {
  checkout,
  getUserOrders,
  updateOrderStatus,
  handleStripeWebhook,
} from './order.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Webhook endpoint (Requires raw request body, bypasses auth protect)
router.post('/webhook', handleStripeWebhook);

// Protected shopping endpoints
router.post('/checkout', protect, checkout);
router.get('/my-orders', protect, getUserOrders);

// Protected admin endpoints
router.patch('/:orderId', protect, requirePermission('canManageOrders'), updateOrderStatus);

export default router;
