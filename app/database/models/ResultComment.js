const mongoose = require('mongoose');

const ResultCommentSchema = new mongoose.Schema({
  defaultMessage: { type: String, required: true},
  angleMessages: {
    notAchieved: { type: String, required: true},
    achieving: { type: String, required: true},
    achieved: { type: String, required: true}
  },
  limitedExerciseMessage: { type: String, required: true},
  weeklyMessages: {
    week1: { type: String, required: true},
    week2to4: { type: String, required: true},
    week4to6: {
      restingPainUnder5: { type: String, required: true},
      movementPainOver3days: { type: String, required: true},
      painCountUnder5: { type: String, required: true},
      painCountOver5: { type: String, required: true}
    },
    week6: {
      movementPainOver3days: { type: String, required: true },
      movementPain0to2days:  { type: String, required: true }
    }
  },
  fearMessages: {
    high:   { type: String, required: true },
    medium: { type: String, required: true },
    low:    { type: String, required: true }
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.ResultComment || mongoose.model('ResultComment', ResultCommentSchema, 'ResultComment');

