import { useDisclosure } from "@/hooks";
import React from "react";

interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, icon, children }) => {
  const showDisclosure = useDisclosure();

  return (
    <div className="w-full border border-light-200 rounded-md text-main-100">
      <div
        className="flex justify-between items-center text-left cursor-pointer px-4 py-2"
        onClick={showDisclosure.toggleOpen}
      >
        <div className="flex items-center gap-2 font-semibold ">
          {icon}
          <span>{title}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${
            showDisclosure.isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {showDisclosure.isOpen && (
        <div className="border-t border-light-200">{children}</div>
      )}
    </div>
  );
};

export default Accordion;
