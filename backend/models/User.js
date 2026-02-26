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
    bio: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      select: false,
      default: "Newly Registered User",
    },
  },
  { timestamps: true },
);
export default mongoose.model("users", userSchema);
