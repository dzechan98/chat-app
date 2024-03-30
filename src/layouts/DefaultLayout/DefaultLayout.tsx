/* eslint-disable react-hooks/rules-of-hooks */
import { ChatRoom } from "@/components/ChatRoom";
import { Sidebar } from "@/components/Sidebar";
import { paths } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!currentUser) {
    return <Navigate to={paths.signin} />;
  }

  useEffect(() => {
    if (currentUser) {
      navigate(location.pathname);
    }
  }, [currentUser]);

  return (
    <div className="w-full flex">
      <Sidebar />
      <Outlet />
      <ChatRoom />
    </div>
  );
};

export default DefaultLayout;
