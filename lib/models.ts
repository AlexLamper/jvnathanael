import mongoose from "mongoose";

// Activiteit Schema
export interface ActiviteitType {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description?: string;
  date: Date;
  location: string;
  max_participants: number;
  created_at: Date;
  updated_at: Date;
}

const activiteitSchema = new mongoose.Schema<ActiviteitType>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  max_participants: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// User Sign-ups Schema
export interface SignupType {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  activiteit: mongoose.Schema.Types.ObjectId;
  created_at: Date;
}

const signupSchema = new mongoose.Schema<SignupType>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activiteit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activiteit",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Export models
export const Activiteit = mongoose.models.Activiteit || mongoose.model("Activiteit", activiteitSchema);
export const Signup = mongoose.models.Signup || mongoose.model("Signup", signupSchema);
