import { Schema, model, Document } from 'mongoose';

export interface ICoupon {
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderValue: number;
  expiresAt: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface ICouponDocument extends ICoupon, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICouponDocument>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    discountType: {
      type: String,
      required: true,
      enum: ['PERCENTAGE', 'FIXED_AMOUNT'],
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    usageLimit: {
      type: Number,
      default: 10000,
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
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

export const Coupon = model<ICouponDocument>('Coupon', CouponSchema);
export default Coupon;
