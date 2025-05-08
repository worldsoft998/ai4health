import mongoose from 'mongoose';

const HealthHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  personalHistory: {
    type: [String],
    required: true
  },
  familyHistory: {
    type: [String],
    required: true
  },
  medicalHistory: {
    type: [String],
    required: true
  },
  allergies: {
    type: [{ allergy: String, duration: String }],
    required: true
  }
});

export default mongoose.models.HealthHistory || mongoose.model('HealthHistory', HealthHistorySchema);
