import { Router } from 'express';
import { getFinanceLedger, updateFinanceLedger } from './finance.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// Protect all finance reporting endpoints
router.use(protect);

router.route('/')
  .get(requirePermission('canViewFinances'), getFinanceLedger)
  .patch(requirePermission('canEditFinances'), updateFinanceLedger)
  .put(requirePermission('canEditFinances'), updateFinanceLedger); // support PUT/PATCH both for flexibility

export default router;
