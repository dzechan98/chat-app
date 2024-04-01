import React from "react";
import { cva } from "class-variance-authority";
import { IoMdTime, IoMdMore } from "react-icons/io";
import { Avatar } from "@/components/Avatar";
import { Popover } from "@/components/Popover";
import { Room, Size, TypeMessage } from "@/interfaces";
import moment from "moment";
import { useDisclosure } from "@/hooks";
import EditMessageModal from "@/components/Message/EditMessageModal";
import MenuActionMessage from "@/components/Message/MenuActionMessage";
import { useAuth } from "@/contexts/AuthContext";

interface MessageProps {
  room: Room;
  message: TypeMessage;
  position?: "right" | "left";
  hidden?: boolean;
}

const messageWrapper = cva("w-full flex relative group", {
  variants: {
    position: {
      left: "justify-start",
      right: "justify-end",
    },
    hidden: {
      true: "mb-3",
      false: "mb-7",
    },
    hiddenMessage: {
      true: "hidden",
      false: "block",
    },
  },
});

const messageStyle = cva(
  "relative max-w-[400px] rounded-md p-3 bottom-[100%] before:absolute before:bottom-0 before:border-t-transparent before:translate-y-1/2 before:border-b-transparent before:border-[10px]",
  {
    variants: {
      position: {
        left: "bg-primary text-light left-12 before:left-0 before:border-r-transparent before:border-l-primary",
        right:
          "bg-light-400 text-main-100 right-12  before:right-0 before:border-l-transparent before:border-r-light-400",
      },
      hardDelete: {
        true: "!text-[#bcc0c4]",
      },
    },
  }
);

const messageText = cva("font-medium text-sm mb-2 break-words", {
  variants: {},
});

const messsageTime = cva("flex items-center gap-1 text-[12px]", {
  variants: {
    position: {
      left: "text-light-200 justify-end",
      right: "text-primary justify-start",
    },
  },
});

const messaegAvatar = cva("absolute bottom-0 translate-y-1/2", {
  variants: {
    hidden: {
      true: "hidden",
      false: "block",
    },
  },
});

const moreIcon = cva(
  "cursor-pointer text-main-100 transition-all opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 z-10 right-[100%]"
);

const Message: React.FC<MessageProps> = ({
  room,
  message,
  position = "right",
  hidden = true,
}) => {
  const {
    id,
    content,
    avatar,
    time,
    softDelete,
    sender,
    hardDelete,
    displayName,
  } = message;
  const editDisclosure = useDisclosure();
  const { currentUser } = useAuth();
  const hiddenMessage = String(currentUser?.uid) === sender && softDelete;

  return (
    <div className={messageWrapper({ position, hidden, hiddenMessage })}>
      <div className={messageStyle({ position, hardDelete })}>
        <p className={messageText()}>
          {hardDelete
            ? `${displayName.split(" ")[0]} has revoked the message`
            : content}
        </p>
        {!hardDelete && (
          <div className={messsageTime({ position })}>
            <IoMdTime />
            <span>{moment(time).format("HH:mm")}</span>
          </div>
        )}
        {position === "right" && !hardDelete && (
          <div className={moreIcon()}>
            <Popover
              size={Size.medium}
              render={
                <MenuActionMessage
                  room={room}
                  messageId={id}
                  onOpen={editDisclosure.onOpen}
                />
              }
              position={position}
            >
              <span>
                <IoMdMore />
              </span>
            </Popover>
          </div>
        )}
      </div>
      <div className={messaegAvatar({ hidden })}>
        <Avatar url={avatar} />
      </div>
      {editDisclosure.isOpen && (
        <div className="absolute top-[calc(100%+30px)]">
          <EditMessageModal
            onCloseModal={editDisclosure.onClose}
            room={room}
            idMessage={id}
          />
        </div>
      )}
    </div>
  );
};

export default Message;
