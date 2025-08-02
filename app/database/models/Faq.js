const mongoose = require('mongoose');
const { Schema } = mongoose;

const FAQSchema = new Schema({
  category: { type: String, required: true, trim: true},
  question: { type: String, required: true, trim: true},
  answer: { type: String, required: true, trim: true}
}, {
  collection: 'FAQ',
  timestamps: true  
});

module.exports = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema, 'FAQ');
