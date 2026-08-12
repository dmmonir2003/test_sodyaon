import { Request, Response, NextFunction } from 'express';
import MenuItem from './menu.model';
import { catchAsync } from '../../utils/catchAsync';
import { ApiError } from '../../utils/ApiError';

// Get active menu items sorted
export const getMenuItems = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const menus = await MenuItem.find({ isActive: true }).sort('sortOrder');
  res.status(200).json({
    success: true,
    count: menus.length,
    data: menus,
  });
});

// Create menu item (Admin)
export const createMenuItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const menuItem = await MenuItem.create(req.body);
  res.status(201).json({
    success: true,
    data: menuItem,
  });
});

// Update menu item (Admin)
export const updateMenuItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!menuItem) {
    return next(new ApiError(404, 'Menu item not found'));
  }

  res.status(200).json({
    success: true,
    data: menuItem,
  });
});

// Delete menu item (Admin)
export const deleteMenuItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

  if (!menuItem) {
    return next(new ApiError(404, 'Menu item not found'));
  }

  res.status(200).json({
    success: true,
    message: 'Menu item deleted successfully',
  });
});
