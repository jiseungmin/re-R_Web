// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  // 연관 컬렉션 참조 (ObjectId 배열)
  PostEvalSession: [{
    type: Schema.Types.ObjectId,
    ref: 'PostEvalSession'
  }],
  EnhancementTraining: [{
    type: Schema.Types.ObjectId,
    ref: 'EnhancementTraining'
  }],
  Healthcheck: [{
    type: Schema.Types.ObjectId,
    ref: 'Healthcheck'
  }],
  // 소속 병원
  Hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  // 기본 정보
  name: {
    type: String,
    required: true,
    trim: true
  },
  ID: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  birth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['남자', '여자', '기타'],
    default: '기타'
  },
  Doctor: {
    type: String,
    trim: true
  },
  // 수술·질환 관련
  has_base_disease: {
    type: Boolean,
    default: false
  },
  had_knee_surgery: {
    type: Boolean,
    default: false
  },
  pre_surgery_rom: {
    type: Number,
    default: null  // 수술 전 가동 범위(°)
  }
}, {
  collection: 'users',
  timestamps: { createdAt: 'registered_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.models.User ||
  mongoose.model('User', UserSchema, 'User');
