import mongoose from 'mongoose';
const { Schema } = mongoose;

// Weekprogram Schema
const WeekprogramSchema = new Schema({
  User: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  Exercise: [{ type: Schema.Types.ObjectId, ref: 'Exercise', required: true}],
  weekRange: { type: Number, required: true},
  skip_Exercise: [{ type: Schema.Types.ObjectId, ref: 'Exercise', default: []}],
  total_time: { type: Number, required: true}
}, {
  collection: 'Weekprogram',
  timestamps: { createdAt: 'createat', updatedAt: 'updateat' }
});

export default mongoose.models.Weekprogram || mongoose.model('Weekprogram', WeekprogramSchema, 'Weekprogram');
