import { Router } from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { contactSchema } from '../validators/contact.validator.js';

const router = Router();

router.post('/', validate(contactSchema), contactController);

export default router;