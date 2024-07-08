import { Avatar } from "@/components/Avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Room, User } from "@/interfaces";
import { createAndGetRoom, getAllUsers } from "@/apis";
import { useAuth } from "@/contexts/AuthContext";
import { uid } from "uid";
import { paths } from "@/constants";
import { useNavigate } from "react-router-dom";
import { showTitleSplit } from "@/utils";
import { useModalRoomChat, useRoom } from "@/contexts";

const ListUsers = () => {
  const { currentUser } = useAuth();
  const { setRoomId } = useRoom();
  const { setIsOpenModal } = useModalRoomChat();
  const navigate = useNavigate();
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNavigateRoomChat = async (user: User) => {
    if (currentUser && user) {
      const currentRoom: Room = {
        roomId: uid(),
        members: [String(user.userId), currentUser.uid],
        messages: [],
      };
      const room = await createAndGetRoom(currentRoom);
      setRoomId(room.roomId);
      setIsOpenModal(true);
      navigate(`${paths.chat}/${room.roomId}`);
    }
  };

  useEffect(() => {
    const unsubcribe = getAllUsers(
      String(currentUser?.uid),
      (users: User[]) => {
        setListUsers(users);
        setLoading(false);
      }
    );

    return unsubcribe;
  }, []);
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={6}
      navigation={true}
      modules={[Navigation]}
      className="w-full"
    >
      {loading &&
        [1, 2, 3, 4].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="animate-pulse w-full h-[120px] flex items-center">
              <div className="w-full relative h-14 bg-main-400 rounded-md flex-shrink-0">
                <span className="block absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-700 h-2.5 w-[80%] rounded-full"></span>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="w-10 h-10 text-gray-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      {!loading &&
        listUsers.length > 0 &&
        listUsers.map((user) => (
          <SwiperSlide key={user.userId}>
            <div
              className="w-full h-[120px] flex items-center"
              onClick={() => handleNavigateRoomChat(user)}
            >
              <div className="w-full relative h-14 bg-main-300 rounded-md flex-shrink-0">
                <h2 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-main-100 font-medium">
                  {showTitleSplit(String(user.displayName?.split(" ")[0]), 9)}
                </h2>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Avatar url={String(user.photoURL)} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ListUsers;
