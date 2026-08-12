import { Schema, model, Document } from 'mongoose';

export interface IBrand {
  nameEn: string;
  nameBn: string;
  slug: string;
  logoUrl?: string;
  tagLabel?: string;
  isFeatured: boolean;
}

export interface IBrandDocument extends IBrand, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrandDocument>(
  {
    nameEn: {
      type: String,
      required: true,
      trim: true,
    },
    nameBn: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      trim: true,
    },
    tagLabel: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
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

export const Brand = model<IBrandDocument>('Brand', BrandSchema);
export default Brand;
