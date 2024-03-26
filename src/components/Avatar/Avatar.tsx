import { DotStatus } from "@/components/DotStatus";
import React from "react";

interface AvatarProps {
  url: string;
  iconActive?: boolean;
  active?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ url, iconActive, active }) => {
  return (
    <div className="relative cursor-pointer">
      <img src={url} alt="avatar-user" className="size-10 rounded-full" />
      {iconActive && (
        <DotStatus className="absolute right-0 bottom-0" active={active} />
      )}
    </div>
  );
};

export default Avatar;
