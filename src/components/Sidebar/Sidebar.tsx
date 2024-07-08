import { FaRegUser } from "react-icons/fa";
import { BsChatSquareDots } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/contexts";
import { Popover } from "@/components/Popover";
import MenuActionUser from "@/components/Sidebar/MenuActionUser";
import { paths } from "@/constants";
import { useWidth } from "@/hooks";

const styleActive =
  "p-2 sm:p-4 text-primary text-sm sm:text-lg rounded-lg bg-primary/20";
const styleNotActive =
  "p-2 sm:p-4 text-main-200 text-sm sm:text-lg rounded-lg hover:bg-primary/20 hover:text-primary";

const Sidebar = () => {
  const { currentUser } = useAuth();
  const { theme, handleToggleTheme } = useTheme();
  const { width } = useWidth();

  const menuSidebar = [
    { id: 1, icon: <FaRegUser className="text-2xl" />, to: paths.profile },
    {
      id: 2,
      icon: <BsChatSquareDots className="text-2xl" />,
      to: paths.chat,
    },
  ];

  return (
    <div className="fixed z-[10000] w-full px-6 lg:z-10 lg:px-0 h-20 bottom-0 bg-layout lg:py-8 lg:relative lg:w-[75px] lg:min-w-[75px] lg:max-h-screen flex items-center justify-between lg:flex-col lg:h-screen shadow-2xl">
      <Logo logoString={false} />
      <div className="center lg:flex-col gap-2">
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
      <div className="center lg:flex-col gap-4">
        <span
          className="block fixed top-4 right-6 lg:inset-0 lg:relative p-2 md:p-4 text-2xl cursor-pointer bg-primary/50 rounded-md text-primary"
          onClick={handleToggleTheme}
        >
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </span>
        <Popover
          position={width > 1023 ? "bottom-right" : "bottom-left"}
          render={<MenuActionUser />}
        >
          <Avatar url={String(currentUser?.photoURL)} />
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
