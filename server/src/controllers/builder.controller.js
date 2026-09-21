import Kit from '../models/Kit.js';
import UserEdit from '../models/UserEdit.js';
import { AppError } from '../middleware/errorHandler.js';

// Helper: fetch kit with ownership check
async function getKitWithOwnership(id, userId) {
  const kit = await Kit.findOne({ _id: id, user_id: userId });
  if (!kit) throw new AppError('Kit not found', 404);
  if (!kit.kit_data) throw new AppError('Kit has no data yet', 400);
  return kit;
}

// Helper: mark content as user-edited
async function markEdited(kitId, contentType, contentId) {
  await UserEdit.findOneAndUpdate(
    { kit_id: kitId, content_type: contentType, content_id: contentId },
    { kit_id: kitId, content_type: contentType, content_id: contentId },
    { upsert: true }
  );
}

// ─── QUESTIONS ───

export async function editQuestion(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    const { text, answer_outline, difficulty } = req.body;
    let found = false;

    for (const category of Object.keys(kit.kit_data.questions)) {
      const idx = kit.kit_data.questions[category].findIndex(q => q.id === req.params.qid);
      if (idx !== -1) {
        if (text !== undefined) kit.kit_data.questions[category][idx].text = text;
        if (answer_outline !== undefined) kit.kit_data.questions[category][idx].answer_outline = answer_outline;
        if (difficulty !== undefined) kit.kit_data.questions[category][idx].difficulty = Math.min(3, Math.max(1, parseInt(difficulty, 10)));
        kit.kit_data.questions[category][idx].source = 'user_edited';
        found = true;
        break;
      }
    }

    if (!found) throw new AppError('Question not found', 404);

    kit.markModified('kit_data');
    await kit.save();
    await markEdited(kit._id, 'question', req.params.qid);

    res.json({ message: 'Question updated' });
  } catch (err) {
    next(err);
  }
}

export async function addQuestion(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    const { category, text, difficulty, requirement_ids, answer_outline } = req.body;

    if (!category || !text) throw new AppError('category and text are required', 400);

    const validCats = ['technical', 'behavioural', 'system_design', 'company_fit'];
    if (!validCats.includes(category)) throw new AppError(`Invalid category: ${category}`, 400);

    const newId = `q_user_${Date.now()}`;
    const question = {
      id: newId,
      text,
      difficulty: Math.min(3, Math.max(1, parseInt(difficulty, 10) || 2)),
      requirement_ids: requirement_ids || [],
      answer_outline: answer_outline || '',
      source: 'user',
    };

    if (!kit.kit_data.questions[category]) kit.kit_data.questions[category] = [];
    kit.kit_data.questions[category].push(question);

    kit.markModified('kit_data');
    await kit.save();
    await markEdited(kit._id, 'question', newId);

    res.status(201).json({ message: 'Question added', question });
  } catch (err) {
    next(err);
  }
}

export async function deleteQuestion(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    let found = false;

    for (const category of Object.keys(kit.kit_data.questions)) {
      const idx = kit.kit_data.questions[category].findIndex(q => q.id === req.params.qid);
      if (idx !== -1) {
        kit.kit_data.questions[category].splice(idx, 1);
        found = true;
        break;
      }
    }

    if (!found) throw new AppError('Question not found', 404);

    kit.markModified('kit_data');
    await kit.save();

    res.json({ message: 'Question deleted' });
  } catch (err) {
    next(err);
  }
}

export async function reorderQuestions(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    const { category, question_ids } = req.body;

    if (!category || !Array.isArray(question_ids)) {
      throw new AppError('category and question_ids array are required', 400);
    }

    const currentQuestions = kit.kit_data.questions[category] || [];
    const reordered = question_ids
      .map(id => currentQuestions.find(q => q.id === id))
      .filter(Boolean);

    const reorderedIds = new Set(reordered.map(q => q.id));
    const remaining = currentQuestions.filter(q => !reorderedIds.has(q.id));

    kit.kit_data.questions[category] = [...reordered, ...remaining];
    kit.markModified('kit_data');
    await kit.save();

    res.json({ message: 'Questions reordered' });
  } catch (err) {
    next(err);
  }
}

export async function moveQuestionCategory(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    const { target_category } = req.body;

    const validCats = ['technical', 'behavioural', 'system_design', 'company_fit'];
    if (!validCats.includes(target_category)) throw new AppError('Invalid target_category', 400);

    let question = null;
    for (const category of Object.keys(kit.kit_data.questions)) {
      const idx = kit.kit_data.questions[category].findIndex(q => q.id === req.params.qid);
      if (idx !== -1) {
        question = kit.kit_data.questions[category].splice(idx, 1)[0];
        break;
      }
    }

    if (!question) throw new AppError('Question not found', 404);

    if (!kit.kit_data.questions[target_category]) kit.kit_data.questions[target_category] = [];
    kit.kit_data.questions[target_category].push(question);

    kit.markModified('kit_data');
    await kit.save();

    res.json({ message: `Question moved to ${target_category}` });
  } catch (err) {
    next(err);
  }
}

// ─── FLASHCARDS ───

export async function editFlashcard(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    const { front, back } = req.body;

    const idx = kit.kit_data.flashcards.findIndex(f => f.id === req.params.fid);
    if (idx === -1) throw new AppError('Flashcard not found', 404);

    if (front !== undefined) kit.kit_data.flashcards[idx].front = front;
    if (back !== undefined) kit.kit_data.flashcards[idx].back = back;
    kit.kit_data.flashcards[idx].source = 'user_edited';

    kit.markModified('kit_data');
    await kit.save();
    await markEdited(kit._id, 'flashcard', req.params.fid);

    res.json({ message: 'Flashcard updated' });
  } catch (err) {
    next(err);
  }
}

export async function addFlashcard(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    const { front, back, requirement_ids } = req.body;

    if (!front || !back) throw new AppError('front and back are required', 400);

    const newId = `fc_user_${Date.now()}`;
    const flashcard = { id: newId, front, back, requirement_ids: requirement_ids || [], source: 'user' };

    kit.kit_data.flashcards.push(flashcard);
    kit.markModified('kit_data');
    await kit.save();
    await markEdited(kit._id, 'flashcard', newId);

    res.status(201).json({ message: 'Flashcard added', flashcard });
  } catch (err) {
    next(err);
  }
}

export async function deleteFlashcard(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    const idx = kit.kit_data.flashcards.findIndex(f => f.id === req.params.fid);
    if (idx === -1) throw new AppError('Flashcard not found', 404);

    kit.kit_data.flashcards.splice(idx, 1);
    kit.markModified('kit_data');
    await kit.save();

    res.json({ message: 'Flashcard deleted' });
  } catch (err) {
    next(err);
  }
}

// ─── COMPANY BRIEF ───

export async function editCompanyBrief(req, res, next) {
  try {
    const kit = await getKitWithOwnership(req.params.id, req.user.id);
    const { summary, what_they_do } = req.body;

    if (summary !== undefined) kit.kit_data.company_brief.summary = summary;
    if (what_they_do !== undefined) kit.kit_data.company_brief.what_they_do = what_they_do;

    kit.markModified('kit_data');
    await kit.save();
    await markEdited(kit._id, 'company_brief', 'company_brief');

    res.json({ message: 'Company brief updated' });
  } catch (err) {
    next(err);
  }
}
