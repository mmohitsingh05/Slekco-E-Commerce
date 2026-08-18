import { Category } from '../models/Category.js';
import { Product, type IProduct } from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';
import type { QueryFilter, Types } from 'mongoose';

export interface ProductListParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort: 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'rating';
}

export interface ProductListItem {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  images: string[];
  category: { name: string; slug: string };
  rating: number;
  ratingCount: number;
  stock: number;
  isFeatured: boolean;
  createdAt: Date;
}

type PopulatedProduct = Omit<IProduct, 'category'> & {
  _id: Types.ObjectId;
  category: { name: string; slug: string };
};

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// MongoDB $text ignores single characters and common stopwords, so short or
// stopword-only queries fall back to a case-insensitive regex across the same
// fields the text index covers.
const SEARCH_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if',
  'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that',
  'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was',
  'will', 'with',
]);

const usesRegexSearch = (search: string): boolean =>
  search
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .some((token) => token.length < 3 || SEARCH_STOPWORDS.has(token));

const toListItem = (doc: PopulatedProduct): ProductListItem => ({
  _id: doc._id,
  name: doc.name,
  slug: doc.slug,
  price: doc.price,
  compareAtPrice: doc.compareAtPrice ?? null,
  image: doc.images[0] ?? '',
  images: doc.images,
  category: { name: doc.category.name, slug: doc.category.slug },
  rating: doc.rating ?? 0,
  ratingCount: doc.reviewCount ?? 0,
  stock: doc.stock,
  isFeatured: doc.isFeatured,
  createdAt: doc.createdAt,
});

export async function listProducts(params: ProductListParams) {
  const { page, limit } = params;
  const filter: QueryFilter<IProduct> = {};

  if (params.search) {
    if (usesRegexSearch(params.search)) {
      const pattern = escapeRegExp(params.search.trim());
      filter.$or = [
        { name: { $regex: pattern, $options: 'i' } },
        { brand: { $regex: pattern, $options: 'i' } },
        { description: { $regex: pattern, $options: 'i' } },
        { tags: { $regex: pattern, $options: 'i' } },
      ];
    } else {
      filter.$text = { $search: params.search };
    }
  }

  if (params.brand) {
    filter.brand = { $regex: `^${escapeRegExp(params.brand)}$`, $options: 'i' };
  }

  if (params.minPrice !== undefined || params.maxPrice !== undefined) {
    filter.price = {};
    if (params.minPrice !== undefined) filter.price.$gte = params.minPrice;
    if (params.maxPrice !== undefined) filter.price.$lte = params.maxPrice;
  }

  if (params.category) {
    const category = await Category.findOne({ slug: params.category }).select('_id').lean();
    if (!category) {
      return { products: [], pagination: { page, limit, total: 0, pages: 0 } };
    }
    filter.category = category._id;
  }

  const sortMap: Record<ProductListParams['sort'], Record<string, 1 | -1>> = {
    featured: { isFeatured: -1, createdAt: -1 },
    newest: { createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating: { rating: -1 },
  };

  const [docs, total] = await Promise.all([
    Product.find(filter)
      .populate<{ category: { name: string; slug: string } }>('category', 'name slug')
      .sort(sortMap[params.sort])
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  const products = docs.map(toListItem);
  return {
    products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export interface ProductDetail extends ProductListItem {
  description: string;
  details: string[];
  tags: string[];
  updatedAt: Date;
}

const toDetailItem = (doc: PopulatedProduct): ProductDetail => ({
  ...toListItem(doc),
  description: doc.description,
  details: doc.details,
  tags: doc.tags,
  updatedAt: doc.updatedAt,
});

export async function getProductBySlug(slug: string) {
  const doc = await Product.findOne({ slug })
    .populate<{ category: { name: string; slug: string } }>('category', 'name slug')
    .lean();
  return doc ? toDetailItem(doc) : null;
}

export async function getRelatedProducts(slug: string, limit = 4) {
  const product = await Product.findOne({ slug }).select('category').lean();
  if (!product) throw new ApiError(404, 'Product not found');
  const docs = await Product.find({ category: product.category, slug: { $ne: slug } })
    .populate<{ category: { name: string; slug: string } }>('category', 'name slug')
    .sort({ isFeatured: -1, createdAt: -1 })
    .limit(limit)
    .lean();
  return docs.map(toListItem);
}