import { apiUrl } from "@/lib/site";
import type {
  Category,
  ListResult,
  Product,
  ProductListItem,
  ProductQuery,
} from "@/lib/types";

/**
 * Catalog data access layer. Pages and server components import ONLY from here.
 *
 * All functions hit the Express API (Phase 6). Backend responses use the
 * `{ success, data }` envelope — this module unwraps it and maps backend
 * shapes to the frontend types in `lib/types.ts`.
 */

export class ApiError extends Error {
  readonly status: number;
  readonly errors?: string[];

  constructor(status: number, message: string, errors?: string[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

async function api<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(apiUrl(path), {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new ApiError(0, "Could not reach the Slekco API");
  }

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    // non-JSON error body
  }

  if (!res.ok || body?.success === false) {
    throw new ApiError(
      res.status,
      body?.message ?? `Request failed (${res.status})`,
      body?.errors,
    );
  }
  return body!.data as T;
}

interface CategoriesResponse {
  categories: Category[];
}

interface ProductsResponse {
  products: ProductListItem[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

interface ProductResponse {
  product: Product;
}

interface RelatedResponse {
  products: ProductListItem[];
}

export async function getCategories(): Promise<Category[]> {
  const data = await api<CategoriesResponse>("/categories");
  return data.categories;
}

export async function getProducts(query: ProductQuery = {}): Promise<ListResult<ProductListItem>> {
  const params = new URLSearchParams();
  if (query.q) params.set("search", query.q);
  if (query.category) params.set("category", query.category);
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));

  const data = await api<ProductsResponse>(`/products?${params}`);
  return {
    items: data.products,
    total: data.pagination.total,
    page: data.pagination.page,
    pages: data.pagination.pages,
    limit: data.pagination.limit,
  };
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const data = await api<ProductResponse>(`/products/${slug}`);
    return data.product;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function getRelatedProducts(slug: string): Promise<ProductListItem[]> {
  const data = await api<RelatedResponse>(`/products/${slug}/related`);
  return data.products;
}