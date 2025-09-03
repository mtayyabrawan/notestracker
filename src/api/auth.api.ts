import api_uri from "../constants/getURI.constant";
import errohan from "../utils/errohan.util";
import type { LoginSchema } from "../schemas/loginSchema";

async function loginUser(credentials: LoginSchema) {
  return await errohan(`${api_uri}/auth/login`, {
    method: "POST",
    body: { email: credentials.email, password: credentials.password },
    credentials: true,
  });
}

const authAPI = { loginUser };

export default authAPI;
