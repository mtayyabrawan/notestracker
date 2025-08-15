import { model, Schema } from "mongoose";

const twoFASchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "user",
  },
  secret: {
    type: String,
    required: function () {
      if (this.status === "verified") return true;
      return false;
    },
  },
  tempSecret: {
    type: String,
    required: function () {
      if (this.status === "pending") return true;
      return false;
    },
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
