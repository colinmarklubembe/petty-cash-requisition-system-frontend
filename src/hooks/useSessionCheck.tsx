import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";

const useSessionCheck = () => {
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        setShowSessionExpiredDialog(true);
        localStorage.clear();
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return { showSessionExpiredDialog, setShowSessionExpiredDialog };
};

export default useSessionCheck;
