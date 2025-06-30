import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: Number, required: true },
  notes: { type: String },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }, // reference to Agent
}, { timestamps: true });

export const Lead = mongoose.model('Lead', leadSchema);

