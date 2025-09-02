import api_uri from "../constants/getURI.constant";
import errohan from "../utils/errohan.util";

async function loginUser(credentials) {
  return await errohan(`${api_uri}/auth/login`, {
    method: "POST",
    body: { email: credentials.email, password: credentials.password },
    credentials: true,
  });
}

const authAPI = { loginUser };

export default authAPI;
