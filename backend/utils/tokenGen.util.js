import jwt from "jsonwebtoken";

const jwtValidationSecret = process.env.JWT_VALIDATION_SECRET;

export function genVerificationToken(userId) {
  try {
    return jwt.sign({ id: userId }, jwtValidationSecret, { expiresIn: "1d" });
  } catch (error) {
    return new Error({
      resStatus: false,
      error: "Server error found",
      message: error.message,
    });
  }
}
