import User from "../models/user.model.js";
import { verify2FALoginToken } from "../utils/verifyTokens.util.js";

async function verifyTempLogin(req, res, next) {
  const token = req.cookies.notestraker_2fa_login_token;
  if (!token) {
    return res.status(401).json({ resStatus: false, error: "Unauthorized" });
  }
  try {
    const decoded = verify2FALoginToken(token);
    if (!decoded || decoded instanceof Error) {
      return res.status(401).json({ resStatus: false, error: "Unauthorized" });
    }
    const { id } = decoded;
    const userExist = await User.findById(id);
    if (!userExist || !userExist.isVerified)
      return res.status(401).json({ resStatus: false, error: "Unauthorized" });
    req.user = { id };
    next();
  } catch (error) {
    return res.status(401).json({ resStatus: false, error: "Unauthorized" });
  }
}

export default verifyTempLogin;
