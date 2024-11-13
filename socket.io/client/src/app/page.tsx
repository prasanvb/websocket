"use client";

import styles from "./page.module.css";
import { useSockets } from "../context/socket.content";
import React, { useEffect, useRef, useState } from "react";
import MessagesConatiners from "../containers/Messages";
import RoomsConatiners from "../containers/Rooms";

export default function Home() {
  // NOTE: Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used
  const [domLoaded, setDomLoaded] = useState(false);
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const handleUsername = () => {
    if (usernameRef.current && usernameRef.current.value) {
      const value = usernameRef.current.value;
      setUsername(value);
      localStorage.setItem("username", value);
    }
  };

  if (!username) {
    return (
      <div className={styles.page}>
        <input placeholder="enter username" ref={usernameRef} />
        <button onClick={handleUsername}>START</button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main>
        {domLoaded && socket.id}
        <MessagesConatiners />
        <RoomsConatiners />
      </main>
    </div>
  );
}
