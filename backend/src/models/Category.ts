import mongoose, { Schema } from 'mongoose';

export interface ICategory {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isFeatured: boolean;
  createdAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Category = mongoose.model<ICategory>('Category', categorySchema);