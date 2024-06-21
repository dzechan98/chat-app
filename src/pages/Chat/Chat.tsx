import { ListUserChats } from "@/components/ListUserChats";
import { ListUsers } from "@/components/ListUsers";
import { Search } from "@/components/Search";
import { useTitle } from "@/hooks";

const Chat = () => {
  useTitle("Chat");

  return (
    <div className="w-full h-full">
      <h2 className="px-6 text-main-100 text-xl font-medium">Chats</h2>
      <div className="px-6">
        <Search placeholder="Search users" />
        <ListUsers />
      </div>
      <h2 className="px-6 text-main-100 text-lg font-medium -mt-6">Recent</h2>
      <div className="max-h-[calc(100%-248px)] px-2 overflow-y-auto">
        <ListUserChats />
      </div>
    </div>
  );
};

export default Chat;
