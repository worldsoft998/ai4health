import mongoose from 'mongoose';

const ActiveComplaintSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  answers: { type: Object, required: true }
});

export default mongoose.models.ActiveComplaint || mongoose.model('ActiveComplaint', ActiveComplaintSchema);
