import { model, Schema } from "mongoose";

const twoFASchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "user",
  },
  secret: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "verified"],
  },
});

const TwoFA = model("twofa", twoFASchema);

export default TwoFA;
