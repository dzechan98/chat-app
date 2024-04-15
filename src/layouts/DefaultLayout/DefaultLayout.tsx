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

  useEffect(() => {
    if (currentUser) {
      navigate(location.pathname);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to={paths.signin} />;
  }

  return (
    <div className="w-full flex bg-layout">
      <Sidebar />
      <div className="min-w-[380px] w-[380px] flex-shrink-0 h-screen pt-6 bg-main-400">
        <Outlet />
      </div>
      <ChatRoom />
    </div>
  );
};

export default DefaultLayout;
