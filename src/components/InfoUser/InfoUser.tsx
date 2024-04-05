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

interface InfoUserProps {
  room: Room;
  infoUser: User;
  isOpenInfoUser: boolean;
  onCloseInfoUser: () => void;
}

const InfoUser: React.FC<InfoUserProps> = ({
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
      children: (
        <div className="flex items-center gap-2 font-semibold ">
          <FaRegUser />
          <span>About</span>
        </div>
      ),
      render: (
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
      children: (
        <div className="flex items-center gap-2 font-semibold ">
          <MdAddLink />
          <span>Attached Files</span>
        </div>
      ),
      render: (
        <div className="px-4 py-2 grid grid-cols-3 gap-2">
          {listImage.length > 0 &&
            listImage.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image.source}
                  alt=""
                  className="w-full h-20 object-cover"
                />
              </div>
            ))}
          {listImage.length === 0 && <Title>No files</Title>}
        </div>
      ),
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
      className={`fixed z-[100] transition-all duration-500 max-w-[380px] w-[380px] bottom-0 h-screen shadow bg-light-100 ${
        isOpenInfoUser ? "right-0" : "-right-[100%]"
      }`}
      ref={containerRef}
    >
      <div className="h-[250px] w-full center flex-col gap-3 border-light-200 border-b">
        <div className="rounded-full border border-light-200">
          <Avatar size={Size.large} url={String(infoUser.photoURL)} />
        </div>
        <Title className="text-lg">{infoUser.displayName}</Title>
        <div className="center gap-1">
          <DotStatus active={infoUser.active} />
          <span className="text-main-200 text-sm font-medium">
            {infoUser.active ? "Active" : "Not active"}
          </span>
        </div>
      </div>
      <div className="max-h-[calc(100%-290px)] overflow-y-auto flex flex-col gap-2 px-4 my-5">
        {menuAccordion.map((accordion, index) => (
          <Accordion key={index} render={accordion.render}>
            {accordion.children}
          </Accordion>
        ))}
      </div>
      <div
        className="absolute top-8 right-8 text-4xl cursor-pointer"
        onClick={onCloseInfoUser}
      >
        <IoIosClose />
      </div>
    </div>
  );
};

export default InfoUser;
