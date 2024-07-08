import { MenuInfoAccordion, TypeMessage, User } from "@/interfaces";
import React, { useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdAddLink } from "react-icons/md";
import ListImageChat from "./ListImageChat";
import { IoIosClose } from "react-icons/io";
import { Info, InfoUserAccordion } from "@/components/InfoUserChat";

interface InfoUserChatProps {
  listMessage: TypeMessage[];
  infoUser: User;
  isOpenInfoUser: boolean;
  onCloseInfoUser: () => void;
}

const InfoUserChat: React.FC<InfoUserChatProps> = ({
  listMessage,
  infoUser,
  isOpenInfoUser,
  onCloseInfoUser,
}) => {
  const listImage =
    listMessage
      ?.filter((message) => message.imageURL && !message.isDelete)
      ?.map((message) => ({
        source: message.imageURL,
      })) ?? [];

  const menuAccordion: MenuInfoAccordion[] = [
    {
      title: "About",
      icon: <FaRegUser />,
      children: <InfoUserAccordion {...infoUser} />,
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
      className={`fixed z-[100] transition-all duration-500 w-full sm:max-w-[380px] sm:w-[380px] bottom-0 h-screen shadow bg-main-400 ${
        isOpenInfoUser ? "right-0" : "-right-[100%]"
      }`}
      ref={containerRef}
    >
      <Info
        photoURL={infoUser.photoURL as string}
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
