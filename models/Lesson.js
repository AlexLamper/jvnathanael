import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    duration: { type: Number, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema);