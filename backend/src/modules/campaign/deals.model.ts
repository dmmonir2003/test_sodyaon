import { Schema, model, Document } from 'mongoose';

// =========================================================================
// 1. FLASH DEALS
// =========================================================================
export interface IFlashDeal {
  productId: Schema.Types.ObjectId;
  variantId?: string; // variant SKU (optional)
  dealPrice: number;
  originalPrice: number;
  savePercent: number;
  startsAt: Date;
  endsAt: Date;
  stockLimit: number;
  soldCount: number;
  isLive: boolean;
}

export interface IFlashDealDocument extends IFlashDeal, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const FlashDealSchema = new Schema<IFlashDealDocument>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    variantId: { type: String, trim: true },
    dealPrice: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    savePercent: { type: Number, required: true, min: 0, max: 100 },
    startsAt: { type: Date, required: true, index: true },
    endsAt: { type: Date, required: true, index: true },
    stockLimit: { type: Number, required: true, min: 1 },
    soldCount: { type: Number, default: 0, min: 0 },
    isLive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// High-speed index for fetching live deals
FlashDealSchema.index({ isLive: 1, startsAt: 1, endsAt: 1 });

export const FlashDeal = model<IFlashDealDocument>('FlashDeal', FlashDealSchema);

// =========================================================================
// 2. SPECIAL COLLECTIONS (Marketing collection banners, e.g. STEM Toys Campaign)
// =========================================================================
export interface ISpecialCollection {
  titleEn: string;
  titleBn: string;
  badgeLabel?: string;
  bannerUrl: string;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;
}

export interface ISpecialCollectionDocument extends ISpecialCollection, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const SpecialCollectionSchema = new Schema<ISpecialCollectionDocument>(
  {
    titleEn: { type: String, required: true, trim: true },
    titleBn: { type: String, required: true, trim: true },
    badgeLabel: { type: String, trim: true },
    bannerUrl: { type: String, required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const SpecialCollection = model<ISpecialCollectionDocument>('SpecialCollection', SpecialCollectionSchema);

// =========================================================================
// 3. COLLECTION ITEMS (Linker products in special campaign collections)
// =========================================================================
export interface ICollectionItem {
  collectionId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  sortOrder: number;
}

export interface ICollectionItemDocument extends ICollectionItem, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionItemSchema = new Schema<ICollectionItemDocument>(
  {
    collectionId: { type: Schema.Types.ObjectId, ref: 'SpecialCollection', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Compound uniqueness
CollectionItemSchema.index({ collectionId: 1, productId: 1 }, { unique: true });

export const CollectionItem = model<ICollectionItemDocument>('CollectionItem', CollectionItemSchema);
