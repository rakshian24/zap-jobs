import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required!"],
      maxLength: [500, "Job title is exceeding max limit(500)"],
    },
    description: {
      type: String,
      required: [true, "Job description is required!"],
      maxLength: [16000, "Job title is exceeding max limit(16000)"],
    },
    requirements: [String],
    tags: [String],
    companyName: {
      type: String,
      required: [true, "Company name is required!"],
    },
    contactInfo: {
      type: String,
      required: [true, "Contact Info is required!"],
    },
    salaryPerHour: Number,
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", JobSchema);

export default Job;
