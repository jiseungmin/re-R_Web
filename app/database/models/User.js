// models/User.js
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  password:       { type: String, required: true },
  birth:          { type: String, required: true },
  phone:          { type: String, required: true },
  gender:         { type: String, required: true },
  hospital:       { type: String },
  hasComorbidity: { type: Boolean, default: false },
  surgeryDate:    { type: Date, default: null },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
