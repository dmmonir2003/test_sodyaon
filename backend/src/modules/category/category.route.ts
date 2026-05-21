import { Router } from 'express';
import {
  getAllCategories,
  getCategoryByIdOrSlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from './category.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllCategories);
router.get('/:idOrSlug', getCategoryByIdOrSlug);

// Dashboard management routes
router.use(protect);
router.post('/', requirePermission('canManageContent'), createCategory);
router.patch('/:id', requirePermission('canManageContent'), updateCategory);
router.delete('/:id', requirePermission('canManageContent'), deleteCategory);

export default router;
