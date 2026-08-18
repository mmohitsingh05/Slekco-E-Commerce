import { Router } from 'express';
import {
  categoryProductsController,
  listCategoriesController,
} from '../controllers/category.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productListQuerySchema } from '../validators/product.validator.js';

const router = Router();

router.get('/', listCategoriesController);
router.get('/:slug/products', validate(productListQuerySchema, 'query'), categoryProductsController);

export default router;