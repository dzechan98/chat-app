import React from "react";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({
  className = "text-main-100",
  children,
}) => {
  return <h2 className={`font-medium ${className}`}>{children}</h2>;
};

export default Title;
