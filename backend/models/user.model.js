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
