import styles from "./Messages.module.css";
import EVENTS from "src/config/events";
import { useSockets } from "../context/socket.content";
import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const MessagesContainer = () => {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<HTMLTextAreaElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
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
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages?.map(({ message, username, date }, index) => {
          return (
            <div key={index} className={styles.message}>
              <div className={styles.messageInner}>
                <span className={styles.messageSender}>
                  {username} - {date}
                </span>
                <span className={styles.messageBody}>
                  {"  "}
                  {message}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef}></div>
      </div>

      <div className={styles.messageBox}>
        <textarea rows={1} placeholder="Tell us what you think" ref={newMessageRef} />
        <button className="cta" onClick={handleSendMessage}>
          SEND
        </button>
      </div>
    </div>
  );
};

export default MessagesContainer;
