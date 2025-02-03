import mongoose from 'mongoose';

const ActiviteitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    max_participants: { type: Number, required: true },
    participants: [{ type: String, required: true }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Activiteit || mongoose.model('Activiteit', ActiviteitSchema);