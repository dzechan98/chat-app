/* eslint-disable react-hooks/rules-of-hooks */
import { CiFaceSmile } from "react-icons/ci";
import { MdAddLink } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import { Button } from "@/components/Button";
import { useParams } from "react-router-dom";
import { Banner } from "@/components/Banner";
import { useEffect, useRef, useState } from "react";
import { TypeMessage, Room } from "@/interfaces";
import { getRoomById, updateRoom } from "@/apis";
import { useAuth } from "@/contexts/AuthContext";
import { Message } from "@/components/Message";
import moment from "moment";
import ChatRoomHeader from "@/components/ChatRoom/ChatRoomHeader";
import { LoadingLogo } from "@/components/Loading";

const ChatRoom = () => {
  const { roomId } = useParams();
  const { currentUser } = useAuth();
  const [room, setRoom] = useState<Room>({} as Room);
  const [messageInput, setMessageInput] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const menuOption = [
    {
      id: 1,
      icon: <CiFaceSmile />,
    },
    {
      id: 2,
      icon: <MdAddLink />,
    },
  ];

  if (!currentUser) {
    return;
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleAddMessage = async () => {
    if (messageInput) {
      const messageItem: TypeMessage = {
        sender: currentUser.uid,
        content: messageInput,
        avatar: String(currentUser.photoURL),
        time: moment(new Date()).format(),
      };

      const newRoom: Room = {
        ...room,
        messages: [...room.messages, messageItem],
      };
      setMessageInput("");
      await updateRoom(String(roomId), newRoom);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddMessage();
    }
  };

  const getUserIdWithRoom = () => {
    const result = room.messages?.find((message) => {
      return message.sender !== currentUser.uid;
    });
    return result?.sender;
  };

  const callback = (result: Room) => {
    if (Object.keys(result).length > 0) {
      setRoom(result);
      setCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const unsubcribe = getRoomById(String(roomId), callback);

    return unsubcribe;
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [room]);

  useEffect(() => {
    if (count === 2) {
      setLoading(false);
    }
  }, [count]);

  return (
    <div className="w-full h-screen flex flex-col shadow">
      {!roomId && <Banner />}
      {roomId && (
        <>
          <ChatRoomHeader
            userId={String(getUserIdWithRoom())}
            loading={loading}
            setCount={setCount}
          />
          <div
            className="w-full overflow-y-scroll h-[calc(100%-180px)] max-h-[calc(100%-180px)] p-6 "
            ref={messagesEndRef}
          >
            {!loading &&
              room?.messages?.map((message, index) => {
                let checkHidden = 0;
                if (room.messages[index + 1]?.sender == message.sender) {
                  checkHidden++;
                }
                return (
                  <Message
                    key={index}
                    message={message.content}
                    hidden={checkHidden > 0}
                    urlAvatar={message.avatar}
                    position={
                      message.sender !== currentUser?.uid ? "left" : "right"
                    }
                    time={moment(message.time).format("HH:mm")}
                  />
                );
              })}
            {loading && <LoadingLogo />}
          </div>
          <div className="w-full h-[90px] p-6 flex items-center justify-between gap-6 border-t border-light-200">
            <div className="w-full flex items-center gap-4 bg-light-400 rounded-md p-3 my-6">
              <input
                type="text"
                placeholder="Enter messages..."
                className="w-full bg-transparent outline-none"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            {menuOption.map((option) => (
              <span
                key={option.id}
                className="text-primary text-2xl cursor-pointer"
              >
                {option.icon}
              </span>
            ))}
            <Button onClick={handleAddMessage}>
              <RiSendPlane2Fill />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
