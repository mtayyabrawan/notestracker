import { createContext } from "react";

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

const AuthContext = createContext<{
  isLoggedIn: LoginStatus;
  userData: UserData;
  updateLogin: (status: LoginStatus) => void;
  updateUser: (data: UserData) => void;
  fetchUser: () => void;
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
  updateLogin: () => {},
  updateUser: () => {},
  fetchUser: () => {},
});

export default AuthContext;
