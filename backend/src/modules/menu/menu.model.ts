import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  titleEn: string;
  titleBn: string;
  url: string;
  type: 'navbar' | 'footer';
  parentId?: mongoose.Types.ObjectId;
  group?: string;
  sortOrder: number;
  isActive: boolean;
  badgeEn?: string;
  badgeBn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  ctaEn?: string;
  ctaBn?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema: Schema = new Schema(
  {
    titleEn: { type: String, required: true, trim: true },
    titleBn: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    type: { type: String, enum: ['navbar', 'footer'], required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null },
    group: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    badgeEn: { type: String, trim: true },
    badgeBn: { type: String, trim: true },
    descriptionEn: { type: String, trim: true },
    descriptionBn: { type: String, trim: true },
    ctaEn: { type: String, trim: true },
    ctaBn: { type: String, trim: true },
  },
  { timestamps: true }
);

// Indexes for fast fetching
MenuItemSchema.index({ type: 1, isActive: 1, sortOrder: 1 });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
