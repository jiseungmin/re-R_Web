const mongoose = require('mongoose');
const { Schema } = mongoose;

// 기기 사용 시 컨텐츠 스키마
const DeviceUsageSchema = new Schema({
  stage: { type: Number, required: true, min: 1},
  angleRange: {type: String, required: true, trim: true},
  comment: { type: String, required: true, trim: true}
}, { _id: false });

// 기기 미사용 시 컨텐츠 스키마
const NoDeviceSchema = new Schema({
  comment: { type: String, required: true, trim: true}
}, { _id: false });

// 최종 Encouragement 스키마
const EncouragementSchema = new Schema({
  deviceUsage: { type: [DeviceUsageSchema], default: []},
  noDevice: { type: [NoDeviceSchema], default: []}
}, {
  collection: 'Encouragement',
  timestamps: true
});

module.exports = mongoose.models.Encouragement || mongoose.model('Encouragement', EncouragementSchema, 'Encouragement');
