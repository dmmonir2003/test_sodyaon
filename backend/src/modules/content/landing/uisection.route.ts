import { Router } from 'express';
import {
  getAllUISections,
  getUISectionById,
  createUISection,
  updateUISection,
  deleteUISection,
} from './uisection.controller';
import { protect, requirePermission } from '../../../middleware/auth';

const router = Router();

// Public dynamic landing configurations access
router.get('/', getAllUISections);
router.get('/:id', getUISectionById);

// Admin dashboard styling & dynamic layout controls
router.use(protect);
router.post('/', requirePermission('canManageContent'), createUISection);
router.patch('/:id', requirePermission('canManageContent'), updateUISection);
router.delete('/:id', requirePermission('canManageContent'), deleteUISection);

export default router;
