import { Schema, model, Document } from 'mongoose';

export interface IUISection {
  type: 'HERO_BANNER' | 'QUICK_DEAL' | 'COMBO_OFFER' | 'FLASH_SALE' | 'BRAND_SCROLLER' | 'GRID_COLLECTION' | 'MULTI_LIST';
  titleEn: string;
  titleBn: string;
  sortOrder: number;
  isVisible: boolean;
  
  // Visual & Styling configurations
  theme?: string; // styling hooks (e.g. "dark-luxury", "pastel-blue")
  bgPattern?: string; // decorative styling class or image url
  layoutStyle: 'GRID' | 'CAROUSEL' | 'LIST';
  gridColsResponsive?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  
  maxItems: number;

  // Contextual Banner Controls (Call-To-Action integrations)
  bannerImageEn?: string;
  bannerImageBn?: string;
  bannerCtaTextEn?: string;
  bannerCtaTextBn?: string;
  bannerLink?: string; // target path or URL
  bannerContextQuery?: Record<string, any>; // targeted key-value filter parameters (e.g., { age: "1-3" })
}

export interface IUISectionDocument extends IUISection, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const UISectionSchema = new Schema<IUISectionDocument>(
  {
    type: {
      type: String,
      required: true,
      enum: ['HERO_BANNER', 'QUICK_DEAL', 'COMBO_OFFER', 'FLASH_SALE', 'BRAND_SCROLLER', 'GRID_COLLECTION', 'MULTI_LIST'],
      index: true,
    },
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
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
    theme: {
      type: String,
      trim: true,
    },
    bgPattern: {
      type: String,
      trim: true,
    },
    layoutStyle: {
      type: String,
      required: true,
      enum: ['GRID', 'CAROUSEL', 'LIST'],
      default: 'GRID',
    },
    gridColsResponsive: {
      xs: { type: Number, default: 2 },
      sm: { type: Number, default: 2 },
      md: { type: Number, default: 3 },
      lg: { type: Number, default: 4 },
      xl: { type: Number, default: 4 },
    },
    maxItems: {
      type: Number,
      default: 10,
    },
    bannerImageEn: { type: String },
    bannerImageBn: { type: String },
    bannerCtaTextEn: { type: String },
    bannerCtaTextBn: { type: String },
    bannerLink: { type: String },
    bannerContextQuery: { type: Schema.Types.Mixed, default: {} },
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

export const UISection = model<IUISectionDocument>('UISection', UISectionSchema);
export default UISection;
