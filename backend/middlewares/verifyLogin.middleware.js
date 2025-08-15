import User from "../models/user.model.js";
import { verifyLoginToken } from "../utils/verifyTokens.util.js";

async function verifyLogin(req, res, next) {
  const token = req.cookies.notestraker_login_token;
  if (!token) {
    return res.status(401).json({ resStatus: false, error: "Unauthorized" });
  }
  try {
    const decoded = verifyLoginToken(token);
    const { id, email } = decoded;
    const userExist = await User.findById(id);
    if (!userExist || !userExist.isVerified)
      return res.status(401).json({ resStatus: false, error: "Unauthorized" });
    req.user = { id, email, username: userExist.username };
    next();
  } catch (error) {
    return res.status(401).json({ resStatus: false, error: "Unauthorized" });
  }
}

export default verifyLogin;
