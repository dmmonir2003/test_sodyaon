import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cloudinary from '../../config/cloudinary';
import { ApiError } from '../../utils/ApiError';

// Ensure uploads folder exists for local storage fallback
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Local storage configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter (allow images and videos)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif|mp4|mpeg|avi/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only images and videos are supported') as any, false);
  }
};

// Initialize multer
export const uploadMiddleware = multer({
  storage: diskStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

// Upload controller endpoint
export const uploadMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.file) {
    return next(new ApiError(400, 'Please select a file to upload'));
  }

  const hasCloudinary =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'mock-cloud-name';

  if (hasCloudinary) {
    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
        folder: 'sodayon',
      });

      // Remove local temp file
      fs.unlinkSync(req.file.path);

      res.status(200).json({
        success: true,
        url: result.secure_url,
      });
      return;
    } catch (err: any) {
      console.error('[Cloudinary Upload Error]', err.message);
      // Fallback to local storage if Cloudinary fails
    }
  }

  // Fallback / Default: Local server storage
  const port = process.env.PORT || 5000;
  const relativePath = `/uploads/${req.file.filename}`;
  const fileUrl = `${req.protocol}://${req.hostname === 'localhost' ? `localhost:${port}` : req.hostname}${relativePath}`;

  res.status(200).json({
    success: true,
    url: fileUrl,
  });
};
