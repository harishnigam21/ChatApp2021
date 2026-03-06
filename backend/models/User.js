import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    pic: {
      type: String,
      default: null,
    },
    banner: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: "Hey, I am using ChatFlow.",
    },
    lastOnline: {
      type: Date,
      default: Date.now,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: [],
        required: true,
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: [],
        required: true,
      },
    ],
    refreshToken: {
      type: String,
      select: false,
      default: "Newly Registered User",
    },
  },
  { timestamps: true },
);
export default mongoose.model("users", userSchema);
