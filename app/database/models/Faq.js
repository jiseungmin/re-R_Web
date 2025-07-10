// models/FAQ.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const FAQSchema = new Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  }
}, {
  collection: 'FAQ',
  timestamps: true  // createdAt, updatedAt 자동 생성
});

module.exports = mongoose.models.FAQ ||
  mongoose.model('FAQ', FAQSchema, 'FAQ');
