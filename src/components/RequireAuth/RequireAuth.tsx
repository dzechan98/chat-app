import { paths } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(paths.home);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to={paths.signin} />;
  }

  return children;
};

export default RequireAuth;
