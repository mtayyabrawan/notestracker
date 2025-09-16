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
    if (isLoggedIn === "false") {
      if (protectionType === "protected") {
        navigator("/auth/login");
      }
    } else if (isLoggedIn === "true") {
      if (protectionType === "unneccessary") {
        navigator("/dashboard/profile");
      }
    }
  }, [isLoggedIn]);
  return (
    <>
      {isLoggedIn === "pending" && <Loader />}
      {children}
    </>
  );
}

export default LoginWrapper;
