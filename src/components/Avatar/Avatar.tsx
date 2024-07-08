import { LoadingSpinner } from "@/components/Loading";
import { Size } from "@/interfaces";
import { cva } from "class-variance-authority";
import React from "react";

interface AvatarProps {
  url: string;
  size?: Size;
  overlay?: boolean;
  className?: string;
}

const img = cva("rounded-full max-w-none object-cover", {
  variants: {
    size: {
      small: "size-8",
      medium: "size-8 md:size-10",
      large: "size-16 sm:size-20",
    },
  },
});

const Avatar: React.FC<AvatarProps> = ({
  url,
  size = Size.medium,
  overlay,
  className = "",
}) => {
  return (
    <div className={`relative cursor-pointer ${className}`}>
      <img src={url} alt="avatar-user" className={img({ size })} />
      {overlay && (
        <div className="absolute inset-0 center bg-primary/50 rounded-full">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Avatar;
