import { Request, Response, NextFunction } from 'express';
import { Product } from './product.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Get products with filters, sorting, and pagination
export const getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId, ageRange, search, sort, limit = 20, page = 1 } = req.query;

  const queryObj: any = {};

  if (categoryId) {
    queryObj.categoryId = Number(categoryId);
  }

  if (ageRange) {
    queryObj.ageRange = ageRange;
  }

  if (search) {
    queryObj.$or = [
      { name: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search as string, 'i')] } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // Build sorting options
  let sortBy = '-createdAt';
  if (sort === 'price-asc') sortBy = 'price';
  else if (sort === 'price-desc') sortBy = '-price';
  else if (sort === 'rating') sortBy = '-rating';

  const skip = (Number(page) - 1) * Number(limit);

  const products = await Product.find(queryObj)
    .sort(sortBy)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(queryObj);

  res.status(200).json({
    success: true,
    results: products.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    data: products,
  });
});

// Get single product (supports both Mongo Object ID and custom numericId)
export const getProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let product;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(id);
  } else if (!isNaN(Number(id))) {
    product = await Product.findOne({ numericId: Number(id) });
  }

  if (!product) {
    return next(new ApiError(404, 'Product not found'));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// Admin: Create product
export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Find highest numericId to auto-increment if not provided
  if (!req.body.numericId) {
    const lastProduct = await Product.findOne().sort('-numericId');
    req.body.numericId = lastProduct ? lastProduct.numericId + 1 : 1000;
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// Admin: Update product
export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let product;
  const filter = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { numericId: Number(id) };

  product = await Product.findOneAndUpdate(filter, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ApiError(404, 'Product not found to update'));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// Admin: Delete product
export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const filter = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { numericId: Number(id) };

  const product = await Product.findOneAndDelete(filter);

  if (!product) {
    return next(new ApiError(404, 'Product not found to delete'));
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});
