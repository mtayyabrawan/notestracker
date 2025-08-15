import jwt from "jsonwebtoken";

const jwtValidationSecret = process.env.JWT_VALIDATION_SECRET;
const jwtLoginSecret = process.env.JWT_LOGIN_SECRET;

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

export function genLoginToken(userId, email) {
  try {
    return jwt.sign({ id: userId, email: email }, jwtLoginSecret);
  } catch (error) {
    return new Error({
      resStatus: false,
      error: "Server error found",
      message: error.message,
    });
  }
}
