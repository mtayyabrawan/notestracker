import React, { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import authAPI from "../../api/auth.api";

function AuthProvider({ children }: { children: React.ReactNode }) {
  type LoginStatus = "pending" | "true" | "false";

  type UserData = {
    name?: string;
    username?: string;
    email?: string;
    isVerified?: boolean;
    gender?: string;
    birthdate?: string;
    twoFA?: string;
    createdAt?: string;
    updatedAt?: string;
    profilePicture?: string;
  };

  const [isLoggedIn, setLoggedIn] = useState<LoginStatus>("pending");

  const [userData, setUserData] = useState<UserData>({
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
  });

  function updateLogin(status: LoginStatus) {
    setLoggedIn(status);
  }

  function updateUser(data: UserData) {
    setUserData((prev) => ({ ...prev, ...data }));
  }

  async function fetchUser() {
    const res = await authAPI.getLogin();
    if (!res.resStatus) {
      setLoggedIn("false");
      return;
    }
    setLoggedIn("true");
    setUserData(res.userData);
    return;
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, updateLogin, updateUser, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
