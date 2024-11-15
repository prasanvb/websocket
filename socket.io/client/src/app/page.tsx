"use client";

import styles from "./page.module.css";
import { useSockets } from "../context/socket.content";
import React, { useEffect, useRef } from "react";
import MessagesConatiners from "../containers/Messages";
import RoomsConatiners from "../containers/Rooms";

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.value = localStorage.getItem("username") ?? "";
    }
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
      <div className={styles.usernameWrapper}>
        <div className={styles.usernameInner}>
          <input placeholder="Enter Username" ref={usernameRef} />
          <button onClick={handleUsername}>START</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!!socket && <p>Socket connection id: {socket.id}</p>}
      <div>Username: {username}</div>
      <RoomsConatiners />
      <MessagesConatiners />
    </div>
  );
}
