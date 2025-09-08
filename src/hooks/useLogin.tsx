import { useEffect, useState } from "react";
import authAPI from "../api/auth.api";

function useLogin() {
  const [loggedIn, setLoggedIn] = useState({
    isLoggedIn: "pending",
    userData: {},
  });
  useEffect(() => {
    authAPI.getLogin().then((res) => {
      if (!res.resStatus) {
        setLoggedIn({ isLoggedIn: "no", userData: {} });
        return;
      }
      setLoggedIn({ isLoggedIn: "yes", userData: res.userData });
    });
  }, []);
  return loggedIn;
}

export default useLogin;
