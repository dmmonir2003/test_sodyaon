import { Router } from 'express';
import { getUserProfile, updateUserProfile } from './user.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// All user profile endpoints require authentication
router.use(protect);

router.route('/:userId')
  .get(getUserProfile)
  .patch(updateUserProfile);

export default router;
