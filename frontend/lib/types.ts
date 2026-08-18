export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  productCount?: number;
}

export interface CategoryRef {
  name: string;
  slug: string;
}

/** Item shape returned by the listing endpoint (lightweight, no description). */
export interface ProductListItem {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  images: string[];
  category: CategoryRef;
  rating: number;
  ratingCount: number;
  stock: number;
  isFeatured: boolean;
  createdAt: string;
}

/** Full product shape returned by the product detail endpoint. */
export interface Product extends ProductListItem {
  description: string;
  details: string[];
  tags: string[];
  updatedAt: string;
}

export interface ListResult<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export type SortOption = "featured" | "price_asc" | "price_desc" | "newest" | "rating";

export interface ProductQuery {
  q?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
  limit?: number;
}