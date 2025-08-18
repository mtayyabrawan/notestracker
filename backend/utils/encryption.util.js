import crypto from "crypto";

const encryptionKey = process.env.ENCRYPTION_KEY;
const noteEncryptionKey = process.env.NOTE_ENCRYPTION_KEY;

const ALGO = "aes-256-gcm";
const key = Buffer.from(encryptionKey, "hex");
const noteKey = Buffer.from(noteEncryptionKey, "hex");

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

export function encryptNote(title, content, noteTag) {
  function encryptField(field) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGO, noteKey, iv);
    const encrypted = Buffer.concat([
      cipher.update(field, "utf8"),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    return {
      iv: iv.toString("hex"),
      data: encrypted.toString("hex"),
      tag: tag.toString("hex"),
    };
  }
  return {
    title: encryptField(title),
    content: encryptField(content),
    tag: encryptField(noteTag),
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

export function decryptNote(title, content, tag) {
  const decipherTitle = crypto.createDecipheriv(
    ALGO,
    noteKey,
    Buffer.from(title.iv, "hex"),
  );
  decipherTitle.setAuthTag(Buffer.from(title.tag, "hex"));
  const decryptedTitle = Buffer.concat([
    decipherTitle.update(Buffer.from(title.data, "hex")),
    decipherTitle.final(),
  ]);
  const decipherContent = crypto.createDecipheriv(
    ALGO,
    noteKey,
    Buffer.from(content.iv, "hex"),
  );
  decipherContent.setAuthTag(Buffer.from(content.tag, "hex"));
  const decryptedContent = Buffer.concat([
    decipherContent.update(Buffer.from(content.data, "hex")),
    decipherContent.final(),
  ]);
  const decipherTag = crypto.createDecipheriv(
    ALGO,
    noteKey,
    Buffer.from(tag.iv, "hex"),
  );
  decipherTag.setAuthTag(Buffer.from(tag.tag, "hex"));
  const decryptedTag = Buffer.concat([
    decipherTag.update(Buffer.from(tag.data, "hex")),
    decipherTag.final(),
  ]);
  return {
    title: decryptedTitle.toString("utf8"),
    content: decryptedContent.toString("utf8"),
    tag: decryptedTag.toString("utf8"),
  };
}

export function decryptNotes(notes) {
  const decryptedNotes = [];
  for (const note of notes) {
    decryptedNotes.push({
      _id: note._id,
      ...decryptNote(note.title, note.content, note.tag),
      date: note.date,
    });
  }
  return decryptedNotes;
}
