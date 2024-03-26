import React from "react";
import logoStringImg from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { paths } from "@/constants";
import { LogoIcon } from "@/components/Icon";

interface LogoProps {
  logoString?: boolean;
}

const Logo: React.FC<LogoProps> = ({ logoString = true }) => {
  return (
    <Link to={paths.home} className="center mb-10">
      {logoString && (
        <img src={logoStringImg} alt="logo" className="h-[30px]" />
      )}
      {!logoString && <LogoIcon />}
    </Link>
  );
};

export default Logo;
