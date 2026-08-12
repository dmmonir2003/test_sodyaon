import { Router } from 'express';
import {
  checkout,
  getUserOrders,
  updateOrderStatus,
  handleStripeWebhook,
  getAllOrders,
  trackOrder,
} from './order.controller';
import { protect, optionalProtect, requirePermission } from '../../middleware/auth';

const router = Router();

// Webhook endpoint (Requires raw request body, bypasses auth protect)
router.post('/webhook', handleStripeWebhook);

// Shopping endpoints
router.post('/checkout', optionalProtect, checkout);
router.get('/my-orders', protect, getUserOrders);
router.get('/track/:orderId', optionalProtect, trackOrder);

// Protected admin endpoints
router.get('/', protect, requirePermission('canManageOrders'), getAllOrders);
router.patch('/:orderId', protect, requirePermission('canManageOrders'), updateOrderStatus);

export default router;
