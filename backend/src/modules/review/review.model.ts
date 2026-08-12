import { Schema, model, Document } from 'mongoose';

export interface IReview {
  productId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  orderItemId?: string; // variant SKU or ID (optional, to verify purchases)
  rating: number; // 1 to 5
  body: string;
  isVerified: boolean;
  images: string[]; // photo reviews
  helpfulCount: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface IReviewDocument extends IReview, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    orderItemId: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    images: [{ type: String }],
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved', // Auto-approved in dev, can moderate
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

// High-speed index to fetch approved reviews for a product
ReviewSchema.index({ productId: 1, status: 1, createdAt: -1 });

export const Review = model<IReviewDocument>('Review', ReviewSchema);
export default Review;
