import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import { LoadingSpinner } from "../components";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  page?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  page,
}) => {
  const [isSessionValid, setIsSessionValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        setIsSessionValid(false);
        localStorage.clear();
      } else {
        setIsSessionValid(true);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, []);

  // If session validity status is still being determined, show nothing or a loading indicator
  if (isSessionValid === null) {
    return <LoadingSpinner />;
  }

  let userRole = localStorage.getItem("userRole");

  if (!userRole && page === "companies") {
    userRole = "EMPLOYEE";
  }

  if (!isSessionValid) {
    return <Navigate to="/login" />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
