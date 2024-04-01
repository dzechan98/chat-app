import { updateRoom } from "@/apis";
import { Room } from "@/interfaces";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { RiDeleteBackFill } from "react-icons/ri";
import Swal from "sweetalert2";

interface MenuActionMessageProps {
  messageId: string;
  room: Room;
  onOpen: () => void;
}

const MenuActionMessage: React.FC<MenuActionMessageProps> = ({
  messageId,
  room,
  onOpen,
}) => {
  const handleDeleteMessage = async (type: "recall" | "delete") => {
    const checkRecall = type === "recall";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: checkRecall ? "Yes, recall it!" : "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const newListMessage = room.messages.map((message) => {
        if (checkRecall) {
          if (message.id === messageId) {
            return {
              ...message,
              hardDelete: true,
            };
          }
          return message;
        }
        if (message.id === messageId) {
          return {
            ...message,
            softDelete: true,
          };
        }
        return message;
      });

      await updateRoom(room.roomId, {
        messages: newListMessage,
      } as Room);
      await Swal.fire({
        title: checkRecall ? "Recall!" : "Deleted!",
        text: checkRecall
          ? "Your message has been recall."
          : "Your message has been deleted.",
        icon: "success",
      });
    }
  };

  const menu = [
    {
      id: 1,
      icon: <MdEdit />,
      title: "Edit messsage",
      onClick: onOpen,
    },
    {
      id: 2,
      icon: <MdDelete />,
      title: "Removal is on your side",
      onClick: () => handleDeleteMessage("delete"),
    },
    {
      id: 3,
      icon: <RiDeleteBackFill />,
      title: "Recall with everyone",
      onClick: () => handleDeleteMessage("recall"),
    },
  ];

  return (
    <>
      <ul className="bg-light rounded-lg w-full py-2">
        {menu.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-light-400"
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MenuActionMessage;
