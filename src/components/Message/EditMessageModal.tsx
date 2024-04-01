import { updateRoom } from "@/apis";
import { Button } from "@/components/Button";
import { Room, Size } from "@/interfaces";
import React, { useState } from "react";

interface EditMessageModalProps {
  idMessage: string;
  room: Room;
  onCloseModal: () => void;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({
  idMessage,
  room,
  onCloseModal,
}) => {
  const [content, setContent] = useState("");

  const handleUpdateMessage = () => {
    if (content.trim()) {
      const newListMessage = room.messages.map((message) => {
        if (message.id === idMessage) {
          return {
            ...message,
            content: content,
          };
        }
        return message;
      });
      onCloseModal();
      updateRoom(room.roomId, {
        messages: newListMessage,
      } as Room);
    }
  };

  return (
    <div className="rounded-lg shadow border border-light-200 bg-light w-[400px] p-2">
      <div className="w-full mb-5">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full outline-none"
          placeholder="Enter messages..."
        />
      </div>
      <div className="flex items-stretch justify-end gap-2">
        <Button size={Size.small} intent="outline" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button size={Size.small} onClick={handleUpdateMessage}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditMessageModal;
