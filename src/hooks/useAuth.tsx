import { useContext } from "react";
import AuthContext from "../store/contexts/AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
