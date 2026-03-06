import mongoose from "mongoose";

const RequestSchema = mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },
    type: {
      type: String,
      enum: ["message", "connection"],
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("requests", RequestSchema);
