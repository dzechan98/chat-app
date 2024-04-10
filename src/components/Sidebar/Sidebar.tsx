import { FaRegUser } from "react-icons/fa";
import { BsChatSquareDots } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiUserSharedLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/contexts";

const styleActive = "p-4 text-primary text-lg rounded-lg bg-primary/20";
const styleNotActive =
  "p-4 text-main-200 text-lg rounded-lg hover:bg-primary/20 hover:text-primary";

const Sidebar = () => {
  const { currentUser, signOut } = useAuth();
  const { theme, handleToggleTheme } = useTheme();

  const menuSidebar = [
    { id: 1, icon: <FaRegUser className="text-2xl" />, to: "/" },
    {
      id: 2,
      icon: <BsChatSquareDots className="text-2xl" />,
      to: "/chat",
    },
    {
      id: 3,
      icon: <FiUsers className="text-2xl" />,
      to: "/2",
    },
    {
      id: 4,
      icon: <RiUserSharedLine className="text-2xl" />,
      to: "/3",
    },
    {
      id: 5,
      icon: <IoSettingsOutline className="text-2xl" />,
      to: "/4",
    },
  ];

  return (
    <div className="py-8 w-[75px] max-w-[75px] flex items-center justify-between flex-col h-screen shadow-xl">
      <Logo logoString={false} />
      <div className="center flex-col gap-2">
        {menuSidebar.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              isActive ? styleActive : styleNotActive
            }
          >
            {item.icon}
          </NavLink>
        ))}
      </div>
      <div className="center flex-col gap-4">
        <Button onClick={signOut}>Sign out</Button>
        <span
          className="block p-4 text-2xl cursor-pointer bg-primary/50 rounded-md text-primary"
          onClick={handleToggleTheme}
        >
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </span>
        <Avatar url={String(currentUser?.photoURL)} />
      </div>
    </div>
  );
};

export default Sidebar;
