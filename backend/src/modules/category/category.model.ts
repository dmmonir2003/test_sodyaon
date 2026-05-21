import { Schema, model, Document } from 'mongoose';

export interface ICategory {
  slug: string;
  nameEn: string;
  nameBn: string;
  descriptionEn?: string;
  descriptionBn?: string;
  icon?: string; // Icon image URL or SVG path
  sortOrder: number;
  
  // Placement/UI Routing flags
  showInMegaMenu: boolean;
  showInDropdown: boolean;
  showInIconGrid: boolean;

  // Hierarchical recursive tree reference
  parentId?: Schema.Types.ObjectId | null;
}

export interface ICategoryDocument extends ICategory, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
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
    descriptionEn: {
      type: String,
      trim: true,
    },
    descriptionBn: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    showInMegaMenu: {
      type: Boolean,
      default: false,
      index: true,
    },
    showInDropdown: {
      type: Boolean,
      default: false,
      index: true,
    },
    showInIconGrid: {
      type: Boolean,
      default: false,
      index: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: { virtuals: true }
  }
);

// Virtual Populate for child categories to construct dynamic hierarchical trees easily
CategorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentId',
  options: { sort: { sortOrder: 1 } },
});

export const Category = model<ICategoryDocument>('Category', CategorySchema);
export default Category;
