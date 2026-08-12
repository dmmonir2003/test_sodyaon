import { Router } from 'express';
import {
  getProductQA,
  askQuestion,
  answerQuestion,
  likeQA,
} from './qa.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/product/:productId', getProductQA);

// Protected routes (Customers and Staff)
router.use(protect);

router.post('/', askQuestion);
router.post('/:id/helpful', likeQA);

// Moderation/Staff replies
router.post('/:id/answer', requirePermission('canManageContent'), answerQuestion);

export default router;
