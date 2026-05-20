import { Schema, model, Document } from 'mongoose';

export interface IBlogPostDocument extends Document {
  title: string;
  slug: string;
  content: string;
  author: string;
  coverImage: string;
  tags: string[];
  readTime?: number;
}

const BlogPostSchema = new Schema<IBlogPostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    author: { type: String, required: true, default: 'Sodayon Team' },
    coverImage: { type: String, required: true },
    tags: [{ type: String }],
    readTime: { type: Number, default: 5 },
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

export const BlogPost = model<IBlogPostDocument>('BlogPost', BlogPostSchema);
export default BlogPost;
