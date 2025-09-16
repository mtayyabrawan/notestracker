/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type ReactElement } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import Loader from "./Loader";

function LoginWrapper({
  children,
  protectionType,
}: {
  children: ReactElement;
  protectionType: "protected" | "unneccessary";
}) {
  const navigator = useNavigate();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn === "false" && protectionType === "protected") {
      navigator("/auth/login");
    }
    if (isLoggedIn === "true" && protectionType === "unneccessary") {
      navigator("/dashboard/profile");
    }
  }, [isLoggedIn]);

  return <>{isLoggedIn === "pending" ? <Loader /> : children}</>;
}

export default LoginWrapper;
