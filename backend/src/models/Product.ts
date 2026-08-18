import mongoose, { Schema, type Types } from 'mongoose';

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: Types.ObjectId;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  details: string[];
  rating?: number;
  reviewCount?: number;
  stock: number;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    description: { type: String, required: true, trim: true },
    brand: { type: String, required: true, index: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    price: { type: Number, required: true, min: 0, index: true },
    compareAtPrice: { type: Number, min: 0, default: null },
    images: { type: [String], default: [] },
    details: { type: [String], default: [] },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    stock: { type: Number, min: 0, default: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

productSchema.index({ name: 'text', brand: 'text', description: 'text', tags: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);