import { model, Schema } from "mongoose";

const codeSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      trim: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const backupCodeSchema = new Schema({
  code1: {
    type: codeSchema,
    required: true,
  },
  code2: {
    type: codeSchema,
    required: true,
  },
  code3: {
    type: codeSchema,
    required: true,
  },
  code4: {
    type: codeSchema,
    required: true,
  },
  code5: {
    type: codeSchema,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
});

const BackupCode = model("BackupCode", backupCodeSchema);

export default BackupCode;
