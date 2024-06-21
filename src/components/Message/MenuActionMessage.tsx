import { updateRoom } from "@/apis";
import { Room } from "@/interfaces";
import moment from "moment";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

interface MenuActionMessageProps {
  messageId: string;
  room: Room;
  hiddenActionEdit?: boolean;
  onOpen: () => void;
}

const MenuActionMessage: React.FC<MenuActionMessageProps> = ({
  messageId,
  hiddenActionEdit = false,
  room,
  onOpen,
}) => {
  const handleDeleteMessage = async () => {
    const result = await Swal.fire({
      customClass: {
        container: "my-swal",
      },
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const newListMessage = room.messages.map((message) => {
        if (message.id === messageId) {
          return {
            ...message,
            isDelete: true,
            time: moment(new Date()).format(),
          };
        }
        return message;
      });
      await Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Deleted!",
        text: "Your message has been deleted.",
        icon: "success",
      });
      await updateRoom(room.roomId, {
        messages: newListMessage,
      } as Room);
    }
  };

  const menu = [
    {
      id: 1,
      icon: <MdEdit />,
      title: "Edit messsage",
      onClick: onOpen,
      hidden: hiddenActionEdit,
    },
    {
      id: 2,
      icon: <MdDelete />,
      title: "Remove this message",
      onClick: handleDeleteMessage,
      hidden: false,
    },
  ];

  return (
    <ul className="bg-main-400 rounded-lg w-full py-2">
      {menu.map((item) => (
        <li
          key={item.id}
          className={`cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-main-300 ${
            item.hidden ? "hidden" : "block"
          }`}
          onClick={item.onClick}
        >
          {item.icon}
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default MenuActionMessage;
