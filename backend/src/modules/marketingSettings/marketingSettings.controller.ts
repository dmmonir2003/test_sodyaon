import { Request, Response, NextFunction } from 'express';
import { MarketingSettings } from './marketingSettings.model';
import { catchAsync } from '../../utils/catchAsync';
import { ApiError } from '../../utils/ApiError';

// Helper to get or initialize marketing settings document
const getOrInitSettings = async () => {
  let settings = await MarketingSettings.findOne({ key: 'marketing' });
  if (!settings) {
    settings = await MarketingSettings.create({
      key: 'marketing',
      gtmContainerId: '',
      ga4MeasurementId: '',
      metaPixelId: '',
      metaAccessToken: '',
      metaTestEventCode: '',
      tiktokPixelId: '',
      tiktokAccessToken: '',
      tiktokTestEventCode: '',
    });
  }
  return settings;
};

// GET Public Settings (No Auth required, hides secrets)
export const getPublicSettings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const settings = await getOrInitSettings();
  
  res.status(200).json({
    success: true,
    data: {
      gtmContainerId: settings.gtmContainerId || '',
      ga4MeasurementId: settings.ga4MeasurementId || '',
      metaPixelId: settings.metaPixelId || '',
      tiktokPixelId: settings.tiktokPixelId || '',
    },
  });
});

// GET Private Settings (Admin/Digital Marketer only)
export const getPrivateSettings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const settings = await getOrInitSettings();
  
  res.status(200).json({
    success: true,
    data: settings,
  });
});

// PUT Update Settings (Admin/Digital Marketer only)
export const updateSettings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {
    gtmContainerId,
    ga4MeasurementId,
    metaPixelId,
    metaAccessToken,
    metaTestEventCode,
    tiktokPixelId,
    tiktokAccessToken,
    tiktokTestEventCode,
  } = req.body;

  const settings = await MarketingSettings.findOneAndUpdate(
    { key: 'marketing' },
    {
      gtmContainerId,
      ga4MeasurementId,
      metaPixelId,
      metaAccessToken,
      metaTestEventCode,
      tiktokPixelId,
      tiktokAccessToken,
      tiktokTestEventCode,
    },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Marketing settings updated successfully',
    data: settings,
  });
});
