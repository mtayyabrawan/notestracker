import api_uri from "../constants/getURI.constant";
import errohan from "../utils/errohan.util";

import type { LoginSchema } from "../schemas/loginSchema";
import type { ForgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import type { ResetPasswordSchema } from "../schemas/resetPasswordSchema";
import type { RegisterSchema } from "../schemas/registerSchema";
import type { ChangePasswordSchema } from "../schemas/changePasswordSchema";

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

async function registerUser(data: RegisterSchema) {
  return await errohan(`${api_uri}/auth/register`, {
    method: "POST",
    body: data,
    credentials: true,
  });
}

async function verifyEmail(token: string) {
  return await errohan(`${api_uri}/auth/verify-email/${token}`, {
    method: "GET",
    credentials: true,
  });
}

async function changePassword(data: ChangePasswordSchema) {
  return errohan(`${api_uri}/auth/change-password`, {
    method: "POST",
    body: { oldPassword: data.password, newPassword: data.newPassword },
    credentials: true,
  });
}

const authAPI = {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
};

export default authAPI;
