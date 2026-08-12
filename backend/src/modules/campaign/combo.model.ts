import { Schema, model, Document } from 'mongoose';

// =========================================================================
// 1. COMBO TEMPLATE (Defines the pricing rules, e.g. Select 3 toys for 15% discount)
// =========================================================================
export interface IComboTemplate {
  titleEn: string;
  titleBn: string;
  minItems: number;
  maxItems: number;
  discountPct: number;
  isActive: boolean;
}

export interface IComboTemplateDocument extends IComboTemplate, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ComboTemplateSchema = new Schema<IComboTemplateDocument>(
  {
    titleEn: { type: String, required: true, trim: true },
    titleBn: { type: String, required: true, trim: true },
    minItems: { type: Number, required: true, default: 2, min: 1 },
    maxItems: { type: Number, required: true, default: 5, min: 1 },
    discountPct: { type: Number, required: true, min: 0, max: 100 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const ComboTemplate = model<IComboTemplateDocument>('ComboTemplate', ComboTemplateSchema);

// =========================================================================
// 2. COMBO ORDERS (Logs a customer's specific custom combo checkout bundle)
// =========================================================================
export interface IComboOrder {
  userId: Schema.Types.ObjectId;
  templateId: Schema.Types.ObjectId;
  orderId?: Schema.Types.ObjectId; // References the final parent checkout order
  totalPrice: number;
  discountApplied: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface IComboOrderDocument extends IComboOrder, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ComboOrderSchema = new Schema<IComboOrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    templateId: { type: Schema.Types.ObjectId, ref: 'ComboTemplate', required: true, index: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', index: true },
    totalPrice: { type: Number, required: true, min: 0 },
    discountApplied: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

export const ComboOrder = model<IComboOrderDocument>('ComboOrder', ComboOrderSchema);

// =========================================================================
// 3. COMBO ITEMS (Individual line items chosen within the combo bundle)
// =========================================================================
export interface IComboItem {
  comboOrderId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  variantId?: string; // variant SKU (optional)
  quantity: number;
  unitPrice: number;
}

export interface IComboItemDocument extends IComboItem, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ComboItemSchema = new Schema<IComboItemDocument>(
  {
    comboOrderId: { type: Schema.Types.ObjectId, ref: 'ComboOrder', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    variantId: { type: String, trim: true },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

ComboItemSchema.index({ comboOrderId: 1, productId: 1, variantId: 1 }, { unique: true });

export const ComboItem = model<IComboItemDocument>('ComboItem', ComboItemSchema);
