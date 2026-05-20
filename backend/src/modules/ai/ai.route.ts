import { Router } from 'express';
import {
  getGiftSuggestions,
  askParentingAssistant,
  compareProducts,
} from './ai.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// Public helper routes
router.post('/gift-finder', getGiftSuggestions);
router.post('/compare', compareProducts);

// Protected Parenting assistant (requires authorization as verified by next middleware)
router.post('/parenting-assistant', protect, askParentingAssistant);

export default router;
