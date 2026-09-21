import mongoose from 'mongoose';

const userEditSchema = new mongoose.Schema({
  kit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kit',
    required: true,
    index: true,
  },
  content_type: {
    type: String,
    required: true,
    enum: ['question', 'flashcard', 'company_brief', 'answer_outline'],
  },
  content_id: {
    type: String,
    required: true,
  },
}, {
  timestamps: { createdAt: 'created_at' },
});

userEditSchema.index({ kit_id: 1, content_type: 1, content_id: 1 }, { unique: true });

const UserEdit = mongoose.model('UserEdit', userEditSchema);
export default UserEdit;
