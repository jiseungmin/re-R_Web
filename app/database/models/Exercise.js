import mongoose from 'mongoose';
const { Schema } = mongoose;

// Description Subdocument Schema
typeof DescriptionSchema;
const DescriptionSchema = new Schema({
  label:   { type: String, required: true },
  content: { type: String, required: true }
}, { _id: false });

// Procedure Subdocument Schema
const ProcedureSchema = new Schema({
  id:           { type: Number, required: true },
  header_name:  { type: String, required: true },
  running_time: { type: Number, required: true }
}, { _id: false });

// Exercise Main Schema
const ExerciseSchema = new Schema({
  title:        { type: String, required: true },
  description:  { type: DescriptionSchema, required: true },
  procedure:    { type: ProcedureSchema,   required: true },
  videoUrl:     { type: String, default: '' },
  totla_time:   { type: String, required: true },
  rest_time:    { type: Number, required: true },
  reps:         { type: Number, required: true },
  set:          { type: Number, required: true }
}, {
  collection: 'Exercise',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export default mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema, 'Exercise');
