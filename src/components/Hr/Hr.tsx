import React from "react";

interface HrProps {
  title: string;
}

const Hr: React.FC<HrProps> = ({ title }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-full">
      <hr className="w-full h-px my-6 bg-main-100 border-0" />
      <span className="absolute px-3 font-medium text-main-200 -translate-x-1/2 bg-main-400 left-1/2">
        {title}
      </span>
    </div>
  );
};

export default Hr;
