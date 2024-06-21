import { createAndGetRoom, getUserByName } from "@/apis";
import { Avatar } from "@/components/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@/hooks";
import { Room, Size, User } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants";
import { useModalRoomChat, useRoom } from "@/contexts";

interface SearchProps {
  hiddenIcon?: boolean;
  placeholder?: string;
}

interface ListSearchUsersProps {
  listSearchUsers: User[];
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ hiddenIcon = false, placeholder }) => {
  const { currentUser } = useAuth();
  const [listSearchUsers, setListSearchUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue);

  const handleSetListSearchUsers = (users: User[]) => {
    setListSearchUsers(users);
  };

  useEffect(() => {
    const unsubcribe = getUserByName(handleSetListSearchUsers, {
      userId: String(currentUser?.uid),
      keyword: searchValue.toLowerCase().trim(),
    });

    return unsubcribe;
  }, [debouncedValue]);

  return (
    <div className="relative w-full bg-main-300 rounded-md p-3 my-6 text-main-100">
      <div className="flex items-center gap-4">
        {!hiddenIcon && (
          <span>
            <CiSearch className="text-xl cursor-pointer" />
          </span>
        )}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
      </div>
      <ListSearchUsers
        listSearchUsers={listSearchUsers}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};

const ListSearchUsers: React.FC<ListSearchUsersProps> = ({
  listSearchUsers,
  setSearchValue,
}) => {
  const { currentUser } = useAuth();
  const { setRoomId } = useRoom();
  const navigate = useNavigate();
  const { setIsOpenModal } = useModalRoomChat();

  const handleNavigateRoomChat = async (user: User) => {
    if (currentUser && user) {
      const currentRoom: Room = {
        roomId: uid(),
        members: [String(user.userId), currentUser.uid],
        messages: [],
      };
      const room = await createAndGetRoom(currentRoom);
      setSearchValue("");
      setRoomId(room.roomId);
      setIsOpenModal(true);
      navigate(`${paths.chat}/${room.roomId}`);
    }
  };

  return (
    <>
      {listSearchUsers.length > 0 && (
        <div className="bg-main-300 absolute left-0 w-full py-3 px-2 rounded-b-md z-10">
          {listSearchUsers.map((user) => (
            <div
              key={user.userId}
              className="flex items-center gap-2 p-1 hover:bg-main-400 rounded-md cursor-pointer"
              onClick={() => handleNavigateRoomChat(user)}
            >
              <Avatar url={user.photoURL as string} size={Size.small} />
              <div className="flex flex-col">
                <h2 className="font-medium text-sm">{user.displayName}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
