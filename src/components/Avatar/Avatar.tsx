import { DotStatus } from "@/components/DotStatus";
import { Size } from "@/interfaces";
import { cva } from "class-variance-authority";
import React from "react";

interface AvatarProps {
  url: string;
  iconActive?: boolean;
  active?: boolean;
  size?: Size;
  className?: string;
}

const img = cva("rounded-full", {
  variants: {
    size: {
      small: "size-8",
      medium: "size-10",
      large: "size-20",
    },
  },
});

const Avatar: React.FC<AvatarProps> = ({
  url,
  iconActive,
  active,
  size = Size.medium,
  className,
}) => {
  return (
    <div className={`relative cursor-pointer ${className}`}>
      <img src={url} alt="avatar-user" className={img({ size })} />
      {iconActive && (
        <DotStatus className="absolute right-0 bottom-0" active={active} />
      )}
    </div>
  );
};

export default Avatar;
