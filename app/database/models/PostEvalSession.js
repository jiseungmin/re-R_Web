import mongoose from 'mongoose';
const { Schema } = mongoose;

// Paint Test Subdocument Schema
const PaintTestSchema = new Schema({
  title: { type: String, required: true },
  score: { type: String, required: true }
}, { _id: false });

// Heat Test Subdocument Schema
const HeatTestSchema = new Schema({
  title: { type: String, default: ''},
  score: { type: String, default: '' }
}, { _id: false });

// Swell Test Subdocument Schema
const SwellTestSchema = new Schema({
  title: { type: String, default: ''},
  score: { type: String, default: ''}
}, { _id: false });

// Abnormal Signs Subdocument Schema
const AbnormalSignsSchema = new Schema({
  questions: { type: [String], default: [] },
  selected:  { type: [String], default: [] }
}, { _id: false });

// Survey Entry Schema
const SurveySchema = new Schema({
  round:          { type: Number, required: true },       
  paintest:       { type: PaintTestSchema, required: true },
  heatTest:       { type: HeatTestSchema,   default: {} },
  swellTest:      { type: SwellTestSchema,  default: {} },
  abnormalSigns:  { type: AbnormalSignsSchema, default: {} }
}, { _id: false });

// Post Evaluation Session Main Schema
const PostEvalSessionSchema = new Schema({
  User:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
  Weekprogram: { type: Schema.Types.ObjectId, ref: 'Weekprogram', required: true },
  survey:      { type: [SurveySchema], default: [] }
}, {
  collection: 'PostEvalSession',
  timestamps: { createdAt: 'createat', updatedAt: 'updateat' }
});

PostEvalSessionSchema.index(
  { User: 1, createat: 1 },
  { name: 'idx_user_createat' }
);

export default mongoose.models.PostEvalSession || mongoose.model('PostEvalSession', PostEvalSessionSchema, 'PostEvalSession');
