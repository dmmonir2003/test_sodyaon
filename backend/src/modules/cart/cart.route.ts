import { Router } from 'express';
import { getCart, updateCart } from './cart.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// Protect all cart endpoints
router.use(protect);

router.route('/:userId')
  .get(getCart)
  .post(updateCart);

export default router;
