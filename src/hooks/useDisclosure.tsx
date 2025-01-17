import { useState } from "react";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    toggleOpen,
  };
};

export default useDisclosure;
