import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { success } from '../utils/response.js';
import { ApiError } from '../utils/ApiError.js';
import { getCategoryBySlug, listCategories } from '../services/category.service.js';
import { listProducts, type ProductListParams } from '../services/product.service.js';

export const listCategoriesController = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await listCategories();
  success(res, { categories });
});

export const categoryProductsController = asyncHandler(async (req: Request<{ slug: string }>, res: Response) => {
  const category = await getCategoryBySlug(req.params.slug);
  if (!category) throw new ApiError(404, 'Category not found');

  const query = res.locals.validatedQuery as Record<string, unknown>;
  const result = await listProducts({
    page: Number(query.page),
    limit: Number(query.limit),
    search: query.search as string | undefined,
    category: category.slug,
    brand: query.brand as string | undefined,
    minPrice: query.minPrice === undefined ? undefined : Number(query.minPrice),
    maxPrice: query.maxPrice === undefined ? undefined : Number(query.maxPrice),
    sort: (query.sort ?? 'featured') as ProductListParams['sort'],
  });
  success(res, result);
});