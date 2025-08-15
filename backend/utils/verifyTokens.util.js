import jwt from "jsonwebtoken";

const jwtValidationSecret = process.env.JWT_VALIDATION_SECRET;

export function verifyValidationToken(token) {
  try {
    return jwt.verify(token, jwtValidationSecret);
  } catch (error) {
    return new Error({
      resStatus: false,
      error: "Invalid or expired token",
      message: error.message,
    });
  }
}
