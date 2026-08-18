import { queryMockProducts, getMockProduct, getMockRelated, mockCategories } from "@/lib/mock-data";
import type { Category, ListResult, Product, ProductListItem, ProductQuery } from "@/lib/types";

/**
 * Catalog data access layer. Pages and server components import ONLY from here.
 *
 * Phase 2 (frontend shell): backed by mock data so the storefront can be built
 * before the API exists.
 * Phase 6 (integration): the bodies below are swapped for real fetches against
 * the Express API — no component changes required.
 */

export async function getCategories(): Promise<Category[]> {
  // Phase 6: const data = await api<Category[]>("/categories?withCounts=true");
  return mockCategories;
}

export async function getProducts(query: ProductQuery = {}): Promise<ListResult<ProductListItem>> {
  // Phase 6:
  // const params = new URLSearchParams();
  // if (query.q) params.set("q", query.q);
  // ...
  // const data = await api<ListResult<ProductListItem>>(`/products?${params}`);
  return queryMockProducts(query);
}

export async function getProduct(slug: string): Promise<Product | null> {
  // Phase 6: return api<Product>(`/products/${slug}`);
  return getMockProduct(slug);
}

export async function getRelatedProducts(slug: string): Promise<ProductListItem[]> {
  // Phase 6: return api<ProductListItem[]>(`/products/${slug}/related`);
  return getMockRelated(slug);
}