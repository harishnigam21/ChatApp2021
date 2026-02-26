import mongoose from "mongoose";
const messageSchema = mongoose.Schema(
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
    message: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
export default mongoose.model("messages", messageSchema);
