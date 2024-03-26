import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { paths } from "@/constants";
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
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      navigate(paths.home);
    }
  }, [currentUser]);

  return (
    <div className="bg-light-100 center p-10">
      <div className="w-[500px] px-3 center flex-col text-main-200">
        <Logo />
        <h4 className="text-lg font-bold text-main-100 mb-2">{title}</h4>
        <p className="text-sm font-medium mb-4">{subTitle}</p>
        <div className="w-full bg-light p-12 rounded-md text-main-100 mb-10">
          {children}
          <Hr title="Or" />
          <SignInMethod />
        </div>
        <div className="center gap-1 mb-3">
          <span>{heading}</span>
          <Link to={path} className="text-primary">
            {subHeading}
          </Link>
        </div>
        <p>© 2024 Chatvia. Crafted with by Themesbrand</p>
      </div>
    </div>
  );
};

export default AuthLayout;
