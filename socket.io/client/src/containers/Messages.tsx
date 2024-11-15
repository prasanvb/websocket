import EVENTS from "src/config/events";
import { useSockets } from "../context/socket.content";
import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const MessagesContainer = () => {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSendMessage = () => {
    if (newMessageRef.current && newMessageRef.current.value) {
      const message = newMessageRef.current.value.trim();

      socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { id: uuidv4(), roomId, username, message });

      if (messages) {
        const date = new Date().toISOString();

        setMessages([
          ...messages,
          {
            id: "temp id",
            username: "You",
            message,
            date,
          },
        ]);
      }

      newMessageRef.current.value = "";
    }
  };

  if (!roomId) {
    return null;
  }

  return (
    <>
      <div>
        {messages?.map(({ message, username, date }, index) => {
          return (
            <div key={index}>
              <div>
                <span>
                  {username} - {date}
                </span>
                <span>
                  {"  "}
                  {message}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <textarea rows={1} placeholder="Tell us what you think" ref={newMessageRef} />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </>
  );
};

export default MessagesContainer;
