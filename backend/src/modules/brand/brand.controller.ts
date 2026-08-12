import { Request, Response, NextFunction } from 'express';
import { Brand } from './brand.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Get all brands (supports filtering by isFeatured)
export const getAllBrands = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { isFeatured } = req.query;
  const filter: any = {};

  if (isFeatured !== undefined) {
    filter.isFeatured = isFeatured === 'true';
  }

  const brands = await Brand.find(filter).sort('nameEn');

  res.status(200).json({
    success: true,
    results: brands.length,
    data: brands,
  });
});

// Get brand by ID or Slug
export const getBrandById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  let brand;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    brand = await Brand.findById(id);
  } else {
    brand = await Brand.findOne({ slug: id.toLowerCase() });
  }

  if (!brand) {
    return next(new ApiError(404, 'Brand not found'));
  }

  res.status(200).json({
    success: true,
    data: brand,
  });
});

// Admin: Create brand
export const createBrand = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { nameEn, nameBn, slug, logoUrl, tagLabel, isFeatured } = req.body;

  const existingBrand = await Brand.findOne({ slug: slug.toLowerCase() });
  if (existingBrand) {
    return next(new ApiError(400, 'Brand slug already exists'));
  }

  const brand = await Brand.create({
    nameEn,
    nameBn,
    slug: slug.toLowerCase(),
    logoUrl,
    tagLabel,
    isFeatured: !!isFeatured,
  });

  res.status(201).json({
    success: true,
    data: brand,
  });
});

// Admin: Update brand
export const updateBrand = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(404, 'Brand not found to update'));
  }

  brand = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: brand,
  });
});

// Admin: Delete brand
export const deleteBrand = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(404, 'Brand not found to delete'));
  }

  res.status(200).json({
    success: true,
    message: 'Brand deleted successfully',
  });
});
