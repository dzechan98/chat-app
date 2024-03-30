import React from "react";
import { cva } from "class-variance-authority";
import { IoMdTime } from "react-icons/io";
import { Avatar } from "@/components/Avatar";

interface MessageProps {
  message: string;
  time?: string;
  position?: "right" | "left";
  hidden?: boolean;
  urlAvatar: string;
}

const messageWrapper = cva("w-full flex relative", {
  variants: {
    position: {
      left: "justify-start",
      right: "justify-end",
    },
    hidden: {
      true: "mb-3",
      false: "mb-7",
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
    },
  }
);

const messageText = cva("font-medium text-sm mb-2 break-words");

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

const Message: React.FC<MessageProps> = ({
  message,
  time,
  position = "right",
  hidden = true,
  urlAvatar,
}) => {
  return (
    <div className={messageWrapper({ position, hidden })}>
      <div className={messageStyle({ position })}>
        <p className={messageText()}>{message}</p>
        <div className={messsageTime({ position })}>
          <IoMdTime />
          <span>{time}</span>
        </div>
      </div>
      <div className={messaegAvatar({ hidden })}>
        <Avatar url={urlAvatar} />
      </div>
    </div>
  );
};

export default Message;
