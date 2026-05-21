import { Schema, model, Document } from 'mongoose';

// =========================================================================
// FLASH SALE ENGINE
// =========================================================================

export interface IFlashSaleItem {
  productId: Schema.Types.ObjectId;
  salePrice: number;
  stockCap: number; // allocated stock specifically for flash sale
  soldCount: number;
  purchaseLimitPerUser: number;
}

export interface IFlashSale {
  titleEn: string;
  titleBn: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  items: IFlashSaleItem[];
}

export interface IFlashSaleDocument extends IFlashSale, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const FlashSaleItemSchema = new Schema<IFlashSaleItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    stockCap: {
      type: Number,
      required: true,
      min: 1,
    },
    soldCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    purchaseLimitPerUser: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { _id: false }
);

const FlashSaleSchema = new Schema<IFlashSaleDocument>(
  {
    titleEn: {
      type: String,
      required: true,
      trim: true,
    },
    titleBn: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    endDate: {
      type: Date,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    items: [FlashSaleItemSchema],
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

// High-frequency query compound index for fetching active flash sales
FlashSaleSchema.index({ isActive: 1, startDate: 1, endDate: 1 });

export const FlashSale = model<IFlashSaleDocument>('FlashSale', FlashSaleSchema);

// =========================================================================
// COMBO & BUNDLE ENGINE (Fixed & Interactive Custom Builders)
// =========================================================================

// For Fixed Curated Bundles
export interface IComboFixedItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

// For Interactive Custom Builders Pools (e.g. Select 1 from STEM Pool, 2 from Clothes Pool)
export interface IComboPool {
  nameEn: string;
  nameBn: string;
  minSelect: number;
  maxSelect: number;
  products: Schema.Types.ObjectId[];
}

export interface IComboOffer {
  type: 'CURATED_FIXED' | 'INTERACTIVE_CUSTOM';
  nameEn: string;
  nameBn: string;
  descriptionEn?: string;
  descriptionBn?: string;
  
  // Multi-Tier Discount calculations
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;

  // Option-based configurations
  fixedItems?: IComboFixedItem[];
  customPools?: IComboPool[];
}

export interface IComboOfferDocument extends IComboOffer, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ComboFixedItemSchema = new Schema<IComboFixedItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  { _id: false }
);

const ComboPoolSchema = new Schema<IComboPool>(
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
    minSelect: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    maxSelect: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  { _id: false }
);

const ComboOfferSchema = new Schema<IComboOfferDocument>(
  {
    type: {
      type: String,
      required: true,
      enum: ['CURATED_FIXED', 'INTERACTIVE_CUSTOM'],
      index: true,
    },
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
    descriptionEn: { type: String },
    descriptionBn: { type: String },
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
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    startDate: { type: Date },
    endDate: { type: Date },
    fixedItems: [ComboFixedItemSchema],
    customPools: [ComboPoolSchema],
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

export const ComboOffer = model<IComboOfferDocument>('ComboOffer', ComboOfferSchema);
