import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,}],
  password: { type: String, required: true },
  name:     { type: String, required: true },
  address:  { type: String, required: true },
  phone:    { type: String, required: true },
  doctors:  { type: [String], default: [] },
  otp_secret: { type: String, required: true },
  otpauth_url: { type: String, required: true },
  createat: { type: Date, default: Date.now },
  updateat: { type: Date, default: Date.now },
});

HospitalSchema.pre('save', function (next) {
  this.updateat = new Date();
  next();
});

export default mongoose.models.Hospital || mongoose.model('Hospital', HospitalSchema, 'Hospital');
