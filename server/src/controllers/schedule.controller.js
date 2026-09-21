import Kit from '../models/Kit.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getSchedule(req, res, next) {
  try {
    const kit = await Kit.findOne({ _id: req.params.id, user_id: req.user.id }).lean();
    if (!kit) throw new AppError('Kit not found', 404);
    if (!kit.kit_data?.schedule) {
      return res.json({ schedule: [], days_available: kit.days_available });
    }

    res.json({
      days_available: kit.days_available,
      schedule: kit.kit_data.schedule,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateSchedule(req, res, next) {
  try {
    const { schedule } = req.body;
    if (!Array.isArray(schedule)) {
      throw new AppError('Schedule must be an array of day objects', 400);
    }

    const kit = await Kit.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!kit) throw new AppError('Kit not found', 404);
    if (!kit.kit_data) throw new AppError('Kit has no data yet', 400);

    kit.kit_data.schedule = schedule;
    kit.markModified('kit_data');
    await kit.save();

    res.json({ message: 'Schedule updated', schedule: kit.kit_data.schedule });
  } catch (err) {
    next(err);
  }
}
