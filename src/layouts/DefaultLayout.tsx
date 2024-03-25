import { paths } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(paths.signin);
    }
  }, [currentUser]);
  return <div>{children}</div>;
};

export default DefaultLayout;
