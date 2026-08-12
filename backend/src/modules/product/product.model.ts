import { Schema, model, Document } from 'mongoose';

// Interface for embedded Product Videos
export interface IProductVideo {
  youtubeUrl: string;
  titleBn?: string;
  thumbnailUrl?: string;
  channelName?: string;
  duration?: string;
  tabType?: string; // 'demo' | 'review' etc.
  sortOrder?: number;
}

// Interface for embedded Trust Badges (e.g. Free Shipping, Kids Safe)
export interface ITrustBadge {
  icon: string;
  labelEn: string;
  labelBn: string;
  sortOrder?: number;
}

// Interface for Related/Suggested Products
export interface IRelatedProduct {
  relatedId: Schema.Types.ObjectId;
  relationType: 'cross-sell' | 'up-sell' | 'similar';
}

// Interface for embedded Product Variant matrix
export interface IProductVariant {
  sku: string;
  nameEn: string;
  nameBn: string;
  price: number;
  originalPrice?: number; // Strike-through original price
  priceOverride?: number; // Variant price override
  stock: number;
  stockQty?: number; // ERD compliance compatibility
  images: string[];
  options: Record<string, string>; // e.g. { color: "Blue", size: "M" }
  
  // Specific ERD Variational columns
  colorName?: string;
  colorHex?: string;
  sizeLabel?: string;
  ageGroup?: string;
  isDefault?: boolean;
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
  videoUrl?: string; // Backward compatibility
  videos: IProductVideo[]; // Structured video array
  
  // Dynamic badge labels, CTAs, status and metadata
  status: 'active' | 'out_of_stock' | 'draft';
  isFeatured: boolean;
  badgeLabel?: string; // Custom banner badge (e.g., "15% OFF", "Save 200 BDT")
  viewCount: number; // View counts tracking
  whatsappNumber?: string; // Instant ordering/click-to-chat CTA

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
  brand?: Schema.Types.ObjectId; // Brand collection link
  categories: Schema.Types.ObjectId[];
  categoryId?: any; // Legacy numeric or Category ObjectId link
  subcategoryId?: Schema.Types.ObjectId;
  tags: string[];
  features?: string[];
  
  // Trust Badges & Cross-Sells
  trustBadges: ITrustBadge[];
  relatedProducts: IRelatedProduct[];

  // SKU Variational Matrix
  variants: IProductVariant[];

  // Specialized dynamic visual blocks
  playPersonality?: {
    labelEn: string;
    labelBn: string;
    descEn: string;
    descBn: string;
  };
  benefits?: {
    icon: string;
    titleEn: string;
    titleBn: string;
    descEn: string;
    descBn: string;
  }[];
  packageItems?: {
    count: string;
    textEn: string;
    textBn: string;
    detailsEn?: string;
    detailsBn?: string;
  }[];
  directionsEn?: string;
  directionsBn?: string;
  dealEndsAt?: Date;
}

export interface IProductDocument extends IProduct, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sub-document schema for videos
const ProductVideoSchema = new Schema<IProductVideo>(
  {
    youtubeUrl: { type: String, required: true },
    titleBn: { type: String },
    thumbnailUrl: { type: String },
    channelName: { type: String },
    duration: { type: String },
    tabType: { type: String, default: 'demo' },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

// Sub-document schema for trust badges
const TrustBadgeSchema = new Schema<ITrustBadge>(
  {
    icon: { type: String, required: true },
    labelEn: { type: String, required: true },
    labelBn: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

// Sub-document schema for related items
const RelatedProductSchema = new Schema<IRelatedProduct>(
  {
    relatedId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    relationType: { type: String, enum: ['cross-sell', 'up-sell', 'similar'], default: 'similar' },
  },
  { _id: false }
);

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
    priceOverride: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    stockQty: {
      type: Number,
      min: 0,
    },
    images: [{ type: String }],
    options: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    colorName: { type: String },
    colorHex: { type: String },
    sizeLabel: { type: String },
    ageGroup: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const PlayPersonalitySchema = new Schema(
  {
    labelEn: { type: String, trim: true },
    labelBn: { type: String, trim: true },
    descEn: { type: String, trim: true },
    descBn: { type: String, trim: true },
  },
  { _id: false }
);

const BenefitSchema = new Schema(
  {
    icon: { type: String, trim: true },
    titleEn: { type: String, trim: true },
    titleBn: { type: String, trim: true },
    descEn: { type: String, trim: true },
    descBn: { type: String, trim: true },
  },
  { _id: false }
);

const PackageItemSchema = new Schema(
  {
    count: { type: String, trim: true },
    textEn: { type: String, trim: true },
    textBn: { type: String, trim: true },
    detailsEn: { type: String, trim: true },
    detailsBn: { type: String, trim: true },
  },
  { _id: false }
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
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
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
    videos: [ProductVideoSchema],
    status: {
      type: String,
      enum: ['active', 'out_of_stock', 'draft'],
      default: 'active',
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    badgeLabel: {
      type: String,
      trim: true,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    whatsappNumber: {
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
    dealEndsAt: {
      type: Date,
      index: true,
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
      type: Schema.Types.Mixed,
      index: true,
    },
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      index: true,
    },
    tags: [{
      type: String,
      index: true,
    }],
    features: [{
      type: String,
    }],
    trustBadges: [TrustBadgeSchema],
    relatedProducts: [RelatedProductSchema],
    variants: [ProductVariantSchema],
    playPersonality: { type: PlayPersonalitySchema },
    benefits: [BenefitSchema],
    packageItems: [PackageItemSchema],
    directionsEn: { type: String, trim: true },
    directionsBn: { type: String, trim: true },
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
ProductSchema.index({ status: 1, discount: -1, price: 1 });

export const Product = model<IProductDocument>('Product', ProductSchema);
export default Product;
