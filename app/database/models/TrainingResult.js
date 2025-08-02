import mongoose from 'mongoose';
const { Schema } = mongoose;

const TrainingResultSchema = new Schema({
  User: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opweek: { type: Number, required: true },           // 운영 주차
  day: { type: Number, required: true },              // 일차
  session: { type: Number, required: true },          // 세션
  maxspeed: { type: Number, required: true },         // 최대 속도
  activetime: { type: Number, required: true },       // 활동 시간
  repeatcount: { type: Number, required: true },      // 반복 횟수
  maxangle: { type: Number, required: true },         // 최대 각도
  validrepeatcount: { type: Number, required: true }, // 유효 반복 횟수
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'TrainingResult',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// 인덱스 설정: opweek + day + session으로 조회 효율화
TrainingResultSchema.index(
  { opweek: 1, day: 1, session: 1 },
  { name: 'idx_opweek_day_session' }
);

// 생성 시간 기준 정렬 인덱스
TrainingResultSchema.index(
  { createdAt: -1 },
  { name: 'idx_createdAt_desc' }
);

export default mongoose.models.TrainingResult || mongoose.model('TrainingResult', TrainingResultSchema, 'TrainingResult'); 
