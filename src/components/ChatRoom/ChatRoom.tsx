/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { MdAddLink } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import { Button } from "@/components/Button";
import { Banner } from "@/components/Banner";
import { useEffect, useMemo, useRef, useState } from "react";
import { TypeMessage, Room, Size } from "@/interfaces";
import { getRoomById, updateRoom } from "@/apis";
import { useAuth } from "@/contexts/AuthContext";
import { Message } from "@/components/Message";
import moment from "moment";
import ChatRoomHeader from "@/components/ChatRoom/ChatRoomHeader";
import { LoadingLogo } from "@/components/Loading";
import { uid } from "uid";
import Image from "@/components/ChatRoom/Image";
import StartChat from "@/components/ChatRoom/StartChat";
import { useRoom } from "@/contexts";
import { useFetchUserById, useUploadImage, useWidth } from "@/hooks";

const ChatRoom = () => {
  const { currentUser } = useAuth();
  const { roomId } = useRoom();
  const [room, setRoom] = useState<Room>({} as Room);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    loadingImage,
    imageURL,
    isSelectImage,
    setIsSelectImage,
    setImageURL,
    setLoadingImage,
    handleFileChange,
  } = useUploadImage();
  const [messageInput, setMessageInput] = useState("");
  const [loadingHeader, setLoadingHeader] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { width } = useWidth();

  const idCurrentUser = String(currentUser?.uid);
  const userId = room.members?.find((memberId) => memberId !== idCurrentUser);

  const callbackHeader = () => {
    setLoadingHeader(false);
  };

  const listMessage = useMemo(() => {
    return room.messages?.filter(
      (message) => !message.isHiddenWithSender.includes(idCurrentUser)
    );
  }, [room]);

  const { infoUser } = useFetchUserById(userId, callbackHeader);

  const listImage = listMessage
    ?.filter((message) => message.imageURL && !message.isDelete)
    .map((message) => ({
      source: message.imageURL,
    }));
  const checkListMessage = listMessage?.length > 0;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleAddMessage = async () => {
    if (messageInput || imageURL) {
      const messageItem: TypeMessage = {
        id: uid(),
        sender: idCurrentUser,
        content: messageInput,
        imageURL,
        time: moment(new Date()).format(),
        isEdit: false,
        isDelete: false,
        watched: false,
        isHiddenWithSender: [],
      };

      const newRoom: Room = {
        ...room,
        messages: [...room.messages, messageItem],
      };
      setMessageInput("");
      await updateRoom(String(roomId), newRoom);
      setIsSelectImage(false);
      setImageURL("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddMessage();
    }
  };

  const handleRemoveImage = () => {
    setImageURL("");
    setIsSelectImage(false);
    setLoadingImage(false);
  };

  const callbackMessage = (result: Room) => {
    if (Object.keys(result).length > 0) {
      setRoom(result);
      setLoadingMessage(false);
    }
  };

  const handleUpdateStatusMessage = () => {
    const newListMessages = room?.messages?.map((message) => {
      if (message.sender !== idCurrentUser && !message.watched) {
        return {
          ...message,
          watched: true,
        };
      }
      return message;
    });
    updateRoom(String(roomId), {
      messages: newListMessages,
    } as Room);
  };

  useEffect(() => {
    const unsubcribe = getRoomById(String(roomId), callbackMessage);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return unsubcribe;
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
    handleUpdateStatusMessage();
  }, [room, roomId]);

  return (
    <div className="w-full h-screen flex flex-col shadow">
      {!roomId && <Banner />}
      {roomId && (
        <>
          <ChatRoomHeader
            listMessage={listMessage}
            roomId={roomId}
            infoUser={infoUser}
            loadingMessage={loadingMessage}
            loadingHeader={loadingHeader}
          />
          <div
            className="w-full overflow-y-scroll h-[calc(100%-128px)] max-h-[calc(100%-128px)] md:h-[calc(100%-180px)] md:max-h-[calc(100%-180px)] p-2 md:p-6 "
            ref={messagesEndRef}
          >
            {!loadingHeader &&
              !loadingMessage &&
              checkListMessage &&
              listMessage?.map((message, index) => {
                let checkHidden = 0;
                if (listMessage[index + 1]?.sender == message.sender) {
                  checkHidden++;
                }
                return (
                  <Message
                    key={index}
                    message={message}
                    listImage={listImage}
                    room={room}
                    hidden={checkHidden > 0}
                    position={
                      message.sender !== idCurrentUser ? "left" : "right"
                    }
                  />
                );
              })}
            {!loadingHeader && !loadingMessage && !checkListMessage && (
              <StartChat
                url={String(infoUser.photoURL)}
                name={String(infoUser.displayName)}
              />
            )}
            {(loadingHeader || loadingMessage) && <LoadingLogo />}
          </div>
          <div className="w-full h-16 md:h-[90px] p-2 md:p-4 flex items-center justify-between gap-3 md:gap-6 border-t border-light-200 text-main-100">
            <div className="w-full flex items-center gap-2 sm:gap-4 bg-main-400 rounded-md h-10 md:h-14 px-2 my-2 md:my-6">
              {!isSelectImage && (
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter messages..."
                  className="w-full bg-transparent outline-none"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              )}
              {isSelectImage && (
                <>
                  {loadingImage ? (
                    <Image onRemoveImage={handleRemoveImage} />
                  ) : (
                    <Image url={imageURL} onRemoveImage={handleRemoveImage} />
                  )}
                </>
              )}
            </div>
            <span className="relative text-primary text-2xl">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <MdAddLink />
            </span>
            <Button
              onClick={handleAddMessage}
              disabled={loadingImage}
              size={width >= 380 ? Size.medium : Size.small}
            >
              <RiSendPlane2Fill />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
