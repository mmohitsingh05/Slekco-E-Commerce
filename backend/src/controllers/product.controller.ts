import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { success } from '../utils/response.js';
import { ApiError } from '../utils/ApiError.js';
import {
  getProductBySlug,
  getRelatedProducts,
  listProducts,
} from '../services/product.service.js';

export const listProductsController = asyncHandler(async (req: Request, res: Response) => {
  const query = res.locals.validatedQuery as Record<string, unknown>;
  const result = await listProducts({
    page: Number(query.page),
    limit: Number(query.limit),
    search: query.search as string | undefined,
    category: query.category as string | undefined,
    brand: query.brand as string | undefined,
    minPrice: query.minPrice === undefined ? undefined : Number(query.minPrice),
    maxPrice: query.maxPrice === undefined ? undefined : Number(query.maxPrice),
    sort: query.sort as 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'rating',
  });
  success(res, result);
});

export const getProductController = asyncHandler(async (req: Request<{ slug: string }>, res: Response) => {
  const product = await getProductBySlug(req.params.slug);
  if (!product) throw new ApiError(404, 'Product not found');
  success(res, { product });
});

export const relatedProductsController = asyncHandler(async (req: Request<{ slug: string }>, res: Response) => {
  const products = await getRelatedProducts(req.params.slug);
  success(res, { products });
});