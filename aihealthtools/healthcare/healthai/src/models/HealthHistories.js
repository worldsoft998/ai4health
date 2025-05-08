import mongoose from 'mongoose';

const HealthHistoriesSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // Define other fields as per your schema
});

export default mongoose.models.HealthHistories || mongoose.model('HealthHistories', HealthHistoriesSchema);
