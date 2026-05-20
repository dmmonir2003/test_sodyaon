import { Router } from 'express';
import {
  getActiveCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from './deals.controller';
import { protect, restrictTo } from '../../../middleware/auth';

const router = Router();

// Public routes
router.get('/active', getActiveCampaigns);

// Protected marketer/admin routes
router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'DIGITAL_MARKETER'));

router.post('/', createCampaign);
router.patch('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

export default router;
