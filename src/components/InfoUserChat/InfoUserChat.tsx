import { MenuInfoAccordion, Room, User } from "@/interfaces";
import React, { useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdAddLink } from "react-icons/md";
import ListImageChat from "./ListImageChat";
import { IoIosClose } from "react-icons/io";
import { Info, InfoUserAccordion } from "@/components/InfoUserChat";

interface InfoUserChatProps {
  room: Room;
  infoUser: User;
  isOpenInfoUser: boolean;
  onCloseInfoUser: () => void;
}

const InfoUserChat: React.FC<InfoUserChatProps> = ({
  room,
  infoUser,
  isOpenInfoUser,
  onCloseInfoUser,
}) => {
  const listImage = room.messages
    .filter((message) => message.imageURL && !message.isDelete)
    .map((message) => ({
      source: message.imageURL,
    }));

  const menuAccordion: MenuInfoAccordion[] = [
    {
      title: "About",
      icon: <FaRegUser />,
      children: (
        <InfoUserAccordion
          {...infoUser}
          // displayName={infoUser.displayName as string}
          // time={infoUser.time as string}
        />
      ),
    },
    {
      title: "Attached Files",
      icon: <MdAddLink />,
      children: <ListImageChat listImage={listImage} />,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onCloseInfoUser();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed z-[100] transition-all duration-500 max-w-[380px] w-[380px] bottom-0 h-screen shadow bg-main-400 ${
        isOpenInfoUser ? "right-0" : "-right-[100%]"
      }`}
      ref={containerRef}
    >
      <Info
        photoURL={infoUser.photoURL as string}
        active={infoUser.active}
        displayName={infoUser.displayName as string}
        menuInfoAccordion={menuAccordion}
      />
      <div
        className="absolute top-8 right-8 text-4xl cursor-pointer text-main-100"
        onClick={onCloseInfoUser}
      >
        <IoIosClose />
      </div>
    </div>
  );
};

export default InfoUserChat;
