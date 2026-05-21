import { Schema, model, Document } from 'mongoose';

// Interface for embedded Product Variant matrix
export interface IProductVariant {
  sku: string;
  nameEn: string;
  nameBn: string;
  price: number;
  originalPrice?: number; // Strike-through original price
  stock: number;
  images: string[];
  options: Record<string, string>; // e.g. { color: "Blue", size: "M" }
}

export interface IProduct {
  // Core Identifiers
  sku: string; // Unique system master SKU
  numericId?: number; // Legacy ID compatibility
  slug: string; // Unique URL slug
  modelCode?: string; // Manufacturer model number
  
  // Localization layers
  nameEn: string;
  nameBn: string;
  name: string; // Backward compatibility
  bengaliName?: string; // Backward compatibility
  descriptionEn: string;
  descriptionBn: string;
  description: string; // Backward compatibility
  bengaliDescription?: string; // Backward compatibility

  // Multi-Media paths
  images: string[];
  image: string; // Backward compatibility (main thumbnail)
  videoUrl?: string;

  // Pricing (Master level - can fall back to variant prices)
  price: number;
  originalPrice?: number;
  discount?: number;

  // Visibility & Editorial Flags
  isPublished: boolean;
  bestseller: boolean;
  new: boolean;

  // Aggregated Stats
  avgRating: number;
  rating: number; // Backward compatibility
  reviews: number; // Backward compatibility (review count)
  reviewCount: number;
  totalSold: number;

  // Extracted Facet Indices (Physical indexes to drive sidebar filters)
  ageMonthsMin?: number;
  ageMonthsMax?: number;
  ageRange?: string; // Backward compatibility
  safetyScore?: number;
  brandEn: string;
  brandBn: string;

  // Polymorphic Attribute Storage (JSONB equivalent in MongoDB)
  specifications?: Record<string, any>;

  // Relations
  categories: Schema.Types.ObjectId[];
  categoryId?: number; // Legacy numeric category linkage compatibility
  tags: string[];
  features?: string[];

  // SKU Variational Matrix
  variants: IProductVariant[];
}

export interface IProductDocument extends IProduct, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sub-document schema for SKU variants
const ProductVariantSchema = new Schema<IProductVariant>(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    images: [{ type: String }],
    options: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  { _id: true }
);

const ProductSchema = new Schema<IProductDocument>(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    numericId: {
      type: Number,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    modelCode: {
      type: String,
      index: true,
      trim: true,
    },
    brandEn: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    brandBn: {
      type: String,
      required: true,
      trim: true,
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
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bengaliName: {
      type: String,
      trim: true,
    },
    descriptionEn: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionBn: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    bengaliDescription: {
      type: String,
      trim: true,
    },
    images: [{ type: String, required: true }],
    image: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    originalPrice: {
      type: Number,
      min: 0,
      index: true,
    },
    discount: {
      type: Number,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
      index: true,
    },
    new: {
      type: Boolean,
      default: false,
      index: true,
    },
    avgRating: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 5,
      index: true,
    },
    rating: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 5,
      index: true,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    ageMonthsMin: {
      type: Number,
      index: true,
    },
    ageMonthsMax: {
      type: Number,
      index: true,
    },
    ageRange: {
      type: String,
      index: true,
    },
    safetyScore: {
      type: Number,
      index: true,
    },
    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category',
      index: true,
    }],
    categoryId: {
      type: Number,
      index: true,
    },
    tags: [{
      type: String,
      index: true,
    }],
    features: [{
      type: String,
    }],
    variants: [ProductVariantSchema],
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

// High-performance compounding index for age range queries
ProductSchema.index({ ageMonthsMin: 1, ageMonthsMax: 1 });
ProductSchema.index({ price: 1, isPublished: 1 });

export const Product = model<IProductDocument>('Product', ProductSchema);
export default Product;
