import { Router } from 'express';
import * as controller from './marketingSettings.controller';
import { protect, restrictTo } from '../../middleware/auth';

const router = Router();

// Public: Get public tracking IDs for script tag injection in frontend
router.get('/public', controller.getPublicSettings);

// Protected: Only SUPER_ADMIN and DIGITAL_MARKETER can manage private tokens/credentials
router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'DIGITAL_MARKETER'));

router.get('/private', controller.getPrivateSettings);
router.put('/', controller.updateSettings);

export default router;
