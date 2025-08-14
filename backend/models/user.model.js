import { model, Schema } from "mongoose";

const tfaSchema = new Schema(
  {
    enabled: {
      type: Boolean,
      default: false,
    },
    tfaSecret: {
      status: {
        type: String,
        enum: ["pending", "verified"],
        default: "pending",
      },
      secretKey: {
        type: String,
        required: function () {
          return this.enabled && this.tfaSecret.status === "verified";
        },
        trim: true,
      },
    },
  },
  { _id: false },
);

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
    two_factor_authentication: tfaSchema,
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
