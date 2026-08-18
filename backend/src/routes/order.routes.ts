import { Router } from 'express';
import { createOrderController, getOrderController } from '../controllers/order.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createOrderSchema } from '../validators/order.validator.js';

const router = Router();

router.post('/', validate(createOrderSchema), createOrderController);
router.get('/:id', getOrderController);

export default router;