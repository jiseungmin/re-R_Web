// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  PostEvalSession: [{ type: Schema.Types.ObjectId, ref: 'PostEvalSession', required: true}],
  EnhancementTraining: [{ type: Schema.Types.ObjectId, ref: 'EnhancementTraining', required: true}],
  HealthCheck: [{ type: Schema.Types.ObjectId, ref: 'HealthCheck', required: true}],
  Hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true},
  name: { type: String, required: true },
  ID: { type: String, required: true},
  password: { type: String,  required: true},
  phone: { type: String, required: true, match: /^[0-9]{10,11}$/},
  birth: { type: String, required: true},
  gender: { type: String, required: true },
  Doctor: { type: String, required: true},
  has_base_disease: { type: String, default: null },
  had_knee_surgery: { type: String, default: null },
  pre_surgery_rom: { type: String, default: null },
  surgery_date: { type: Date, default: null },
  updated_at: { type: Date, default: Date.now},
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema, 'User');
