import { Router } from 'express';
import {
  getAllBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from './blog.controller';
import { protect, requirePermission } from '../../../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:idOrSlug', getBlogByIdOrSlug);

// Protected CMS Admin routes
router.use(protect);

router.post('/', requirePermission('canManageContent'), createBlog);
router.patch('/:id', requirePermission('canManageContent'), updateBlog);
router.delete('/:id', requirePermission('canManageContent'), deleteBlog);

export default router;
