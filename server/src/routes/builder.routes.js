import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as builderController from '../controllers/builder.controller.js';

const router = Router();

router.use(authMiddleware);

// Questions
router.patch('/:id/questions/:qid', builderController.editQuestion);
router.post('/:id/questions', builderController.addQuestion);
router.delete('/:id/questions/:qid', builderController.deleteQuestion);
router.put('/:id/questions/reorder', builderController.reorderQuestions);
router.patch('/:id/questions/:qid/move', builderController.moveQuestionCategory);

// Flashcards
router.patch('/:id/flashcards/:fid', builderController.editFlashcard);
router.post('/:id/flashcards', builderController.addFlashcard);
router.delete('/:id/flashcards/:fid', builderController.deleteFlashcard);

// Company Brief
router.patch('/:id/company-brief', builderController.editCompanyBrief);

export default router;
