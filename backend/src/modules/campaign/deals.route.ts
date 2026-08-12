import { Router } from 'express';
import {
  getLiveDeals,
  getSpecialCollections,
  getCollectionProducts,
  createFlashDeal,
  createSpecialCollection,
  addProductToCollection,
} from './deals.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/flash-deals', getLiveDeals);
router.get('/collections', getSpecialCollections);
router.get('/collections/:collectionId/products', getCollectionProducts);

// Protected routes (admin/staff only)
router.use(protect);

router.post('/flash-deals', requirePermission('canManageContent'), createFlashDeal);
router.post('/collections', requirePermission('canManageContent'), createSpecialCollection);
router.post('/collections/link', requirePermission('canManageContent'), addProductToCollection);

export default router;
