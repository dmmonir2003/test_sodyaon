import { Router } from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getRecentlyViewed,
  recordRecentlyViewed,
} from './userActivity.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// All routes require user authentication
router.use(protect);

router.get('/wishlist', getWishlist);
router.post('/wishlist', addToWishlist);
router.delete('/wishlist/:id', removeFromWishlist);

router.get('/browsing-history', getRecentlyViewed);
router.post('/browsing-history', recordRecentlyViewed);

export default router;
