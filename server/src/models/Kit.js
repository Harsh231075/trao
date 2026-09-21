import mongoose from 'mongoose';

const KIT_STATUSES = [
  'queued',
  'researching',
  'extracting',
  'generating',
  'checking_coverage',
  'building_schedule',
  'completed',
  'partial',
  'failed',
];

const kitSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  company_url: {
    type: String,
    required: true,
  },
  days_available: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: KIT_STATUSES,
    default: 'queued',
  },
  kit_data: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  error_message: {
    type: String,
    default: null,
  },
  coverage_passes: {
    type: Number,
    default: 0,
  },
  fingerprint: {
    type: String,
    index: true,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

kitSchema.index({ user_id: 1, created_at: -1 });
kitSchema.index({ fingerprint: 1, status: 1 });

const Kit = mongoose.model('Kit', kitSchema);
export { KIT_STATUSES };
export default Kit;
