import { Request, Response, NextFunction } from 'express';
import { Cart } from './cart.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Get user saved cart
export const getCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const reqUser = (req as any).user;

  // Security check: Only owner or admin can retrieve
  if (reqUser.role === 'CUSTOMER' && reqUser.id !== userId) {
    return next(new ApiError(403, 'Forbidden: You cannot retrieve another user\'s cart'));
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  // Return the items array directly to match frontend RTK expectation
  res.status(200).json(cart.items);
});

// Update user saved cart (overwrite items)
export const updateCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const reqUser = (req as any).user;
  const items = req.body; // Expects CartItem[]

  if (!Array.isArray(items)) {
    return next(new ApiError(400, 'Invalid payload: Body must be an array of CartItems'));
  }

  if (reqUser.role === 'CUSTOMER' && reqUser.id !== userId) {
    return next(new ApiError(403, 'Forbidden: You cannot update another user\'s cart'));
  }

  let cart = await Cart.findOneAndUpdate(
    { userId },
    { items },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json(cart.items);
});
