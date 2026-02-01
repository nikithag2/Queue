import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    category: { type: String, default: "General" },

    status: {
      type: String,
      enum: ["pending", "claimed", "resolved"],
      default: "pending",
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    claimedAt: { type: Date, default: null },
    resolvedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
