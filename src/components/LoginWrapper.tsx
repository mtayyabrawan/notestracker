/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type ReactElement } from "react";
import useLogin from "../hooks/useLogin";
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
  const { isLoggedIn } = useLogin();
  useEffect(() => {
    if (isLoggedIn === "no") {
      if (protectionType === "protected") {
        navigator("/auth/login");
      }
    } else if (isLoggedIn === "yes") {
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
