/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { isValidJWT } from "zod/v4/core";
import authAPI from "../../api/auth.api";
import { toast } from "sonner";
import Verifying from "../../components/Verifying";
import Verified from "../../components/Verified";

function VerifyEmail() {
  const { verificationToken } = useParams();

  const [loading, setLoading] = useState(true);

  const navigator = useNavigate();

  useEffect(() => {
    if (!isValidJWT(verificationToken as string)) {
      toast.error("Invalid email verification request");
      navigator("/");
      return;
    }
    authAPI.verifyEmail(verificationToken as string).then((res) => {
      if (!res.resStatus) {
        toast.error(res.error);
        navigator("/");
        return;
      }
      setLoading(false);
      setTimeout(() => {
        navigator("/auth/login");
      }, 2000);
    });
  }, [verificationToken]);

  return (
    <div className="mt-36 self-start">
      {loading ? <Verifying /> : <Verified />}
    </div>
  );
}

export default VerifyEmail;
