import { Request, Response, NextFunction } from 'express';
import { Wishlist, RecentlyViewed } from './userActivity.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Get current user's wishlist
export const getWishlist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;

  const list = await Wishlist.find({ userId })
    .populate('productId')
    .sort('-addedAt');

  res.status(200).json({
    success: true,
    results: list.length,
    data: list,
  });
});

// Add a product to wishlist
export const addToWishlist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;
  const { productId, variantId } = req.body;

  if (!productId) {
    return next(new ApiError(400, 'Product ID is required'));
  }

  // Use upsert to avoid double adding
  const item = await Wishlist.findOneAndUpdate(
    { userId, productId, ...(variantId && { variantId }) },
    { addedAt: new Date() },
    { new: true, upsert: true }
  );

  res.status(200).json({
    success: true,
    data: item,
  });
});

// Remove a product from wishlist
export const removeFromWishlist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;
  const { id } = req.params; // Wishlist document ID

  const item = await Wishlist.findOneAndDelete({ _id: id, userId });

  if (!item) {
    return next(new ApiError(404, 'Wishlist item not found'));
  }

  res.status(200).json({
    success: true,
    message: 'Product removed from wishlist',
  });
});

// Get current user's recently viewed products
export const getRecentlyViewed = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;

  const list = await RecentlyViewed.find({ userId })
    .populate('productId')
    .sort('-viewedAt')
    .limit(10); // Return last 10 viewed items

  res.status(200).json({
    success: true,
    results: list.length,
    data: list,
  });
});

// Record a product view in browse history (typically triggered upon viewing details page)
export const recordRecentlyViewed = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;
  const { productId } = req.body;

  if (!productId) {
    return next(new ApiError(400, 'Product ID is required'));
  }

  // Update viewedAt if exists, otherwise create
  const item = await RecentlyViewed.findOneAndUpdate(
    { userId, productId },
    { viewedAt: new Date() },
    { new: true, upsert: true }
  );

  res.status(200).json({
    success: true,
    data: item,
  });
});
