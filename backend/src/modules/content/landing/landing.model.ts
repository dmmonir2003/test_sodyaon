import { Schema, model, Document } from 'mongoose';

export interface ILandingPageDocument extends Document {
  pageKey: string;
  heroSection: {
    title: string;
    subtitle?: string;
    bannerUrl?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  banners: Array<{
    imageUrl: string;
    linkUrl?: string;
    title?: string;
  }>;
  promotedCategories: number[];
  featuresList: string[];
}

const LandingPageSchema = new Schema<ILandingPageDocument>(
  {
    pageKey: { type: String, required: true, unique: true, index: true, default: 'home' },
    heroSection: {
      title: { type: String, required: true },
      subtitle: { type: String },
      bannerUrl: { type: String },
      ctaText: { type: String },
      ctaLink: { type: String },
    },
    banners: [
      {
        imageUrl: { type: String, required: true },
        linkUrl: { type: String },
        title: { type: String },
      },
    ],
    promotedCategories: [{ type: Number }],
    featuresList: [{ type: String }],
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

export const LandingPage = model<ILandingPageDocument>('LandingPage', LandingPageSchema);
export default LandingPage;
