/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

interface RoomContextProps {
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
}

const RoomContext = createContext<RoomContextProps>({} as RoomContextProps);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [roomId, setRoomId] = useState("");

  return (
    <RoomContext.Provider
      value={{
        roomId,
        setRoomId,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = (): RoomContextProps => {
  const context = useContext(RoomContext);
  if (typeof context === "undefined") {
    throw new Error("useRoom must be used within RoomProvider");
  }
  return context;
};
