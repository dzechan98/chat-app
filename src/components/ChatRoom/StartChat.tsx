import { Avatar } from "@/components/Avatar";
import { Title } from "@/components/Title";
import { Size } from "@/interfaces";
import React from "react";

interface StartChatProps {
  url: string;
  name: string;
}

const StartChat: React.FC<StartChatProps> = ({ url, name }) => {
  return (
    <div className="h-full w-full center flex-col gap-4">
      <Avatar url={url} size={Size.large} />
      <Title className="text-2xl text-main-100">{name}</Title>
      <Title className="text-main-200">{`You and ${
        name.split(" ")[0]
      } don't have any messages yet`}</Title>
    </div>
  );
};

export default StartChat;
