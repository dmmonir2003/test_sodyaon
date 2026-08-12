import { Schema, model, Document } from 'mongoose';

export interface IAiGiftSession {
  userId?: Schema.Types.ObjectId; // Nullable for guest users
  childAge: number;
  gender: string;
  interests: string;
  occasion?: string;
  budgetMin?: number;
  budgetMax?: number;
  recommendedIds: Schema.Types.ObjectId[];
  aiReasoning?: string;
}

export interface IAiGiftSessionDocument extends IAiGiftSession, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const AiGiftSessionSchema = new Schema<IAiGiftSessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    childAge: { type: Number, required: true },
    gender: { type: String, required: true, trim: true },
    interests: { type: String, required: true, trim: true },
    occasion: { type: String, trim: true },
    budgetMin: { type: Number, default: 0 },
    budgetMax: { type: Number },
    recommendedIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    aiReasoning: { type: String, trim: true },
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

export const AiGiftSession = model<IAiGiftSessionDocument>('AiGiftSession', AiGiftSessionSchema);
export default AiGiftSession;
