import React from "react";

interface HrProps {
  title: string;
}

const Hr: React.FC<HrProps> = ({ title }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-full">
      <hr className="w-full h-px my-8 bg-gray-200 border-0" />
      <span className="absolute px-3 font-medium text-main-200 -translate-x-1/2 bg-light left-1/2">
        {title}
      </span>
    </div>
  );
};

export default Hr;
