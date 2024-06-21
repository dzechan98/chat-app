import React from "react";
import { Link } from "react-router-dom";
import { paths } from "@/constants";
import { LogoIcon } from "@/components/Icon";

interface LogoProps {
  logoString?: boolean;
}

const Logo: React.FC<LogoProps> = ({ logoString = true }) => {
  return (
    <Link to={paths.chat} className="center flex items-center gap-1">
      <LogoIcon />
      {logoString && (
        <span className="font-bold text-xl text-main-100">Chat via</span>
      )}
    </Link>
  );
};

export default Logo;
