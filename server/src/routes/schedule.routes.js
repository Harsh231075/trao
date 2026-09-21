import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as scheduleController from '../controllers/schedule.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/:id/schedule', scheduleController.getSchedule);
router.put('/:id/schedule', scheduleController.updateSchedule);

export default router;
