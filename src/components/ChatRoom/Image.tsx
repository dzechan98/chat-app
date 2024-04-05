import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface ImageProps {
  url?: string;
  onRemoveImage?: () => void;
}

const Image: React.FC<ImageProps> = ({ url, onRemoveImage = () => {} }) => {
  return (
    <div className="relative size-10 rounded-md center bg-light opacity-50">
      {url && (
        <img
          src={url}
          alt=""
          className="w-full h-full object-cover rounded-md"
        />
      )}
      {!url && (
        <div className="border-t-transparent border-2 size-4 border-primary rounded-full animate-spin"></div>
      )}
      <span
        className="absolute cursor-pointer text-xl -translate-y-1/2 translate-x-1/2 right-0 top-0 text-primary"
        onClick={onRemoveImage}
      >
        <IoCloseCircleOutline />
      </span>
    </div>
  );
};

export default Image;
