import { Schema, model, Document } from 'mongoose';

export interface IProductQA {
  productId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId; // User who asked the question
  answeredBy?: Schema.Types.ObjectId; // Staff/Admin who answered
  question: string;
  answer?: string;
  askedAt: Date;
  answeredAt?: Date;
  isVisible: boolean;
  helpfulCount: number;
}

export interface IProductQADocument extends IProductQA, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductQASchema = new Schema<IProductQADocument>(
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
    answeredBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
    },
    askedAt: {
      type: Date,
      default: Date.now,
    },
    answeredAt: {
      type: Date,
    },
    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
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

// High-speed index to pull visible questions for a product
ProductQASchema.index({ productId: 1, isVisible: 1, askedAt: -1 });

export const ProductQA = model<IProductQADocument>('ProductQA', ProductQASchema);
export default ProductQA;
