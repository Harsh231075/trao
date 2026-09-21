import mongoose from 'mongoose';

const practiceSessionSchema = new mongoose.Schema({
  kit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kit',
    required: true,
    index: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flashcard_id: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
}, {
  timestamps: { createdAt: 'practiced_at' },
});

practiceSessionSchema.index({ kit_id: 1, flashcard_id: 1 });
practiceSessionSchema.index({ user_id: 1, kit_id: 1 });

const PracticeSession = mongoose.model('PracticeSession', practiceSessionSchema);
export default PracticeSession;
