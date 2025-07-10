// models/Post.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  doctor: { type: String, required: true, trim: true},
  question: { type: String, required: true, trim: true},
  answer: { type: String, required: true, trim: true, default: ''},
  status: { type: Boolean, required: true, default: false}
}, {
  collection: 'Post',
  timestamps: true    
});

module.exports = mongoose.models.Post ||
  mongoose.model('Post', PostySchema, 'Post');
