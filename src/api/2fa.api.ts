import api_uri from "../constants/getURI.constant";
import errohan from "../utils/errohan.util";

import type { ResetPasswordSchema } from "../schemas/resetPasswordSchema";

async function verifyOTP(otpCode: string) {
  return await errohan(`${api_uri}/2fa/verify-otp`, {
    method: "POST",
    body: { otpCode: parseInt(otpCode) },
    credentials: true,
  });
}

async function verify2FA(otpCode: string) {
  return await errohan(`${api_uri}/2fa/verify-2fa`, {
    method: "POST",
    body: { otpCode: parseInt(otpCode) },
    credentials: true,
  });
}

async function enable2FA(data: ResetPasswordSchema) {
  return await errohan(`${api_uri}/2fa/enable`, {
    method: "POST",
    body: { password: data.password },
    credentials: true,
  });
}

async function disable2FA(data: ResetPasswordSchema) {
  return await errohan(`${api_uri}/2fa/disable`, {
    method: "POST",
    body: { password: data.password },
    credentials: true,
  });
}

const twofaAPI = { verifyOTP, verify2FA, enable2FA, disable2FA };

export default twofaAPI;
