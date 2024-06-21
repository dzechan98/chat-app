/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

interface ModalRoomChatProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRoomChatContext = createContext<ModalRoomChatProps>(
  {} as ModalRoomChatProps
);

export const ModalRoomChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <ModalRoomChatContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal,
      }}
    >
      {children}
    </ModalRoomChatContext.Provider>
  );
};

export const useModalRoomChat = (): ModalRoomChatProps => {
  const context = useContext(ModalRoomChatContext);
  if (typeof context === "undefined") {
    throw new Error(
      "useModalRoomChat must be used within ModalRoomChatContext"
    );
  }
  return context;
};
