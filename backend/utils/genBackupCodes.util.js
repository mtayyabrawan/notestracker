import crypto from "crypto";
import bcrypt from "bcryptjs";

function generateBackupCodes() {
  const backupCodes = [];
  const hashedBackupCodes = [];
  for (let i = 0; i < 5; i++) {
    const code = crypto.randomBytes(8).toString("hex");
    backupCodes.push(code);
    hashedBackupCodes.push(bcrypt.hashSync(code, bcrypt.genSaltSync(10)));
  }
  return { backupCodes, hashedBackupCodes };
}

export default generateBackupCodes;
