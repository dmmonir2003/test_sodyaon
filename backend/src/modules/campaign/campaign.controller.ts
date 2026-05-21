// [ignoring loop detection]
import { Request, Response, NextFunction } from 'express';
import { FlashSale, ComboOffer } from './campaign.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// =========================================================================
// FLASH SALES CONTROLLERS
// =========================================================================

// Get all active flash sales (public)
export const getActiveFlashSales = catchAsync(async (req: Request, res: Response) => {
  const now = new Date();
  const sales = await FlashSale.find({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now },
  }).populate('items.productId');

  res.status(200).json({
    success: true,
    results: sales.length,
    data: sales,
  });
});

// Admin: Get all flash sales (including drafts and expired)
export const getAllFlashSales = catchAsync(async (req: Request, res: Response) => {
  const sales = await FlashSale.find().sort('-startDate').populate('items.productId');
  
  res.status(200).json({
    success: true,
    results: sales.length,
    data: sales,
  });
});

// Admin: Create flash sale
export const createFlashSale = catchAsync(async (req: Request, res: Response) => {
  const sale = await FlashSale.create(req.body);
  
  res.status(201).json({
    success: true,
    data: sale,
  });
});

// Admin: Update flash sale
export const updateFlashSale = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const sale = await FlashSale.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!sale) {
    return next(new ApiError(404, 'Flash sale not found'));
  }

  res.status(200).json({
    success: true,
    data: sale,
  });
});

// Admin: Delete flash sale
export const deleteFlashSale = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const sale = await FlashSale.findByIdAndDelete(id);

  if (!sale) {
    return next(new ApiError(404, 'Flash sale not found to delete'));
  }

  res.status(200).json({
    success: true,
    message: 'Flash sale deleted successfully',
  });
});

// =========================================================================
// COMBO & BUNDLE CONTROLLERS
// =========================================================================

// Get active combo offers (public)
export const getActiveCombos = catchAsync(async (req: Request, res: Response) => {
  const now = new Date();
  const combos = await ComboOffer.find({
    isActive: true,
    $or: [
      { startDate: null, endDate: null },
      { startDate: { $lte: now }, endDate: { $gte: now } }
    ]
  }).populate('fixedItems.productId customPools.products');

  res.status(200).json({
    success: true,
    results: combos.length,
    data: combos,
  });
});

// Admin: Get all combo configurations
export const getAllCombos = catchAsync(async (req: Request, res: Response) => {
  const combos = await ComboOffer.find().populate('fixedItems.productId customPools.products');
  
  res.status(200).json({
    success: true,
    results: combos.length,
    data: combos,
  });
});

// Admin: Create combo offer
export const createComboOffer = catchAsync(async (req: Request, res: Response) => {
  const combo = await ComboOffer.create(req.body);
  
  res.status(201).json({
    success: true,
    data: combo,
  });
});

// Admin: Update combo offer
export const updateComboOffer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const combo = await ComboOffer.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!combo) {
    return next(new ApiError(404, 'Combo offer not found'));
  }

  res.status(200).json({
    success: true,
    data: combo,
  });
});

// Admin: Delete combo offer
export const deleteComboOffer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const combo = await ComboOffer.findByIdAndDelete(id);

  if (!combo) {
    return next(new ApiError(404, 'Combo offer not found to delete'));
  }

  res.status(200).json({
    success: true,
    message: 'Combo offer deleted successfully',
  });
});
