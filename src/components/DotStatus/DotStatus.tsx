import React from "react";
import { IoIosRadioButtonOn } from "react-icons/io";

interface DotStatusProps {
  active?: boolean;
  className?: string;
}

const DotStatus: React.FC<DotStatusProps> = ({ active, className }) => {
  return (
    <span className={className}>
      <IoIosRadioButtonOn
        className={`text-sm ${active ? "text-green-500" : "text-yellow-500"}`}
      />
    </span>
  );
};

export default DotStatus;
