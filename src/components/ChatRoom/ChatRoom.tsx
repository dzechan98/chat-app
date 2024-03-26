import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { Search } from "@/components/Search";
import { Popover } from "@/components/Popover";
import { Avatar } from "@/components/Avatar";
import Title from "@/components/Title/Title";
import { DotStatus } from "@/components/DotStatus";

const ChatRoom = () => {
  const menuOption = [
    { id: 1, icon: <CiSearch /> },
    { id: 2, icon: <FiUsers /> },
  ];
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[90px] p-6 flex items-center justify-between border-b border-light-200">
        <div className="center gap-2">
          <Avatar url={"http://dummyimage.com/229x100.png/ff4444/ffffff"} />
          <Title>{"BDorisrowns"}</Title>
          <DotStatus active />
        </div>
        <div className="center gap-5 cursor-pointer">
          {menuOption.map((option) => (
            <span key={option.id} className="block p-4 text-xl text-main-200">
              {option.icon}
            </span>
          ))}
          <Popover
            render={
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                facilis aspernatur, dignissimos quasi facere voluptate
                perspiciatis magnam quos, quaerat pariatur dolorem iure autem
                ipsam amet fugit! Illum modi accusantium velit.
              </div>
            }
          >
            <span className="block p-4 text-xl text-main-200">
              <IoIosMore />
            </span>
          </Popover>
        </div>
      </div>
      <div className="w-full h-[calc(100%-180px)] max-h-[calc(100%-180px)]"></div>
      <div className="w-full h-[90px] p-6 flex items-center justify-between border-t border-light-200">
        <Search hiddenIcon />
      </div>
    </div>
  );
};

export default ChatRoom;
