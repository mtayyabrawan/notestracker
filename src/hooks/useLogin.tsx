/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import authAPI from "../api/auth.api";

function useLogin() {
  const [loggedIn, setLoggedIn] = useState<{
    isLoggedIn: string;
    userData: {
      name: string;
      username: string;
      email: string;
      isVerified: boolean;
      gender: string;
      birthdate: string;
      twoFA: string;
      createdAt: string;
      updatedAt: string;
      profilePicture: string;
    };
  }>({
    isLoggedIn: "pending",
    userData: {
      name: "",
      username: "",
      email: "",
      isVerified: false,
      gender: "",
      birthdate: "",
      twoFA: "",
      createdAt: "",
      updatedAt: "",
      profilePicture: "",
    },
  });

  useEffect(() => {
    authAPI.getLogin().then((res) => {
      if (!res.resStatus) {
        setLoggedIn({ ...loggedIn, isLoggedIn: "no" });
        return;
      }
      setLoggedIn({ isLoggedIn: "yes", userData: res.userData });
    });
  }, []);
  return loggedIn;
}

export default useLogin;
