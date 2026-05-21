// [ignoring loop detection]
import { Router } from 'express';
import {
  getActiveFlashSales,
  getAllFlashSales,
  createFlashSale,
  updateFlashSale,
  deleteFlashSale,
  getActiveCombos,
  getAllCombos,
  createComboOffer,
  updateComboOffer,
  deleteComboOffer,
} from './campaign.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// =========================================================================
// PUBLIC CAMPAIGN ACCESSIBILITY
// =========================================================================
router.get('/flash-sales/active', getActiveFlashSales);
router.get('/combos/active', getActiveCombos);

// =========================================================================
// ADMIN CAMPAIGN CONFIGURATION
// =========================================================================
router.use(protect);

router.get('/flash-sales', requirePermission('canManageContent'), getAllFlashSales);
router.post('/flash-sales', requirePermission('canManageContent'), createFlashSale);
router.patch('/flash-sales/:id', requirePermission('canManageContent'), updateFlashSale);
router.delete('/flash-sales/:id', requirePermission('canManageContent'), deleteFlashSale);

router.get('/combos', requirePermission('canManageContent'), getAllCombos);
router.post('/combos', requirePermission('canManageContent'), createComboOffer);
router.patch('/combos/:id', requirePermission('canManageContent'), updateComboOffer);
router.delete('/combos/:id', requirePermission('canManageContent'), deleteComboOffer);

export default router;
