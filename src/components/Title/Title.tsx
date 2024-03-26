import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h2 className={`font-medium text-main-100 ${className}`}>{children}</h2>
  );
};

export default Title;
