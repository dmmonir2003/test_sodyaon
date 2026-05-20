import { Schema, model, Document } from 'mongoose';

export interface ICartItem {
  id: string; // Maps to Product's id or numericId
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ICartDocument extends Document {
  userId: Schema.Types.ObjectId;
  items: ICartItem[];
}

const CartItemSchema = new Schema<ICartItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
  },
  { _id: false }
);

const CartSchema = new Schema<ICartDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

export const Cart = model<ICartDocument>('Cart', CartSchema);
export default Cart;
