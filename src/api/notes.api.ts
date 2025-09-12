import api_uri from "../constants/getURI.constant";
import errohan from "../utils/errohan.util";

async function getNotes() {
  return errohan(`${api_uri}/notes/all`, {
    method: "GET",
    credentials: true,
  });
}

const notesAPI = { getNotes };

export default notesAPI;
