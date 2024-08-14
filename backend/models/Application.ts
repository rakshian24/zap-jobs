import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema(
  {
    freelancer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    appliedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
