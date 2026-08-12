import { Router } from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getTeamMembers,
  provisionTeamMember,
  deleteTeamMember,
} from './user.controller';
import { protect, requirePermission } from '../../middleware/auth';

const router = Router();

// All user endpoints require authentication
router.use(protect);

// Team management routes - Requires explicit 'canManageTeam' permission
router.route('/team')
  .get(requirePermission('canManageTeam'), getTeamMembers)
  .post(requirePermission('canManageTeam'), provisionTeamMember);

router.route('/team/:userId')
  .delete(requirePermission('canManageTeam'), deleteTeamMember);

router.route('/:userId')
  .get(getUserProfile)
  .patch(updateUserProfile);

export default router;
