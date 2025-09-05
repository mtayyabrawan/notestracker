import api_uri from "../constants/getURI.constant";
import errohan from "../utils/errohan.util";

import type { LoginSchema } from "../schemas/loginSchema";
import type { ForgotPasswordSchema } from "../schemas/forgotPasswordSchema";

async function loginUser(credentials: LoginSchema) {
  return await errohan(`${api_uri}/auth/login`, {
    method: "POST",
    body: { email: credentials.email, password: credentials.password },
    credentials: true,
  });
}

async function forgotPassword(data: ForgotPasswordSchema) {
  return await errohan(`${api_uri}/auth/forgot-password`, {
    method: "POST",
    body: { email: data.email },
    credentials: true,
  });
}

const authAPI = { loginUser, forgotPassword };

export default authAPI;
