import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    birthdate: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      required: true,
      trim: true,
      default:
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg",
    },
    twoFA: {
      type: String,
      enum: ["disabled", "enabled", "pending"],
      required: true,
      default: "disabled",
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
