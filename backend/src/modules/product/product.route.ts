import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (admin/staff only)
router.use(protect);

router.post('/', requirePermission('canManageContent'), createProduct);
router.patch('/:id', requirePermission('canManageContent'), updateProduct);
router.delete('/:id', requirePermission('canManageContent'), deleteProduct);

export default router;
