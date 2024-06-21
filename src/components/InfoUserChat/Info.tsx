import React from "react";
import { Accordion } from "@/components/Accordion";
import { Avatar } from "@/components/Avatar";
import { DotStatus } from "@/components/DotStatus";
import { Title } from "@/components/Title";
import { MenuInfoAccordion, Size } from "@/interfaces";
import { Button } from "@/components/Button";
import { paths } from "@/constants";
import { useWidth } from "@/hooks";
import { useMatch, useNavigate } from "react-router-dom";

interface InfoProps {
  photoURL: string;
  displayName: string;
  active?: boolean;
  menuInfoAccordion: MenuInfoAccordion[];
}

const Info: React.FC<InfoProps> = ({
  active,
  displayName,
  menuInfoAccordion,
  photoURL,
}) => {
  const isProfile = useMatch("/profile");
  const { width } = useWidth();
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[250px] w-full center flex-col gap-3 border-light-200 border-b">
        <div className="rounded-full border border-light-200">
          <Avatar size={Size.large} url={String(photoURL)} />
        </div>
        <Title className="text-lg text-main-100">{displayName}</Title>
        <div className="center gap-1">
          <DotStatus active={active} />
          <span className="text-main-200 text-sm font-medium">
            {active ? "Active" : "Not active"}
          </span>
        </div>
      </div>
      <div className="max-h-[calc(100%-290px)] overflow-y-auto flex flex-col gap-2 px-2 md:px-4 my-5">
        {menuInfoAccordion.map((accordion, index) => (
          <Accordion key={index} title={accordion.title} icon={accordion.icon}>
            {accordion.children}
          </Accordion>
        ))}
      </div>
      {isProfile && (
        <div className="center">
          <Button
            size={width >= 768 ? Size.medium : Size.small}
            onClick={() => navigate(paths.updateProfile)}
          >
            Update profile
          </Button>
        </div>
      )}
    </>
  );
};

export default Info;
