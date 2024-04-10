import { Accordion } from "@/components/Accordion";
import { Avatar } from "@/components/Avatar";
import { DotStatus } from "@/components/DotStatus";
import { Title } from "@/components/Title";
import { Room, Size, User } from "@/interfaces";
import React, { useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdAddLink } from "react-icons/md";
import moment from "moment";
import ListImageChat from "./ListImageChat";

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

  const info = [
    {
      field: "Name",
      value: infoUser.displayName,
    },
    {
      field: "Time",
      value: moment(infoUser.time).format("lll"),
    },
  ];

  const menuAccordion = [
    {
      title: "About",
      icon: <FaRegUser />,
      children: (
        <div className="px-4 py-2">
          {info.map((item, index) => (
            <div key={index} className="font-medium">
              <span className="text-main-200">{item.field}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
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
      <div className="h-[250px] w-full center flex-col gap-3 border-light-200 border-b">
        <div className="rounded-full border border-light-200">
          <Avatar size={Size.large} url={String(infoUser.photoURL)} />
        </div>
        <Title className="text-lg text-main-100">{infoUser.displayName}</Title>
        <div className="center gap-1">
          <DotStatus active={infoUser.active} />
          <span className="text-main-200 text-sm font-medium">
            {infoUser.active ? "Active" : "Not active"}
          </span>
        </div>
      </div>
      <div className="max-h-[calc(100%-290px)] overflow-y-auto flex flex-col gap-2 px-4 my-5">
        {menuAccordion.map((accordion, index) => (
          <Accordion key={index} title={accordion.title} icon={accordion.icon}>
            {accordion.children}
          </Accordion>
        ))}
      </div>
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
