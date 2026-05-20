import { Schema, model, Document } from 'mongoose';
import { ICartItem } from '../cart/cart.model';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'failed';
export type PaymentMethod = 'stripe' | 'cod';

export interface IOrder {
  userId: Schema.Types.ObjectId;
  items: ICartItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  stripePaymentIntentId?: string;
  stripeClientSecret?: string;
  shippingAddress: string;
  shippingPhone: string;
}

export interface IOrderDocument extends IOrder, Document {}

const OrderItemSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'failed'],
      default: 'unpaid',
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
