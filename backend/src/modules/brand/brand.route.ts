import { Router } from 'express';
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from './brand.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllBrands);
router.get('/:id', getBrandById);

// Protected routes (admin/staff only)
router.use(protect);

router.post('/', requirePermission('canManageContent'), createBrand);
router.patch('/:id', requirePermission('canManageContent'), updateBrand);
router.delete('/:id', requirePermission('canManageContent'), deleteBrand);

export default router;
