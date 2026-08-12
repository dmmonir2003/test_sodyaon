import { Router } from 'express';
import {
  getProductReviews,
  createReview,
  likeReview,
  updateReviewStatus,
  checkProductPurchase,
} from './review.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/product/:productId', getProductReviews);

// Protected routes (Customer only / all authenticated)
router.use(protect);

router.get('/check-purchase/:productId', checkProductPurchase);
router.post('/', createReview);
router.post('/:id/helpful', likeReview);

// Moderation (Admin/Staff only)
router.patch('/:id/status', requirePermission('canManageContent'), updateReviewStatus);

export default router;
