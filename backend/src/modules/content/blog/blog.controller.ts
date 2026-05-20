import { Request, Response, NextFunction } from 'express';
import { BlogPost } from './blog.model';
import { ApiError } from '../../../utils/ApiError';
import { catchAsync } from '../../../utils/catchAsync';

// Get list of blogs (with tags filter)
export const getAllBlogs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { tag, limit = 10, page = 1 } = req.query;
  const filter: any = {};

  if (tag) {
    filter.tags = tag;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const blogs = await BlogPost.find(filter).sort('-createdAt').skip(skip).limit(Number(limit));
  const total = await BlogPost.countDocuments(filter);

  res.status(200).json({
    success: true,
    results: blogs.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    data: blogs,
  });
});

// Get blog by ID or Slug
export const getBlogByIdOrSlug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { idOrSlug } = req.params;

  let blog;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await BlogPost.findById(idOrSlug);
  } else {
    blog = await BlogPost.findOne({ slug: idOrSlug });
  }

  if (!blog) {
    return next(new ApiError(404, 'Blog post not found'));
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// Admin: Create blog post
export const createBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  // Generate slug if not provided
  if (!req.body.slug && title) {
    req.body.slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  const blog = await BlogPost.create(req.body);

  res.status(201).json({
    success: true,
    data: blog,
  });
});

// Admin: Update blog post
export const updateBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const blog = await BlogPost.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    return next(new ApiError(404, 'Blog post not found'));
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// Admin: Delete blog post
export const deleteBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const blog = await BlogPost.findByIdAndDelete(id);

  if (!blog) {
    return next(new ApiError(404, 'Blog post not found'));
  }

  res.status(200).json({
    success: true,
    message: 'Blog post deleted successfully',
  });
});
