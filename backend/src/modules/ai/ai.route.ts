import { Router } from 'express';
import {
  getGiftSuggestions,
  askParentingAssistant,
  compareProducts,
  getAiSessions,
} from './ai.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// Public helper routes
router.post('/gift-finder', getGiftSuggestions);
router.post('/compare', compareProducts);

// Protected routes
router.post('/parenting-assistant', protect, askParentingAssistant);
router.get('/sessions', protect, getAiSessions);

export default router;
