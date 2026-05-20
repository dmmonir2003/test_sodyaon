import { Schema, model, Document } from 'mongoose';

export interface IProduct {
  numericId: number;
  name: string;
  bengaliName?: string;
  categoryId: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  bengaliDescription?: string;
  ageRange?: string;
  stock: number;
  tags: string[];
  features?: string[];
  bestseller?: boolean;
  new?: boolean;
  discount?: number;
}

export interface IProductDocument extends IProduct, Document {}

const ProductSchema = new Schema<IProductDocument>(
  {
    numericId: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    bengaliName: { type: String, trim: true },
    categoryId: { type: Number, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    bengaliDescription: { type: String },
    ageRange: { type: String },
    stock: { type: Number, required: true, default: 0, min: 0 },
    tags: [{ type: String }],
    features: [{ type: String }],
    bestseller: { type: Boolean, default: false },
    new: { type: Boolean, default: false },
    discount: { type: Number },
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

export const Product = model<IProductDocument>('Product', ProductSchema);
export default Product;
