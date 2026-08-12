import { Request, Response, NextFunction } from 'express';
import { ProductQA } from './qa.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Public: List visible Q&As for a product
export const getProductQA = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const list = await ProductQA.find({ productId, isVisible: true })
    .populate('userId', 'name')
    .populate('answeredBy', 'name role')
    .sort('-askedAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await ProductQA.countDocuments({ productId, isVisible: true });

  res.status(200).json({
    success: true,
    results: list.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    data: list,
  });
});

// Protected: Customer asks a question
export const askQuestion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productId, question } = req.body;
  const userId = (req as any).user.id;

  if (!productId || !question) {
    return next(new ApiError(400, 'Product ID and question text are required'));
  }

  const qa = await ProductQA.create({
    productId,
    userId,
    question,
    askedAt: new Date(),
    isVisible: true, // Visible immediately in dev
  });

  res.status(201).json({
    success: true,
    data: qa,
  });
});

// Protected (Staff/Admin): Answer a question
export const answerQuestion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { answer } = req.body;
  const staffId = (req as any).user.id;

  if (!answer) {
    return next(new ApiError(400, 'Answer text is required'));
  }

  const qa = await ProductQA.findByIdAndUpdate(
    id,
    {
      answer,
      answeredBy: staffId,
      answeredAt: new Date(),
    },
    { new: true, runValidators: true }
  );

  if (!qa) {
    return next(new ApiError(404, 'Q&A thread not found'));
  }

  res.status(200).json({
    success: true,
    data: qa,
  });
});

// Protected: Upvote question helpful count
export const likeQA = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const qa = await ProductQA.findByIdAndUpdate(
    id,
    { $inc: { helpfulCount: 1 } },
    { new: true }
  );

  if (!qa) {
    return next(new ApiError(404, 'Q&A thread not found'));
  }

  res.status(200).json({
    success: true,
    data: qa,
  });
});
