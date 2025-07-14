// models/HealthCheck.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

// sub-schema
const PaintTestSchema = new Schema({
  section:{ type: String, required: true },
  title: { type: String, required: true },
  score: { type: Number, required: true }
}, { _id: false });

const SurveySchema = new Schema({
  paintest: { type: [PaintTestSchema], default: [] },
  feartest: { type: String, required: true },
  max_angle: { type: Number, required: true }  
}, { _id: false });

const HealthCheckSchema = new Schema({
  User:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
  survey: { type: [SurveySchema], default: [] } 
}, {
  collection: 'Healthcheck',
  timestamps: { createdAt: 'createat', updatedAt: 'updateat' }
});

export default mongoose.models.HealthCheck
  || mongoose.model('HealthCheck', HealthCheckSchema, 'HealthCheck');
