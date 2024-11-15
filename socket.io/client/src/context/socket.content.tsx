"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "src/config/events";

interface MessageType {
  id: string;
  username: string;
  message: string;
  date: string;
}

interface ContextType {
  socket: Socket;
  username?: string;
  setUsername: Dispatch<SetStateAction<string>>;
  roomId?: string;
  rooms: Record<string, { name: string }>;
  messages?: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
}
console.log("SocketContext Rendered");
const socket = io(SOCKET_URL);

// NOTE: Type definition for createContext. Notice `SetStateAction` types default value
const SocketContext = createContext<ContextType>({
  socket,
  setUsername: () => false,
  rooms: {},
  setMessages: () => false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<MessageType[]>([]);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
  });

  socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ id, username, message, date }: MessageType) => {
    setMessages([...messages, { id, username, message, date }]);
  });

  return (
    <SocketContext.Provider value={{ socket, username, setUsername, rooms, roomId, messages, setMessages }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
