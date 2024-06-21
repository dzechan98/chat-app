import React from "react";
import { Avatar } from "@/components/Avatar";
import { DotStatus } from "@/components/DotStatus";
import { Popover } from "@/components/Popover";
import { Title } from "@/components/Title";
import { IoIosMore } from "react-icons/io";
import { TypeMessage, User } from "@/interfaces";
import MenuRoomAction from "@/components/ChatRoom/MenuRoomAction";
import { useDisclosure, useWidth } from "@/hooks";
import { InfoUserChat } from "@/components/InfoUserChat";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useModalRoomChat } from "@/contexts";

interface ChatRoomHeaderProps {
  roomId: string;
  listMessage: TypeMessage[];
  infoUser: User;
  loadingMessage: boolean;
  loadingHeader: boolean;
}

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({
  roomId,
  listMessage,
  infoUser,
  loadingMessage,
  loadingHeader,
}) => {
  const infoUserDisclosure = useDisclosure();
  const { width } = useWidth();
  const { setIsOpenModal } = useModalRoomChat();

  const handleCloseModalRoomChat = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="w-full h-16 md:h-[90px] p-2 md:p-6 flex items-center justify-between border-b border-light-200">
      {!loadingHeader && !loadingMessage && (
        <>
          <div className="center gap-1">
            {width < 1024 && (
              <span
                className="cursor-pointer"
                onClick={handleCloseModalRoomChat}
              >
                <MdKeyboardArrowLeft fontSize={25} />
              </span>
            )}
            <Avatar url={String(infoUser.photoURL)} />
            <Title>{infoUser.displayName}</Title>
            <DotStatus active={infoUser.active} />
          </div>
          <div className="center gap-5 cursor-pointer">
            <Popover
              position="right"
              render={
                <MenuRoomAction
                  roomId={roomId}
                  onOpenInfoUser={infoUserDisclosure.onOpen}
                />
              }
            >
              <span className="block p-2 text-xl text-main-200">
                <IoIosMore />
              </span>
            </Popover>
          </div>
          <InfoUserChat
            listMessage={listMessage}
            infoUser={infoUser}
            isOpenInfoUser={infoUserDisclosure.isOpen}
            onCloseInfoUser={infoUserDisclosure.onClose}
          />
        </>
      )}
      {(loadingHeader || loadingMessage) && <LoadingChatRoomHeader />}
    </div>
  );
};

const LoadingChatRoomHeader = () => {
  return (
    <div className="flex items-center">
      <svg
        className="size-10 me-3 text-gray-700"
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
  );
};

export default ChatRoomHeader;
