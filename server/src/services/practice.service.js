import Kit from '../models/Kit.js';
import PracticeSession from '../models/PracticeSession.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Get flashcards for practice session, sorted by priority:
 * 1. Never practiced cards first
 * 2. Lowest confidence scores
 * 3. Oldest practice sessions
 */
export async function getPracticeDeck(kitId, userId) {
  const kit = await Kit.findOne({ _id: kitId, user_id: userId }).lean();
  if (!kit) throw new AppError('Kit not found', 404);
  if (!kit.kit_data?.flashcards?.length) {
    return { flashcards: [], total: 0 };
  }

  const flashcards = kit.kit_data.flashcards;

  // Fetch all practice history for this user & kit
  const sessions = await PracticeSession.find({ kit_id: kitId, user_id: userId })
    .sort({ practiced_at: -1 })
    .lean();

  // Map flashcard_id to latest session & stats
  const sessionMap = new Map();
  for (const s of sessions) {
    if (!sessionMap.has(s.flashcard_id)) {
      sessionMap.set(s.flashcard_id, s);
    }
  }

  const enrichedCards = flashcards.map(card => {
    const lastSession = sessionMap.get(card.id);
    return {
      ...card,
      confidence: lastSession ? lastSession.confidence : null,
      last_practiced_at: lastSession ? lastSession.practiced_at : null,
      practiced: Boolean(lastSession),
    };
  });

  // Sort:
  // 1. Unpracticed first (confidence === null)
  // 2. Lowest confidence next (1 -> 5)
  // 3. Oldest practiced_at
  enrichedCards.sort((a, b) => {
    if (a.confidence === null && b.confidence !== null) return -1;
    if (a.confidence !== null && b.confidence === null) return 1;
    if (a.confidence !== null && b.confidence !== null) {
      if (a.confidence !== b.confidence) return a.confidence - b.confidence;
      const dateA = new Date(a.last_practiced_at || 0).getTime();
      const dateB = new Date(b.last_practiced_at || 0).getTime();
      return dateA - dateB;
    }
    return 0;
  });

  return {
    flashcards: enrichedCards,
    total: enrichedCards.length,
    practicedCount: enrichedCards.filter(c => c.practiced).length,
  };
}

/**
 * Record confidence rating (1 to 5) for a flashcard
 */
export async function recordConfidence(kitId, userId, flashcardId, confidence) {
  const score = parseInt(confidence, 10);
  if (isNaN(score) || score < 1 || score > 5) {
    throw new AppError('Confidence must be an integer between 1 and 5', 400);
  }

  const kit = await Kit.findOne({ _id: kitId, user_id: userId });
  if (!kit) throw new AppError('Kit not found', 404);

  const cardExists = kit.kit_data?.flashcards?.some(c => c.id === flashcardId);
  if (!cardExists) {
    throw new AppError('Flashcard not found in this kit', 404);
  }

  const session = await PracticeSession.create({
    kit_id: kitId,
    user_id: userId,
    flashcard_id: flashcardId,
    confidence: score,
  });

  return session;
}

/**
 * Get summary progress for flashcard practice
 */
export async function getProgress(kitId, userId) {
  const kit = await Kit.findOne({ _id: kitId, user_id: userId }).lean();
  if (!kit) throw new AppError('Kit not found', 404);

  const totalCards = kit.kit_data?.flashcards?.length || 0;
  if (totalCards === 0) {
    return {
      total: 0,
      practiced: 0,
      unpracticed: 0,
      average_confidence: 0,
      mastered_count: 0, // confidence >= 4
    };
  }

  const sessions = await PracticeSession.find({ kit_id: kitId, user_id: userId }).lean();
  const latestMap = new Map();
  for (const s of sessions) {
    const existing = latestMap.get(s.flashcard_id);
    if (!existing || new Date(s.practiced_at) > new Date(existing.practiced_at)) {
      latestMap.set(s.flashcard_id, s);
    }
  }

  const ratings = Array.from(latestMap.values()).map(s => s.confidence);
  const sumConfidence = ratings.reduce((sum, r) => sum + r, 0);
  const avgConfidence = ratings.length > 0 ? parseFloat((sumConfidence / ratings.length).toFixed(1)) : 0;
  const masteredCount = ratings.filter(r => r >= 4).length;

  return {
    total: totalCards,
    practiced: latestMap.size,
    unpracticed: Math.max(0, totalCards - latestMap.size),
    average_confidence: avgConfidence,
    mastered_count: masteredCount,
  };
}
