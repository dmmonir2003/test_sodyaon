import { Router } from 'express';
import { getLandingContent, updateLandingContent } from './landing.controller';
import { protect, requirePermission } from '../../../middleware/auth';

const router = Router();

router.get('/', getLandingContent);
router.put('/', protect, requirePermission('canManageContent'), updateLandingContent);

export default router;
