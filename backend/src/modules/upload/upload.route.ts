import { Router } from 'express';
import { uploadMiddleware, uploadMedia } from './upload.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// Only authenticated sessions can perform media uploads
router.post('/media', protect, uploadMiddleware.single('file'), uploadMedia);

export default router;
