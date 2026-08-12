import { Schema, model, Document } from 'mongoose';

export interface IMarketingSettings {
  key: string;
  // Google
  gtmContainerId?: string;
  ga4MeasurementId?: string;
  // Meta
  metaPixelId?: string;
  metaAccessToken?: string;
  metaTestEventCode?: string;
  // TikTok
  tiktokPixelId?: string;
  tiktokAccessToken?: string;
  tiktokTestEventCode?: string;
}

export interface IMarketingSettingsDocument extends IMarketingSettings, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const MarketingSettingsSchema = new Schema<IMarketingSettingsDocument>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'marketing',
      index: true,
    },
    gtmContainerId: {
      type: String,
      default: '',
      trim: true,
    },
    ga4MeasurementId: {
      type: String,
      default: '',
      trim: true,
    },
    metaPixelId: {
      type: String,
      default: '',
      trim: true,
    },
    metaAccessToken: {
      type: String,
      default: '',
      trim: true,
    },
    metaTestEventCode: {
      type: String,
      default: '',
      trim: true,
    },
    tiktokPixelId: {
      type: String,
      default: '',
      trim: true,
    },
    tiktokAccessToken: {
      type: String,
      default: '',
      trim: true,
    },
    tiktokTestEventCode: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const MarketingSettings = model<IMarketingSettingsDocument>(
  'MarketingSettings',
  MarketingSettingsSchema
);
export default MarketingSettings;
