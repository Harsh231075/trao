import Kit from '../models/Kit.js';
import { runPipeline } from '../services/pipeline/orchestrator.js';
import { regenerateSection as regenService } from '../services/regeneration.service.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getStatus(req, res, next) {
  try {
    const kit = await Kit.findOne({ _id: req.params.id, user_id: req.user.id })
      .select('status error_message coverage_passes created_at updated_at')
      .lean();
    if (!kit) throw new AppError('Kit not found', 404);

    res.json({
      id: kit._id,
      status: kit.status,
      error: kit.error_message,
      coverage_passes: kit.coverage_passes,
      created_at: kit.created_at,
      updated_at: kit.updated_at,
    });
  } catch (err) {
    next(err);
  }
}

export async function restartGeneration(req, res, next) {
  try {
    const kit = await Kit.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!kit) throw new AppError('Kit not found', 404);

    const runningStatuses = ['researching', 'extracting', 'generating', 'checking_coverage', 'building_schedule'];
    if (runningStatuses.includes(kit.status)) {
      return res.status(409).json({
        error: 'Pipeline is already running',
        code: 'PIPELINE_RUNNING',
        status: kit.status,
      });
    }

    kit.status = 'queued';
    kit.error_message = null;
    await kit.save();

    res.json({ message: 'Generation pipeline restarted', status: 'queued' });

    runPipeline(
      { jd: kit.job_description, company_url: kit.company_url, days_available: kit.days_available },
      kit._id.toString()
    ).catch(err => console.error(`[Kit ${kit._id}] Pipeline restart error:`, err.message));

  } catch (err) {
    next(err);
  }
}

export async function regenerateSection(req, res, next) {
  try {
    const { section } = req.body;
    const validSections = ['company_brief', 'technical', 'behavioural', 'system_design', 'company_fit', 'flashcards', 'schedule'];
    if (!validSections.includes(section)) {
      throw new AppError(`Invalid section. Must be one of: ${validSections.join(', ')}`, 400);
    }

    const kit = await Kit.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!kit) throw new AppError('Kit not found', 404);
    if (!kit.kit_data) throw new AppError('Kit has no generated data yet', 400);

    const updatedKitData = await regenService(kit, section);

    res.json({ message: `Section "${section}" regenerated`, kit: updatedKitData });
  } catch (err) {
    next(err);
  }
}
