import styles from "./Room.module.css";
import EVENTS from "src/config/events";
import { useSockets } from "../context/socket.content";
import React, { useRef } from "react";

const RoomsContainer = () => {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement | null>(null);

  const handleCreateRoom = () => {
    if (newRoomRef.current && newRoomRef.current.value) {
      // get the room name
      const roomName = newRoomRef.current.value;

      // emit room name event to server
      socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

      // set room name input value to empty string
      newRoomRef.current.value = "";
    }
  };

  const handleJoinRoom = (key: string) => {
    if (key) {
      socket.emit(EVENTS.CLIENT.JOIN_ROOM_REQUEST, key);
    }
  };

  let currentRoomName;
  if (roomId) {
    const currentRoom = Object.entries(rooms).find((room) => room[0] === roomId);

    currentRoomName = currentRoom ? currentRoom[1].name : "No room joined yet";
  }

  return (
    <nav className={styles.wrapper}>
      {!roomId && (
        <div className={styles.createRoomWrapper}>
          <input placeholder="Enter room name" ref={newRoomRef} />
          <button className="cta" onClick={handleCreateRoom}>
            START
          </button>
        </div>
      )}

      <div>
        <div>
          {currentRoomName && (
            <div>
              Current Room Name:{" "}
              <button className="cta" disabled>
                {currentRoomName.toLocaleUpperCase()}
              </button>
            </div>
          )}
        </div>
        <div>
          Available Rooms:
          <ul className={styles.roomList}>
            {Object.keys(rooms).map((key) => {
              const roomName = rooms[key].name.toLocaleUpperCase();
              return (
                <div key={key}>
                  <button
                    className="cta"
                    disabled={key === roomId}
                    title={`Join ${rooms[key].name}`}
                    onClick={() => handleJoinRoom(key)}
                  >
                    {roomName}
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default RoomsContainer;
