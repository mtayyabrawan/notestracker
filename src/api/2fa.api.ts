import api_uri from "../constants/getURI.constant";
import errohan from "../utils/errohan.util";

async function verifyOTP(otpCode: string) {
  return await errohan(`${api_uri}/2fa/verify-otp`, {
    method: "POST",
    body: { otpCode: parseInt(otpCode) },
    credentials: true,
  });
}

const twofaAPI = { verifyOTP };

export default twofaAPI;
