import * as practiceService from '../services/practice.service.js';

export async function getDeck(req, res, next) {
  try {
    const deck = await practiceService.getPracticeDeck(req.params.id, req.user.id);
    res.json(deck);
  } catch (err) {
    next(err);
  }
}

export async function recordConfidence(req, res, next) {
  try {
    const { flashcard_id, confidence } = req.body;
    const session = await practiceService.recordConfidence(
      req.params.id,
      req.user.id,
      flashcard_id,
      confidence
    );
    res.status(201).json({ message: 'Confidence recorded', session });
  } catch (err) {
    next(err);
  }
}

export async function getProgress(req, res, next) {
  try {
    const progress = await practiceService.getProgress(req.params.id, req.user.id);
    res.json(progress);
  } catch (err) {
    next(err);
  }
}
