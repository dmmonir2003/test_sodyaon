import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Review } from './review.model';
import { Product } from '../product/product.model';
import { Order } from '../order/order.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Aggregation helper to update Product ratings and review counts
const updateProductRatingStats = async (productId: string) => {
  const stats = await Review.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId), status: 'approved' } },
    {
      $group: {
        _id: '$productId',
        ratingSum: { $sum: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    const avgRating = Number((stats[0].ratingSum / stats[0].reviewCount).toFixed(1));
    await Product.findByIdAndUpdate(productId, {
      avgRating,
      rating: avgRating, // backward compatibility
      reviews: stats[0].reviewCount, // backward compatibility
      reviewCount: stats[0].reviewCount,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      avgRating: 0,
      rating: 0,
      reviews: 0,
      reviewCount: 0,
    });
  }
};

// Public: Get all reviews for a specific product
export const getProductReviews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const reviews = await Review.find({ productId, status: 'approved' })
    .populate('userId', 'name email role')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await Review.countDocuments({ productId, status: 'approved' });

  res.status(200).json({
    success: true,
    results: reviews.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    data: reviews,
  });
});

// Protected: Write a customer review (automatically checks purchase status)
export const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productId, rating, body, images = [], orderItemId } = req.body;
  const userId = (req as any).user.id;

  if (!productId || !rating || !body) {
    return next(new ApiError(400, 'Product ID, rating, and body are required'));
  }

  // 1. Check if user has purchased this product previously
  const pastOrder = await Order.findOne({
    userId,
    'items.productId': productId,
  });

  if (!pastOrder) {
    return next(new ApiError(403, 'You must purchase this product before writing a review.'));
  }

  const isVerified = true;

  // 2. Create the review
  const review = await Review.create({
    productId,
    userId,
    rating: Number(rating),
    body,
    images,
    orderItemId,
    isVerified,
    status: 'approved', // Auto-approve in dev
  });

  // 3. Recalculate rating stats
  await updateProductRatingStats(productId);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// Protected: Check if user has purchased a product
export const checkProductPurchase = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const userId = (req as any).user.id;

  if (!productId) {
    return next(new ApiError(400, 'Product ID is required'));
  }

  const pastOrder = await Order.findOne({
    userId,
    'items.productId': productId,
  });

  res.status(200).json({
    success: true,
    purchased: !!pastOrder,
  });
});

// Protected: Upvote review as helpful
export const likeReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const review = await Review.findByIdAndUpdate(
    id,
    { $inc: { helpfulCount: 1 } },
    { new: true }
  );

  if (!review) {
    return next(new ApiError(404, 'Review not found'));
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// Admin: Moderate review status
export const updateReviewStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' | 'rejected'

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return next(new ApiError(400, 'Invalid status value'));
  }

  const review = await Review.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!review) {
    return next(new ApiError(404, 'Review not found'));
  }

  // Recalculate stats for the parent product
  await updateProductRatingStats(review.productId.toString());

  res.status(200).json({
    success: true,
    data: review,
  });
});
