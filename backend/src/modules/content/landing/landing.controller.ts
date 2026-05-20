import { Request, Response, NextFunction } from 'express';
import { LandingPage } from './landing.model';
import { catchAsync } from '../../../utils/catchAsync';

// Fallback default landing configuration
const DEFAULT_LANDING_CONTENT = {
  pageKey: 'home',
  heroSection: {
    title: 'Sodayon - Online Baby & Toy Shop',
    subtitle: 'High quality toys and baby care items with expert recommendations',
    bannerUrl: 'bg-indigo-600',
    ctaText: 'Shop Toys',
    ctaLink: '/shop/categories/all-toys',
  },
  banners: [
    { imageUrl: 'bg-rose-100', title: 'Flash Deals Banner', linkUrl: '/deals' },
    { imageUrl: 'bg-emerald-100', title: 'New Arrival Toys', linkUrl: '/shop/categories/building-sets' },
  ],
  promotedCategories: [5, 6, 7, 10, 12],
  featuresList: ['Free shipping over 2000 BDT', 'Verified Non-Toxic Materials', 'Expert Educational Reviews'],
};

// Retrieve landing details
export const getLandingContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let content = await LandingPage.findOne({ pageKey: 'home' });

  if (!content) {
    // Return mock fallback to verify UI without seeding
    return res.status(200).json({
      success: true,
      data: DEFAULT_LANDING_CONTENT,
    });
  }

  res.status(200).json({
    success: true,
    data: content,
  });
});

// Update landing details
export const updateLandingContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const content = await LandingPage.findOneAndUpdate(
    { pageKey: 'home' },
    req.body,
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: content,
  });
});
