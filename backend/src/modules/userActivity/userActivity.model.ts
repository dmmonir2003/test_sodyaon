import { Schema, model, Document } from 'mongoose';

// ==========================================
// 1. WISHLIST
// ==========================================
export interface IWishlist {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  variantId?: string; // variant SKU (optional)
  addedAt: Date;
}

export interface IWishlistDocument extends IWishlist, Document {
  id: string;
}

const WishlistSchema = new Schema<IWishlistDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    variantId: { type: String, trim: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent duplicate wishlist items for a user/product combination
WishlistSchema.index({ userId: 1, productId: 1, variantId: 1 }, { unique: true });

export const Wishlist = model<IWishlistDocument>('Wishlist', WishlistSchema);

// ==========================================
// 2. RECENTLY VIEWED
// ==========================================
export interface IRecentlyViewed {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  viewedAt: Date;
}

export interface IRecentlyViewedDocument extends IRecentlyViewed, Document {
  id: string;
}

const RecentlyViewedSchema = new Schema<IRecentlyViewedDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    viewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Compound index to quick-fetch browsing history order by time
RecentlyViewedSchema.index({ userId: 1, viewedAt: -1 });

export const RecentlyViewed = model<IRecentlyViewedDocument>('RecentlyViewed', RecentlyViewedSchema);
