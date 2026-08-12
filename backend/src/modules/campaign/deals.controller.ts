import { Request, Response, NextFunction } from 'express';
import { FlashDeal, SpecialCollection, CollectionItem } from './deals.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Public: Get currently live flash deals
export const getLiveDeals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  
  const deals = await FlashDeal.find({
    isLive: true,
    startsAt: { $lte: now },
    endsAt: { $gte: now },
  })
  .populate('productId')
  .sort('-savePercent');

  res.status(200).json({
    success: true,
    results: deals.length,
    data: deals,
  });
});

// Public: Get all active special banner campaigns
export const getSpecialCollections = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();

  const collections = await SpecialCollection.find({
    isActive: true,
    startsAt: { $lte: now },
    endsAt: { $gte: now },
  }).sort('createdAt');

  res.status(200).json({
    success: true,
    data: collections,
  });
});

// Public: Get products inside a special collection
export const getCollectionProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { collectionId } = req.params;

  const items = await CollectionItem.find({ collectionId })
    .populate('productId')
    .sort('sortOrder');

  res.status(200).json({
    success: true,
    results: items.length,
    data: items,
  });
});

// Admin: Create Flash Deal
export const createFlashDeal = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deal = await FlashDeal.create(req.body);
  res.status(201).json({ success: true, data: deal });
});

// Admin: Create Special Collection
export const createSpecialCollection = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const collection = await SpecialCollection.create(req.body);
  res.status(201).json({ success: true, data: collection });
});

// Admin: Link Product to Special Collection
export const addProductToCollection = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { collectionId, productId, sortOrder } = req.body;

  const item = await CollectionItem.findOneAndUpdate(
    { collectionId, productId },
    { sortOrder },
    { new: true, upsert: true }
  );

  res.status(200).json({ success: true, data: item });
});
