import { Schema, model, Document } from 'mongoose';

export interface IBanner {
  type: 'promo' | 'image';
  badge?: string;
  badgeLabel?: string;
  subtitle?: string;
  buttonText?: string;
  link: string;
  imageUrl?: string;
  promoImage?: string;
  bgGradient?: string;
  blobColor?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface IBannerDocument extends IBanner, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBannerDocument>(
  {
    type: {
      type: String,
      enum: ['promo', 'image'],
      default: 'promo',
      required: true,
    },
    badge: { type: String, trim: true },
    badgeLabel: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    buttonText: { type: String, trim: true },
    link: { type: String, required: true, default: '/shop' },
    imageUrl: { type: String },
    promoImage: { type: String },
    bgGradient: { type: String, default: 'from-orange-50 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/20' },
    blobColor: { type: String, default: 'bg-orange-200 dark:bg-orange-800/50' },
    sortOrder: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
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

export const Banner = model<IBannerDocument>('Banner', BannerSchema);
export default Banner;
