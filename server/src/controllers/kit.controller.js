import Kit from '../models/Kit.js';
import { runPipeline } from '../services/pipeline/orchestrator.js';
import { kitFingerprint } from '../utils/id.js';
import { validateUrl } from '../utils/url-validator.js';
import { AppError } from '../middleware/errorHandler.js';

export async function createKit(req, res, next) {
  try {
    // Accept lenient field aliases from frontend
    const job_description = req.body.job_description || req.body.jobDescription;
    const company_url = req.body.company_url || req.body.website;
    const days_available = req.body.days_available || req.body.daysUntil;

    if (!job_description || !company_url || !days_available) {
      throw new AppError('job_description, company_url, and days_available are required', 400);
    }

    const days = parseInt(days_available, 10);
    if (isNaN(days) || days < 1) {
      throw new AppError('days_available must be a positive integer', 400);
    }

    // Validate URL
    const urlCheck = validateUrl(company_url);
    if (!urlCheck.valid) {
      throw new AppError(`Invalid company URL: ${urlCheck.reason}`, 400, 'INVALID_URL');
    }

    // Duplicate submission guard
    const fp = kitFingerprint(job_description, company_url);
    const existingActive = await Kit.findOne({
      fingerprint: fp,
      user_id: req.user.id,
      status: { $in: ['queued', 'researching', 'extracting', 'generating', 'checking_coverage', 'building_schedule'] },
    });

    if (existingActive) {
      return res.status(409).json({
        error: 'A generation job for this submission is already in progress',
        code: 'DUPLICATE_SUBMISSION',
        kit_id: existingActive._id,
      });
    }

    // Create kit in DB
    const kit = await Kit.create({
      user_id: req.user.id,
      job_description,
      company_url,
      days_available: days,
      status: 'queued',
      fingerprint: fp,
    });

    res.status(201).json({
      id: kit._id,
      status: kit.status,
      message: 'Kit created. Generation pipeline starting.',
    });

    // Start pipeline asynchronously in background
    runPipeline(
      { jd: job_description, company_url, days_available: days },
      kit._id.toString()
    ).catch(err => {
      console.error(`[Kit ${kit._id}] Pipeline background error:`, err.message);
    });

  } catch (err) {
    next(err);
  }
}

export async function listKits(req, res, next) {
  try {
    const kits = await Kit.find({ user_id: req.user.id })
      .sort({ created_at: -1 })
      .lean();

    // Add computed convenience metrics
    const enrichedKits = kits.map(kit => {
      const kitData = kit.kit_data || {};
      const requirements = kitData.role?.requirements || [];
      const mustReqs = requirements.filter(r => r.priority === 'must');
      const coverage = kitData.coverage || {};
      const uncoveredMust = coverage.uncovered_must_requirements || [];
      const totalQuestions = Object.values(kitData.questions || {}).reduce(
        (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0
      );
      const totalFlashcards = (kitData.flashcards || []).length;

      return {
        ...kit,
        _computed: {
          total_must: mustReqs.length,
          total_nice: requirements.length - mustReqs.length,
          coverage_percentage: mustReqs.length > 0
            ? Math.round(((mustReqs.length - uncoveredMust.length) / mustReqs.length) * 100)
            : 100,
          total_questions: totalQuestions,
          total_flashcards: totalFlashcards,
          role_title: kitData.role?.title || '',
          company_name: kitData.company_brief?.name || '',
        },
      };
    });

    res.json({ kits: enrichedKits });
  } catch (err) {
    next(err);
  }
}

export async function getKitById(req, res, next) {
  try {
    const kit = await Kit.findOne({ _id: req.params.id, user_id: req.user.id }).lean();
    if (!kit) {
      throw new AppError('Kit not found', 404, 'KIT_NOT_FOUND');
    }
    res.json({ kit });
  } catch (err) {
    next(err);
  }
}

export async function updateKit(req, res, next) {
  try {
    const kit = await Kit.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!kit) throw new AppError('Kit not found', 404);

    const { job_description, company_url, days_available } = req.body;
    if (job_description) kit.job_description = job_description;
    if (company_url) kit.company_url = company_url;
    if (days_available) kit.days_available = parseInt(days_available, 10);

    await kit.save();
    res.json({ kit: { id: kit._id, status: kit.status } });
  } catch (err) {
    next(err);
  }
}

export async function deleteKit(req, res, next) {
  try {
    const result = await Kit.deleteOne({ _id: req.params.id, user_id: req.user.id });
    if (result.deletedCount === 0) throw new AppError('Kit not found', 404);
    res.json({ message: 'Kit deleted' });
  } catch (err) {
    next(err);
  }
}
