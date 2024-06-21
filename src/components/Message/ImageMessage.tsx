import React from "react";

interface ImageMessageProps {
  url: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const ImageMessage: React.FC<ImageMessageProps> = ({
  url,
  className,
  onClick = () => {},
  children,
}) => {
  return (
    <div className={`max-w-full md:max-w-[400px] rounded-md ${className}`}>
      <img
        src={url}
        alt=""
        className="w-full object-cover max-w-[200px] sm:max-h-[300px] rounded-md"
        onClick={onClick}
      />
      {children}
    </div>
  );
};

export default ImageMessage;
