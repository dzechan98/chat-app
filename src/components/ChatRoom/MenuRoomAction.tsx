import { deleteRoom } from "@/apis";
import { useRoom } from "@/contexts";
import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface MenuRoomActionProps {
  roomId: string;
  onOpenInfoUser: () => void;
}

const MenuRoomAction: React.FC<MenuRoomActionProps> = ({
  roomId,
  onOpenInfoUser,
}) => {
  const { setRoomId } = useRoom();
  const navigate = useNavigate();

  const handleDeleteRoom = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "Deleted!",
        text: "This room has been deleted.",
        icon: "success",
      });
      await deleteRoom(roomId);
      setRoomId("");
      navigate(-1);
    }
  };

  const menu = [
    {
      title: "Info",
      icon: <IoIosInformationCircleOutline />,
      onClick: onOpenInfoUser,
    },
    {
      title: "Delete",
      icon: <MdDeleteOutline />,
      onClick: handleDeleteRoom,
    },
  ];

  return (
    <ul className="py-2 rounded-lg shadow-sm bg-main-400">
      {menu.map((item, index) => (
        <li
          key={index}
          className="px-2 py-1 flex items-center gap-2 text-main-100 hover:bg-main-300"
          onClick={item.onClick}
        >
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default MenuRoomAction;
