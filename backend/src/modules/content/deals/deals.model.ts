import { Schema, model, Document } from 'mongoose';

export interface IDealCampaignDocument extends Document {
  title: string;
  description?: string;
  bannerUrl: string;
  discountPercentage: number;
  productIds: number[]; // Refers to Product's numericId
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const DealCampaignSchema = new Schema<IDealCampaignDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    bannerUrl: { type: String, required: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    productIds: [{ type: Number }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
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

export const DealCampaign = model<IDealCampaignDocument>('DealCampaign', DealCampaignSchema);
export default DealCampaign;
