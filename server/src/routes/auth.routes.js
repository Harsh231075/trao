import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.get('/session', authMiddleware, authController.getSession);

export default router;
