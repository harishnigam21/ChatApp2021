import mongoose from "mongoose";

const followSchema = mongoose.Schema(
  {
    follower_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    following_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("follows", followSchema);
