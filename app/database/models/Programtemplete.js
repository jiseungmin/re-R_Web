// models/Programtemplete.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProgramtempleteSchema = new Schema(
  {
    weekRange:   { type: [Number], required: true },  
    Exercise:    [{ type: Schema.Types.ObjectId, ref: 'Exercise', required: true }],
    total_time:  { type: Number, required: true, default: 0 }
  },
  {
    collection: 'Programtemplete',
    timestamps: { createdAt: 'createat', updatedAt: 'updateat' }
  }
);

export default mongoose.models.Programtemplete || mongoose.model('Programtemplete', ProgramtempleteSchema, 'Programtemplete');
