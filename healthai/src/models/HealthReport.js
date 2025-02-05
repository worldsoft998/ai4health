import mongoose from 'mongoose';

const HealthReportSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  reportType: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  },
  imageType: {
    type: String,
    required: true
  }
});

export default mongoose.models.HealthReport || mongoose.model('HealthReport', HealthReportSchema);
