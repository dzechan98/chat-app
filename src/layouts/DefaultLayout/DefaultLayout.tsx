import { ChatRoom } from "@/components/ChatRoom";
import { Sidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="w-full flex">
      <Sidebar />
      <Outlet />
      <ChatRoom />
    </div>
  );
};

export default DefaultLayout;
