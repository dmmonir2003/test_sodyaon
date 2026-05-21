import { Request, Response, NextFunction } from 'express';
import { Category } from './category.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Get categories (supports hierarchical tree rendering and flat lists)
export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const { tree } = req.query;

  if (tree === 'true') {
    // Recursive populate: fetch root categories (parentId = null) and nested children
    const categories = await Category.find({ parentId: null })
      .sort('sortOrder')
      .populate({
        path: 'children',
        populate: { path: 'children' } // Nested secondary/tertiary levels
      });

    return res.status(200).json({
      success: true,
      results: categories.length,
      data: categories,
    });
  }

  // Standard flat representation
  const categories = await Category.find().sort('sortOrder').populate('parentId');
  
  res.status(200).json({
    success: true,
    results: categories.length,
    data: categories,
  });
});

// Get a category by its MongoDB ObjectId or Unique URL Slug
export const getCategoryByIdOrSlug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { idOrSlug } = req.params;

  const filter = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };
  const category = await Category.findOne(filter).populate('children parentId');

  if (!category) {
    return next(new ApiError(404, 'Category not found'));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// Admin: Create Category
export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.create(req.body);
  
  res.status(201).json({
    success: true,
    data: category,
  });
});

// Admin: Update Category
export const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new ApiError(404, 'Category not found to update'));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// Admin: Delete Category
export const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(404, 'Category not found to delete'));
  }

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});
