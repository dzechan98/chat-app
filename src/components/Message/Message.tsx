import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { IoMdTime, IoMdMore } from "react-icons/io";
import { Avatar } from "@/components/Avatar";
import { Popover } from "@/components/Popover";
import { ListImage, Room, Size, TypeMessage } from "@/interfaces";
import moment from "moment";
import { useDisclosure } from "@/hooks";
import EditMessageModal from "@/components/Message/EditMessageModal";
import MenuActionMessage from "@/components/Message/MenuActionMessage";
import ImageMessage from "@/components/Message/ImageMessage";
import imageDefault from "@/assets/no-image.png";
import SliderImage from "@/components/SliderImage/SliderImage";

interface MessageProps {
  room: Room;
  listImage: ListImage;
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
      true: "mb-1",
      false: "mb-7",
    },
  },
});

const messageStyle = cva(
  "relative max-w-[400px] rounded-md p-2 bottom-[100%]",
  {
    variants: {
      position: {
        left: "bg-primary text-light left-12 before:left-0 before:border-r-transparent before:border-l-primary",
        right:
          "bg-light-400 text-main-100 right-12  before:right-0 before:border-l-transparent before:border-r-light-400",
      },
      hidden: {
        true: "",
        false:
          "before:absolute before:bottom-0 before:border-t-transparent before:translate-y-1/2 before:border-b-transparent before:border-[10px]",
      },
      isDelete: {
        true: "!text-[#bcc0c4]",
      },
    },
  }
);

const messageText = cva("font-medium text-sm break-words");

const messsageTime = cva("flex items-center gap-1 text-[11px]", {
  variants: {
    position: {
      left: "text-light-200 justify-end",
      right: "text-main-200 justify-start",
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
  listImage,
  message,
  position = "right",
  hidden = true,
}) => {
  const { id, content, avatar, time, imageURL, displayName, isDelete, isEdit } =
    message;
  const editDisclosure = useDisclosure();
  const sliderImageDisclosure = useDisclosure();
  const [indexSelected, setIndexSelected] = useState(-1);

  const handleOpenModalSliderImage = () => {
    if (!isDelete) {
      const index = listImage.findIndex((image) => image.source === imageURL);
      sliderImageDisclosure.onOpen();
      setIndexSelected(index);
    }
  };

  return (
    <div
      className={`relative flex flex-col ${
        position === "left" ? "items-start" : "items-end"
      }`}
    >
      {imageURL && (
        <>
          <div className={messaegAvatar({ hidden })}>
            <Avatar url={avatar} />
          </div>
          <ImageMessage
            url={!isDelete ? imageURL : imageDefault}
            className={`relative group ${
              position === "left" ? "left-12" : "right-12"
            } ${hidden ? "mb-1" : ""} ${isDelete ? "" : "cursor-pointer"}`}
            onClick={handleOpenModalSliderImage}
          >
            {position === "right" && !isDelete && (
              <div className={moreIcon()}>
                <Popover
                  size={Size.medium}
                  render={
                    <MenuActionMessage
                      room={room}
                      messageId={id}
                      hiddenActionEdit
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
          </ImageMessage>
        </>
      )}
      {!imageURL && (
        <>
          <div className={messageWrapper({ position, hidden })}>
            <div className={messageStyle({ position, hidden, isDelete })}>
              <p className={messageText()}>
                {isDelete
                  ? `${displayName.split(" ")[0]} has revoked the message`
                  : content}
              </p>
              {!isDelete && (
                <div className={messsageTime({ position })}>
                  <IoMdTime />
                  <span>
                    {moment(time).format("lll")} {isEdit ? "(Edited)" : ""}
                  </span>
                </div>
              )}
              {position === "right" && !isDelete && (
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
          </div>
          {editDisclosure.isOpen && (
            <div className="relative top-[calc(100%+30px)] mb-4 right-12">
              <EditMessageModal
                onCloseModal={editDisclosure.onClose}
                message={content}
                room={room}
                idMessage={id}
              />
            </div>
          )}
        </>
      )}
      {sliderImageDisclosure.isOpen && (
        <SliderImage
          listImage={listImage}
          index={indexSelected}
          onCloseSliderImage={sliderImageDisclosure.onClose}
        />
      )}
    </div>
  );
};

export default Message;
