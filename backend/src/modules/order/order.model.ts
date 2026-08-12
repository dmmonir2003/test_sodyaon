import { Schema, model, Document } from 'mongoose';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'failed';
export type PaymentMethod = 'stripe' | 'cod';

export interface IOrderItem {
  id: string; // compatibility (can contain product _id or variant SKU)
  productId?: Schema.Types.ObjectId;
  variantId?: string; // variant SKU
  name: string;
  price: number;
  quantity: number;
  image?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface IOrder {
  userId?: Schema.Types.ObjectId;
  fullName: string;
  items: IOrderItem[];
  couponId?: Schema.Types.ObjectId;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number; // Final total amount
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  stripePaymentIntentId?: string;
  stripeClientSecret?: string;
  shippingAddress: string;
  shippingPhone: string;
  notes?: string;
  channel: 'web' | 'mobile' | 'pos';
}

export interface IOrderDocument extends IOrder, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    id: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    fullName: { type: String, required: true },
    items: [OrderItemSchema],
    couponId: { type: Schema.Types.ObjectId, ref: 'Coupon', index: true },
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, default: 0, min: 0 },
    deliveryFee: { type: Number, required: true, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'failed'],
      default: 'unpaid',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'cod'],
      required: true,
    },
    stripePaymentIntentId: { type: String },
    stripeClientSecret: { type: String },
    shippingAddress: { type: String, required: true },
    shippingPhone: { type: String, required: true },
    notes: { type: String },
    channel: {
      type: String,
      enum: ['web', 'mobile', 'pos'],
      default: 'web',
      index: true,
    },
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

export const Order = model<IOrderDocument>('Order', OrderSchema);
export default Order;
