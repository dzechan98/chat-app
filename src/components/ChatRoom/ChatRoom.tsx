/* eslint-disable react-hooks/rules-of-hooks */
import { MdAddLink } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import { Button } from "@/components/Button";
import { useParams } from "react-router-dom";
import { Banner } from "@/components/Banner";
import { useEffect, useRef, useState } from "react";
import { TypeMessage, Room } from "@/interfaces";
import { getRoomById, updateRoom, uploadImageWithFirebase } from "@/apis";
import { useAuth } from "@/contexts/AuthContext";
import { Message } from "@/components/Message";
import moment from "moment";
import ChatRoomHeader from "@/components/ChatRoom/ChatRoomHeader";
import { LoadingLogo } from "@/components/Loading";
import { uid } from "uid";
import { isImageFile } from "@/utils/isImageFile";
import Swal from "sweetalert2";
import Image from "@/components/ChatRoom/Image";

const ChatRoom = () => {
  const { currentUser } = useAuth();
  const { roomId } = useParams();
  const [room, setRoom] = useState<Room>({} as Room);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageURL, setImageURl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [isSelectImage, setIsSelectImage] = useState(false);

  const idCurrentUser = String(currentUser?.uid);

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
        displayName: String(currentUser?.displayName),
        content: messageInput,
        imageURL,
        avatar: String(currentUser?.photoURL),
        time: moment(new Date()).format(),
        isEdit: false,
        isDelete: false,
      };

      const newRoom: Room = {
        ...room,
        messages: [...room.messages, messageItem],
      };
      setMessageInput("");
      await updateRoom(String(roomId), newRoom);
      setIsSelectImage(false);
      setImageURl("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddMessage();
    }
  };

  const getUserIdWithRoom = () => {
    const result = room.members?.find((memberId) => {
      return memberId !== idCurrentUser;
    });
    return result;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      if (isImageFile(files[0].name)) {
        setIsSelectImage(true);
        setLoadingImage(true);
        const res = await uploadImageWithFirebase(files[0]);
        setLoadingImage(false);
        setImageURl(res);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select the file as an image!",
        });
      }
    }
  };

  const handleRemoveImage = () => {
    setImageURl("");
    setIsSelectImage(false);
    setLoadingImage(false);
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
            room={room}
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
                    message={message}
                    room={room}
                    hidden={checkHidden > 0}
                    position={
                      message.sender !== idCurrentUser ? "left" : "right"
                    }
                  />
                );
              })}
            {loading && <LoadingLogo />}
          </div>
          <div className="w-full h-[90px] p-4 flex items-center justify-between gap-6 border-t border-light-200">
            <div className="w-full flex items-center gap-4 bg-light-400 rounded-md h-14 px-3 my-6">
              {!isSelectImage && (
                <input
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
            <Button onClick={handleAddMessage} disabled={loadingImage}>
              <RiSendPlane2Fill />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
