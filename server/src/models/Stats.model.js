import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    value: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model("Stats", statsSchema);
