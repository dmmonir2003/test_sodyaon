import { Request, Response, NextFunction } from 'express';
import { Coupon } from './coupon.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Public: Validate a coupon code during checkout
export const validateCouponCode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { code, subtotal } = req.body;

  if (!code) {
    return next(new ApiError(400, 'Coupon code is required'));
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

  if (!coupon) {
    return next(new ApiError(404, 'Invalid or inactive coupon code'));
  }

  // Check expiration
  if (new Date() > coupon.expiresAt) {
    return next(new ApiError(400, 'This coupon has expired'));
  }

  // Check usage limit
  if (coupon.usedCount >= coupon.usageLimit) {
    return next(new ApiError(400, 'This coupon usage limit has been reached'));
  }

  // Check minimum order value
  if (subtotal && subtotal < coupon.minOrderValue) {
    return next(new ApiError(400, `Minimum purchase of ${coupon.minOrderValue} BDT is required to apply this coupon`));
  }

  // Calculate discount amount
  let discountAmount = 0;
  if (coupon.discountType === 'PERCENTAGE') {
    discountAmount = (subtotal * coupon.discountValue) / 100;
  } else {
    discountAmount = coupon.discountValue;
  }

  res.status(200).json({
    success: true,
    data: {
      couponId: coupon._id,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: Math.round(discountAmount),
    },
  });
});

// Admin: Create Coupon
export const createCoupon = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { code, discountType, discountValue, minOrderValue, expiresAt, usageLimit } = req.body;

  const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (existingCoupon) {
    return next(new ApiError(400, 'Coupon with this code already exists'));
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    discountType,
    discountValue,
    minOrderValue,
    expiresAt: new Date(expiresAt),
    usageLimit,
  });

  res.status(201).json({
    success: true,
    data: coupon,
  });
});

// Admin: Get All Coupons
export const getAllCoupons = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const coupons = await Coupon.find().sort('-createdAt');
  res.status(200).json({
    success: true,
    data: coupons,
  });
});

// Admin: Delete Coupon
export const deleteCoupon = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) {
    return next(new ApiError(404, 'Coupon not found'));
  }

  res.status(200).json({
    success: true,
    message: 'Coupon deleted successfully',
  });
});
