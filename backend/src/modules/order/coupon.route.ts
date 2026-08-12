import { Router } from 'express';
import {
  validateCouponCode,
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} from './coupon.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public/Customer routes
router.use(protect);
router.post('/validate', validateCouponCode);

// Admin/Staff routes
router.post('/', requirePermission('canManageContent'), createCoupon);
router.get('/', requirePermission('canManageContent'), getAllCoupons);
router.delete('/:id', requirePermission('canManageContent'), deleteCoupon);

export default router;
