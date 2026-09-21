import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as genController from '../controllers/generation.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/:id/status', genController.getStatus);
router.post('/:id/generate', genController.restartGeneration);
router.post('/:id/regenerate', genController.regenerateSection);

export default router;
