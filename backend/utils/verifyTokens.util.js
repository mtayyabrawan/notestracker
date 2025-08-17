import jwt from "jsonwebtoken";

const jwtValidationSecret = process.env.JWT_VALIDATION_SECRET;
const jwtLoginSecret = process.env.JWT_LOGIN_SECRET;
const jwtResetSecret = process.env.JWT_RESET_SECRET;

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

export function verifyLoginToken(token) {
  try {
    return jwt.verify(token, jwtLoginSecret);
  } catch (error) {
    return new Error({
      resStatus: false,
      error: "Invalid or expired token",
      message: error.message,
    });
  }
}

export function verifyResetToken(token) {
  try {
    return jwt.verify(token, jwtResetSecret);
  } catch (error) {
    return new Error({
      resStatus: false,
      error: "Invalid or expired token",
      message: error.message,
    });
  }
}
