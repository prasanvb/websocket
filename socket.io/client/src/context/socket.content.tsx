"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";

interface ContextType {
  socket: Socket;
  username?: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

const socket = io(SOCKET_URL);
const SocketContext = createContext<ContextType>({ socket, setUsername: () => false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SocketProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");

  return <SocketContext.Provider value={{ socket, username, setUsername }}>{children}</SocketContext.Provider>;
}

export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
