import { Request, Response, NextFunction } from 'express';
import { UISection } from './uisection.model';
import { ApiError } from '../../../utils/ApiError';
import { catchAsync } from '../../../utils/catchAsync';

// Get all dynamic page UI Sections (defaults to visible sections only)
export const getAllUISections = catchAsync(async (req: Request, res: Response) => {
  const queryObj: any = { isVisible: true };

  // Allow admin dashboard to pull invisible/inactive draft components for configuration
  if (req.query.includeDrafts === 'true') {
    delete queryObj.isVisible;
  }

  const sections = await UISection.find(queryObj).sort('sortOrder');

  res.status(200).json({
    success: true,
    results: sections.length,
    data: sections,
  });
});

// Get a single UI layout block configuration
export const getUISectionById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const section = await UISection.findById(id);

  if (!section) {
    return next(new ApiError(404, 'UI Section layout block not found'));
  }

  res.status(200).json({
    success: true,
    data: section,
  });
});

// Admin: Create dynamic UI Section block
export const createUISection = catchAsync(async (req: Request, res: Response) => {
  const section = await UISection.create(req.body);

  res.status(201).json({
    success: true,
    data: section,
  });
});

// Admin: Update dynamic UI Section layout/banners/theme parameters
export const updateUISection = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const section = await UISection.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!section) {
    return next(new ApiError(404, 'UI Section not found to update'));
  }

  res.status(200).json({
    success: true,
    data: section,
  });
});

// Admin: Delete dynamic UI Section block
export const deleteUISection = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const section = await UISection.findByIdAndDelete(id);

  if (!section) {
    return next(new ApiError(404, 'UI Section not found to delete'));
  }

  res.status(200).json({
    success: true,
    message: 'UI Section deleted successfully',
  });
});
