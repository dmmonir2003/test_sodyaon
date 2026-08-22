import { Router } from 'express';
import {
  getPublicBanners,
  getAdminBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from './banner.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public route for homepage slider
router.get('/', getPublicBanners);

// Protected routes for Admin CMS
router.get('/admin', protect, requirePermission('canManageContent'), getAdminBanners);
router.post('/', protect, requirePermission('canManageContent'), createBanner);
router.patch('/:id', protect, requirePermission('canManageContent'), updateBanner);
router.delete('/:id', protect, requirePermission('canManageContent'), deleteBanner);

export default router;
