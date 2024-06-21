/* eslint-disable react-hooks/rules-of-hooks */
import { ChatRoom } from "@/components/ChatRoom";
import { Sidebar } from "@/components/Sidebar";
import { paths } from "@/constants";
import { useModalRoomChat } from "@/contexts";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpenModal } = useModalRoomChat();

  useEffect(() => {
    if (currentUser) {
      navigate(location.pathname);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to={paths.signin} />;
  }

  return (
    <div className="w-full h-screen flex bg-layout">
      <Sidebar />
      <div className="lg:min-w-[380px] lg:w-[380px] w-full flex-shrink-0 h-full pt-6 bg-main-400">
        <Outlet />
      </div>
      <div
        className={`w-full absolute top-0 bg-layout lg:block lg:inset-0 lg:relative z-[10001]
        ${isOpenModal ? "block" : "hidden"}`}
      >
        <ChatRoom />
      </div>
    </div>
  );
};

export default DefaultLayout;
