import { useEffect, useState } from "react";
import { createAndGetRoom, deleteRoom, getAllRooms, getUserById } from "@/apis";
import { Avatar } from "@/components/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Room, User } from "@/interfaces";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants";
import { uid } from "uid";
import moment from "moment";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { formatTimeDifference, showTitleSplit } from "@/utils";
import { useRoom } from "@/contexts";

interface UserChatProps {
  user?: User;
  room: Room;
}

const ListUserChats = () => {
  const { currentUser } = useAuth();
  const [listRooms, setListRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const callback = (results: Room[]) => {
    const rooms = results
      .filter((room) => room.messages.length > 0)
      .sort((a, b) => {
        return (
          moment(b.messages[b.messages.length - 1].time).valueOf() -
          moment(a.messages[a.messages.length - 1].time).valueOf()
        );
      });
    setListRooms(rooms);
    setLoading(false);
  };

  useEffect(() => {
    const unsubcribe = getAllRooms(String(currentUser?.uid), callback);

    return unsubcribe;
  }, []);

  return (
    <>
      {loading &&
        [1, 2, 3, 4, 5, 6].map((i) => (
          <div className="p-4" key={i}>
            <LoadingSkeletonUserChat />
          </div>
        ))}
      {!loading && (
        <>
          {listRooms.length > 0 &&
            listRooms.map((room) => <UserChat key={room.roomId} room={room} />)}
          {listRooms.length === 0 && (
            <p className="p-4 text-main-200 font-semibold">
              There are no recent chats
            </p>
          )}
        </>
      )}
    </>
  );
};

const LoadingSkeletonUserChat = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex items-center">
        <svg
          className="w-10 h-10 text-gray-700 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div className="h-2.5 rounded-full bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-2 rounded-full bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

const UserChat: React.FC<UserChatProps> = ({ room }) => {
  const { roomId, setRoomId } = useRoom();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [infoUser, setInfoUser] = useState<User>({});
  const userId = room?.members.find((member) => member !== currentUser?.uid);
  const lastMessage = room?.messages[room?.messages.length - 1];
  const chatActive = roomId === room.roomId;
  const listMessageUntracked = room?.messages.filter(
    (message) => !message.watched && message.sender === userId
  ).length;

  const authorLastMessage =
    lastMessage.sender === currentUser?.uid
      ? "You"
      : lastMessage.displayName.split(" ")[0];

  const handleGetContentLastMessage = () => {
    if (lastMessage.content) {
      if (lastMessage.isDelete) {
        return "deleted a message";
      }
      return lastMessage.content;
    }

    if (lastMessage.isDelete) {
      return "deleted a photo";
    }
    return "sent a photo";
  };

  const handleNavigateRoomChat = async (user: User) => {
    if (currentUser && user) {
      const currentRoom: Room = {
        roomId: uid(),
        members: [String(user.userId), currentUser.uid],
        messages: [],
      };
      const room = await createAndGetRoom(currentRoom);
      setRoomId(room.roomId);
      navigate(`${paths.chat}/${room.roomId}`);
    }
  };

  const handleDeleteRoom = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "Deleted!",
        text: "This room has been deleted.",
        icon: "success",
      });
      await deleteRoom(room.roomId);
      navigate(-1);
    }
  };

  useEffect(() => {
    let unsubcribe;
    if (userId) {
      unsubcribe = getUserById(userId, (user) => {
        setInfoUser(user);
      });
    }
    return unsubcribe;
  }, []);

  return (
    <div
      className={`relative group flex items-center gap-2 p-4 hover:bg-main-300 rounded-md cursor-pointer mb-2 ${
        chatActive ? "bg-main-400" : ""
      }`}
      onClick={() => handleNavigateRoomChat(infoUser)}
    >
      {Object.keys(infoUser).length > 0 && (
        <>
          <Avatar
            url={String(infoUser.photoURL)}
            iconActive
            active={infoUser.active}
          />
          <div className="flex flex-col">
            <h2 className="font-medium text-main-100">
              {infoUser.displayName}
            </h2>
            <span
              className={`text-sm ${
                listMessageUntracked > 0
                  ? "text-main-100 font-semibold"
                  : "text-main-200"
              }`}
            >
              {`${authorLastMessage}: ${showTitleSplit(
                handleGetContentLastMessage(),
                30
              )}`}
            </span>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 text-main-200 text-sm flex flex-col justify-between">
            <span>{formatTimeDifference(String(lastMessage.time))}</span>
            {listMessageUntracked > 0 && (
              <span className="block px-1 py-0.5 rounded-full bg-primary/50 text-primary text-center font-semibold">
                {listMessageUntracked}
              </span>
            )}
          </div>
          <span
            className="absolute right-5 top-1/2 -translate-y-1/2 group-hover:block p-2 rounded-full bg-main-400 hidden text-2xl text-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteRoom();
            }}
          >
            <MdDeleteOutline />
          </span>
        </>
      )}
    </div>
  );
};

export default ListUserChats;
