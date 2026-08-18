import { Category } from '../models/Category.js';

export async function listCategories() {
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'category',
        as: 'products',
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        image: 1,
        isFeatured: 1,
        createdAt: 1,
        productCount: { $size: '$products' },
      },
    },
    { $sort: { isFeatured: -1, name: 1 } },
  ]);
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  return Category.findOne({ slug }).lean();
}