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
        console.log("Session expired. Redirecting to login page.");
        localStorage.clear();
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return { showSessionExpiredDialog, setShowSessionExpiredDialog };
};

export default useSessionCheck;
