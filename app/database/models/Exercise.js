import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProcedureSchema = new Schema({
  id:           { type: Number, required: true },
  header_name:  { type: String, required: true },
  running_time: { type: Number, required: true }
}, { _id: false });

const ExerciseSchema = new Schema({
  title:        { type: String, required: true },
  description:  { type: [String], required: true }, 
  procedure:    { type: [ProcedureSchema], required: true },
  videoUrl:     { type: String, default: '' },
  totla_time:   { type: String, required: true },
  restBetweenSets:    { type: Number, required: true },
  repsPerSet:         { type: Number, required: true },
  totalSets:          { type: Number, required: true }
}, {
  collection: 'Exercise',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export default mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema, 'Exercise');
