import { Request, Response, NextFunction } from 'express';
import { DealCampaign } from './deals.model';
import { ApiError } from '../../../utils/ApiError';
import { catchAsync } from '../../../utils/catchAsync';

// Get all active deal campaigns
export const getActiveCampaigns = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const currentDate = new Date();
  const campaigns = await DealCampaign.find({
    isActive: true,
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
  });

  res.status(200).json({
    success: true,
    results: campaigns.length,
    data: campaigns,
  });
});

// Admin/Marketing: Create new campaign
export const createCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const campaign = await DealCampaign.create(req.body);

  res.status(201).json({
    success: true,
    data: campaign,
  });
});

// Admin/Marketing: Update campaign
export const updateCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const campaign = await DealCampaign.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!campaign) {
    return next(new ApiError(404, 'Deal campaign not found'));
  }

  res.status(200).json({
    success: true,
    data: campaign,
  });
});

// Admin/Marketing: Delete campaign
export const deleteCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const campaign = await DealCampaign.findByIdAndDelete(id);

  if (!campaign) {
    return next(new ApiError(404, 'Deal campaign not found'));
  }

  res.status(200).json({
    success: true,
    message: 'Campaign deleted successfully',
  });
});
