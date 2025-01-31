import mongoose from "mongoose";

export interface CourseType {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  instructor: string;
  lessons: string[];
  totalDuration: number;
  difficulty: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new mongoose.Schema<CourseType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  lessons: {
    type: [String],
    required: true,
  },
  totalDuration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export interface ActiviteitType {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  date: Date;
  location: string;
  max_participants: number;
  participants: mongoose.Schema.Types.ObjectId[];
  created_at?: Date;
  updated_at?: Date;
}

const activiteitSchema = new mongoose.Schema<ActiviteitType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    max_participants: {
      type: Number,
      required: true,
      min: 1,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);


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

export const Activiteit =
  mongoose.models.Activiteit || mongoose.model("Activiteit", activiteitSchema);
export const Signup = mongoose.models.Signup || mongoose.model("Signup", signupSchema);
export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);