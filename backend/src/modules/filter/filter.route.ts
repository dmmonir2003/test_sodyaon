import { Router } from 'express';
import {
  getCategoryFilters,
  getProductFilterValues,
  createFilterAttribute,
  createFilterOption,
  linkCategoryFilter,
  saveProductFilterValues,
} from './filter.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/category/:categoryId', getCategoryFilters);
router.get('/product/:productId', getProductFilterValues);

// Protected routes (admin/staff only)
router.use(protect);

router.post('/attributes', requirePermission('canManageContent'), createFilterAttribute);
router.post('/options', requirePermission('canManageContent'), createFilterOption);
router.post('/link', requirePermission('canManageContent'), linkCategoryFilter);
router.post('/product/:productId', requirePermission('canManageContent'), saveProductFilterValues);

export default router;
