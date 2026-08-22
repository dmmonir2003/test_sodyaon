import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Banner from './banner.model';
import { ApiError } from '../../utils/ApiError';

const DEFAULT_BANNERS = [
  {
    type: 'promo',
    title: '৳৬,০০০',
    badge: '৳৬,০০০',
    badgeLabel: 'ছাড়!',
    subtitle: 'ঈদের কেনাকাটায় দারুণ সারপ্রাইজ',
    buttonText: 'অফার দেখুন',
    link: '/shop',
    bgGradient: 'from-orange-50 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/20',
    blobColor: 'bg-orange-200 dark:bg-orange-800/50',
    promoImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    sortOrder: 1,
    isActive: true,
  },
  {
    type: 'image',
    title: '',
    link: '/shop/new-arrivals',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
    sortOrder: 2,
    isActive: true,
  },
  {
    type: 'promo',
    title: 'ফ্রি',
    badge: 'ফ্রি',
    badgeLabel: 'ডেলিভারি!',
    subtitle: '২০০০ টাকার বেশি অর্ডারে সারা দেশে ফ্রি ডেলিভারি',
    buttonText: 'এখনই কিনুন',
    link: '/shop',
    bgGradient: 'from-emerald-50 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/20',
    blobColor: 'bg-emerald-200 dark:bg-emerald-800/50',
    promoImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
    sortOrder: 3,
    isActive: true,
  },
];

export const getPublicBanners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({
        success: true,
        count: DEFAULT_BANNERS.length,
        data: DEFAULT_BANNERS,
      });
      return;
    }

    let banners = await Banner.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    
    // Auto-seed defaults if database has no banners yet
    if (!banners || banners.length === 0) {
      await Banner.insertMany(DEFAULT_BANNERS);
      banners = await Banner.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: DEFAULT_BANNERS.length,
      data: DEFAULT_BANNERS,
    });
  }
};

export const getAdminBanners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({
        success: true,
        count: DEFAULT_BANNERS.length,
        data: DEFAULT_BANNERS,
      });
      return;
    }

    let banners = await Banner.find().sort({ sortOrder: 1, createdAt: -1 });

    if (!banners || banners.length === 0) {
      await Banner.insertMany(DEFAULT_BANNERS);
      banners = await Banner.find().sort({ sortOrder: 1, createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: DEFAULT_BANNERS.length,
      data: DEFAULT_BANNERS,
    });
  }
};

export const createBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Hero banner created successfully',
      data: banner,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!banner) {
      return next(new ApiError(404, 'Banner not found'));
    }
    res.status(200).json({
      success: true,
      message: 'Hero banner updated successfully',
      data: banner,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return next(new ApiError(404, 'Banner not found'));
    }
    res.status(200).json({
      success: true,
      message: 'Hero banner deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
