import React, { useEffect, useRef, useState } from "react";

interface PopoverProps {
  render: React.ReactNode;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ render, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = (): void => {
    setIsOpen(!isOpen);
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
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={togglePopover}>{children}</div>
      {isOpen && (
        <div className="absolute z-10 right-0 top-10 w-48 p-2 mt-2 bg-light rounded shadow-lg">
          {render}
        </div>
      )}
    </div>
  );
};

export default Popover;
