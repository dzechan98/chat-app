import { Size } from "@/interfaces";
import { cva } from "class-variance-authority";
import React, { useEffect, useRef, useState } from "react";

interface PopoverProps {
  position?: "left" | "right" | "top-right" | "top-left";
  size?: Size;
  render: React.ReactNode;
  children: React.ReactNode;
}

const popover = cva("absolute z-10 bg-light rounded-lg shadow", {
  variants: {
    position: {
      left: "left-[calc(100%+5px)] top-[calc(100%+2px)]",
      right: "right-[calc(100%+5px)] top-[calc(100%+2px)]",
      "top-right": "left-[calc(100%+5px)] bottom-[calc(100%+2px)]",
      "top-left": "right-[calc(100%+5px)] bottom-[calc(100%+2px)]",
    },
    size: {
      small: "w-[200px]",
      medium: "w-[280px]",
      large: "w-[360px]",
    },
  },
});

const Popover: React.FC<PopoverProps> = ({
  position = "left",
  size = Size.small,
  render,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={togglePopover}>{children}</div>
      {isOpen && (
        <div className={popover({ position, size })}>
          <div onClick={togglePopover}>{render}</div>
        </div>
      )}
    </div>
  );
};

export default Popover;
