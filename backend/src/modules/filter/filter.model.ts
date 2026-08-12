import { Schema, model, Document } from 'mongoose';

// ==========================================
// 1. FILTER ATTRIBUTES
// ==========================================
export interface IFilterAttribute {
  nameEn: string;
  nameBn: string;
  inputType: 'select' | 'checkbox' | 'color' | 'text';
  isUniversal: boolean; // Applies to all products
  sortOrder: number;
}

export interface IFilterAttributeDocument extends IFilterAttribute, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const FilterAttributeSchema = new Schema<IFilterAttributeDocument>(
  {
    nameEn: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    inputType: {
      type: String,
      required: true,
      enum: ['select', 'checkbox', 'color', 'text'],
      default: 'select',
    },
    isUniversal: { type: Boolean, default: false, index: true },
    sortOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const FilterAttribute = model<IFilterAttributeDocument>('FilterAttribute', FilterAttributeSchema);

// ==========================================
// 2. CATEGORY FILTERS (Scoped linkage mapping Category to Attribute)
// ==========================================
export interface ICategoryFilter {
  categoryId: Schema.Types.ObjectId;
  attributeId: Schema.Types.ObjectId;
  inheritToChildren: boolean;
  isRequired: boolean;
  sortOrder: number;
}

export interface ICategoryFilterDocument extends ICategoryFilter, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategoryFilterSchema = new Schema<ICategoryFilterDocument>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    attributeId: { type: Schema.Types.ObjectId, ref: 'FilterAttribute', required: true, index: true },
    inheritToChildren: { type: Boolean, default: true },
    isRequired: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// High-speed compound lookup key
CategoryFilterSchema.index({ categoryId: 1, attributeId: 1 }, { unique: true });

export const CategoryFilter = model<ICategoryFilterDocument>('CategoryFilter', CategoryFilterSchema);

// ==========================================
// 3. FILTER OPTIONS (Pre-defined options for select/checkbox/color types)
// ==========================================
export interface IFilterOption {
  attributeId: Schema.Types.ObjectId;
  valueEn: string;
  valueBn: string;
  colorHex?: string; // Specific for color inputs (e.g. #FF0000)
  sortOrder: number;
}

export interface IFilterOptionDocument extends IFilterOption, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const FilterOptionSchema = new Schema<IFilterOptionDocument>(
  {
    attributeId: { type: Schema.Types.ObjectId, ref: 'FilterAttribute', required: true, index: true },
    valueEn: { type: String, required: true, trim: true },
    valueBn: { type: String, required: true, trim: true },
    colorHex: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FilterOption = model<IFilterOptionDocument>('FilterOption', FilterOptionSchema);

// ==========================================
// 4. PRODUCT FILTER VALUES (Dynamic EAV engine values)
// ==========================================
export interface IProductFilterValue {
  productId: Schema.Types.ObjectId;
  attributeId: Schema.Types.ObjectId;
  optionId?: Schema.Types.ObjectId; // Optional if using custom text input
  customValue?: string; // Optional custom string input
}

export interface IProductFilterValueDocument extends IProductFilterValue, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductFilterValueSchema = new Schema<IProductFilterValueDocument>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    attributeId: { type: Schema.Types.ObjectId, ref: 'FilterAttribute', required: true, index: true },
    optionId: { type: Schema.Types.ObjectId, ref: 'FilterOption', index: true },
    customValue: { type: String, trim: true },
  },
  { timestamps: true }
);

ProductFilterValueSchema.index({ productId: 1, attributeId: 1, optionId: 1 }, { unique: true });

export const ProductFilterValue = model<IProductFilterValueDocument>('ProductFilterValue', ProductFilterValueSchema);
