import React from "react";
import logoImg from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { paths } from "@/constants";

const Logo = () => {
  return (
    <Link to={paths.home} className="mb-10">
      <img src={logoImg} alt="logo" className="h-[30px]" />
    </Link>
  );
};

export default Logo;
