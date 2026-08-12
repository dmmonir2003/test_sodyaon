import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSpecialOffers,
  parseGoogleSheetRow,
} from './product.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/deals/special-offers', getSpecialOffers);
router.get('/:id', getProductById);

// Protected routes (admin/staff only)
router.use(protect);

router.post('/', requirePermission('canManageContent'), createProduct);
router.post('/sheets/parse', requirePermission('canManageContent'), parseGoogleSheetRow);
router.patch('/:id', requirePermission('canManageContent'), updateProduct);
router.delete('/:id', requirePermission('canManageContent'), deleteProduct);

export default router;
