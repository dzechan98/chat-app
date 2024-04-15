import { RiProfileLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "@/contexts";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants";

const MenuActionUser = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const menu = [
    {
      id: 1,
      title: "Profile",
      icon: <RiProfileLine />,
      onClick: () => {
        navigate(paths.profile);
      },
    },
    {
      id: 2,
      title: "Setting",
      icon: <IoSettingsOutline />,
      onClick: () => {},
    },
    {
      id: 3,
      title: "Sign out",
      icon: <GoSignOut />,
      onClick: signOut,
    },
  ];

  return (
    <ul className="bg-main-400 rounded-md w-full py-4">
      {menu.map((item) => (
        <li
          key={item.id}
          className="cursor-pointer text-main-100 flex items-center font-semibold gap-2 px-2 py-1 hover:bg-main-300"
          onClick={item.onClick}
        >
          {item.icon}
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default MenuActionUser;
