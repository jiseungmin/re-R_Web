import mongoose from 'mongoose';
const { Schema } = mongoose;

// Angle 세부 스키마 (기존과 동일)
const AngleSchema = new Schema({
  rowdata:    { type: [Number], default: [] },
  event_time: { type: [Date],   default: [] }
}, { _id: false });

// 하루치 세션 하나를 담을 서브스키마
const SessionSchema = new Schema({
  top_speed:       { type: Number, required: true },
  time:            { type: Number, required: true },
  repetition:      { type: Number, required: true },
  max_angle:       { type: Number, required: true },
  valid_repetition:{ type: Number, required: true },
  angle:           { type: AngleSchema, required: true },
  target_angle:    { type: Number, required: true },
  createdAt:       { type: Date, default: Date.now }
}, { _id: false });

// EnhancementTraining Main Schema
const EnhancementTrainingSchema = new Schema({
  User:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sessions: { type: [SessionSchema], default: [] }
}, {
  collection: 'EnhancementTraining',
  timestamps: { createdAt: 'createat', updatedAt: 'updateat' }
});

export default mongoose.models.EnhancementTraining || mongoose.model('EnhancementTraining', EnhancementTrainingSchema, 'EnhancementTraining');
