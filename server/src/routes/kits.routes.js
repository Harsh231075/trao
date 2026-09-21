import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as kitController from '../controllers/kit.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', kitController.createKit);
router.get('/', kitController.listKits);
router.get('/:id', kitController.getKitById);
router.put('/:id', kitController.updateKit);
router.delete('/:id', kitController.deleteKit);

export default router;
