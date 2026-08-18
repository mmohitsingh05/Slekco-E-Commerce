import { Router } from 'express';
import {
  getProductController,
  listProductsController,
  relatedProductsController,
} from '../controllers/product.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productListQuerySchema } from '../validators/product.validator.js';

const router = Router();

router.get('/', validate(productListQuerySchema, 'query'), listProductsController);
router.get('/:slug/related', relatedProductsController);
router.get('/:slug', getProductController);

export default router;