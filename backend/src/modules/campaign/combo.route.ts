import { Router } from 'express';
import {
  getActiveComboTemplates,
  validateCombo,
  createComboOrder,
  createComboTemplate,
} from './combo.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/templates', getActiveComboTemplates);
router.post('/validate', validateCombo);

// Protected routes (Customer checkout logging)
router.post('/orders', protect, createComboOrder);

// Admin templates creation
router.post('/templates', protect, requirePermission('canManageContent'), createComboTemplate);

export default router;
