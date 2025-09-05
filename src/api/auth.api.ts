import api_uri from "../constants/getURI.constant";
import errohan from "../utils/errohan.util";

import type { LoginSchema } from "../schemas/loginSchema";
import type { ForgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import type { ResetPasswordSchema } from "../schemas/resetPasswordSchema";

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

async function resetPassword(data: ResetPasswordSchema, resetToken: string) {
  return await errohan(`${api_uri}/auth/reset-password/${resetToken}`, {
    method: "POST",
    body: { password: data.password },
    credentials: true,
  });
}

const authAPI = { loginUser, forgotPassword, resetPassword };

export default authAPI;
