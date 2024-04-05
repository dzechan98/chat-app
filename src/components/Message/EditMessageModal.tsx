import { updateRoom } from "@/apis";
import { Button } from "@/components/Button";
import { Room, Size } from "@/interfaces";
import React, { useEffect, useRef, useState } from "react";

interface EditMessageModalProps {
  idMessage: string;
  room: Room;
  message: string;
  onCloseModal: () => void;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({
  idMessage,
  message,
  room,
  onCloseModal,
}) => {
  const [content, setContent] = useState(message);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleUpdateMessage = () => {
    if (content.trim()) {
      const newListMessage = room.messages.map((message) => {
        if (message.id === idMessage) {
          return {
            ...message,
            isEdit: true,
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="rounded-lg shadow border border-light-200 bg-light w-[400px] p-2">
      <div className="w-full mb-5">
        <textarea
          value={content}
          ref={inputRef}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdateMessage();
            }
          }}
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
