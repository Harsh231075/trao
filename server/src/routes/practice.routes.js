import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as practiceController from '../controllers/practice.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/:id/practice', practiceController.getDeck);
router.post('/:id/practice', practiceController.recordConfidence);
router.get('/:id/practice/progress', practiceController.getProgress);

export default router;
