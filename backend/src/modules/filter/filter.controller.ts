import { Request, Response, NextFunction } from 'express';
import { FilterAttribute, FilterOption, CategoryFilter, ProductFilterValue } from './filter.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Public: Get filters applicable to a specific category
export const getCategoryFilters = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params;

  // 1. Find category specific linkages
  const linkages = await CategoryFilter.find({ categoryId }).sort('sortOrder');
  const attributeIds = linkages.map(l => l.attributeId);

  // 2. Fetch attributes (and combine with universal ones)
  const attributes = await FilterAttribute.find({
    $or: [
      { _id: { $in: attributeIds } },
      { isUniversal: true }
    ]
  }).sort('sortOrder');

  // 3. For each attribute, fetch available options
  const filterSpecs = [];
  for (const attr of attributes) {
    const options = await FilterOption.find({ attributeId: attr._id }).sort('sortOrder');
    filterSpecs.push({
      attribute: attr,
      options
    });
  }

  res.status(200).json({
    success: true,
    data: filterSpecs,
  });
});

// Public: Get filter values assigned to a product
export const getProductFilterValues = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  const values = await ProductFilterValue.find({ productId })
    .populate('attributeId')
    .populate('optionId');

  res.status(200).json({
    success: true,
    data: values,
  });
});

// Admin: Create filter attribute
export const createFilterAttribute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const attribute = await FilterAttribute.create(req.body);
  res.status(201).json({ success: true, data: attribute });
});

// Admin: Create filter option
export const createFilterOption = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const option = await FilterOption.create(req.body);
  res.status(201).json({ success: true, data: option });
});

// Admin: Link attribute to a category
export const linkCategoryFilter = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId, attributeId, inheritToChildren, isRequired, sortOrder } = req.body;
  
  const linkage = await CategoryFilter.findOneAndUpdate(
    { categoryId, attributeId },
    { inheritToChildren, isRequired, sortOrder },
    { new: true, upsert: true }
  );

  res.status(200).json({ success: true, data: linkage });
});

// Admin: Bulk save filter values for a product
export const saveProductFilterValues = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const { filters } = req.body; // Expects array of { attributeId, optionId, customValue }

  if (!Array.isArray(filters)) {
    return next(new ApiError(400, 'Filters array is required'));
  }

  // Clear existing values
  await ProductFilterValue.deleteMany({ productId });

  const valuesToInsert = filters.map(f => ({
    productId,
    attributeId: f.attributeId,
    optionId: f.optionId,
    customValue: f.customValue,
  }));

  const insertedValues = await ProductFilterValue.insertMany(valuesToInsert);

  res.status(200).json({
    success: true,
    data: insertedValues,
  });
});
