import bcrypt from "bcryptjs";

function compareBackupCode(backupCode, bcHashes) {
  for (let i = 0; i < 5; i++) {
    if (
      bcrypt.compareSync(`${backupCode}`, bcHashes[i].hash) &&
      !bcHashes[i].used
    ) {
      return { code: i + 1, matched: true };
    }
  }
  return { code: 0, matched: false };
}

export default compareBackupCode;
