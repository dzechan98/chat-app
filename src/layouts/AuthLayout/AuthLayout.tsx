import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SignInMethod } from "@/components/SignInMethod";
import { Hr } from "@/components/Hr";

interface AuthLayoutProps {
  title: string;
  subTitle: string;
  heading: string;
  subHeading: string;
  path: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subTitle,
  heading,
  subHeading,
  path,
  children,
}) => {
  return (
    <div className="w-screen min-h-screen bg-main-300 center p-2 md:p-10">
      <div className="w-full max-w-[500px] md:px-3 center flex-col text-main-200">
        <Logo />
        <h4 className="hidden sm:block text-lg font-bold text-main-100 mb-2">
          {title}
        </h4>
        <p className="text-sm font-medium my-4 sm:mt-0 ">{subTitle}</p>
        <div className="w-full shadow-lg bg-main-400 p-4 md:p-12 rounded-md text-main-100 mb-5 md:mb-10">
          {children}
          <Hr title="Or" />
          <SignInMethod />
        </div>
        <div className="text-sm text-center sm:text-[16px] center gap-1 mb-3">
          <span>{heading}</span>
          <Link to={path} className="text-primary font-medium">
            {subHeading}
          </Link>
        </div>
        <p className="text-sm text-center sm:text-[16px]">
          © 2024 Chatvia. Crafted with by Themesbrand
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
