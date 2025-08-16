import crypto from "crypto";

const encryptionKey = process.env.ENCRYPTION_KEY;

const ALGO = "aes-256-gcm";
const key = Buffer.from(encryptionKey, "hex");

export function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("hex"),
    data: encrypted.toString("hex"),
    tag: tag.toString("hex"),
  };
}

export function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(
    ALGO,
    key,
    Buffer.from(encrypted.iv, "hex"),
  );
  decipher.setAuthTag(Buffer.from(encrypted.tag, "hex"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.data, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
