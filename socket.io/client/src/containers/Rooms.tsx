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
    <nav>
      {roomId ? <div>Room Id: {roomId}</div> : "No room joined yet"}
      {currentRoomName && <div>Current Room Name: {currentRoomName}</div>}
      {!roomId && (
        <div>
          <input placeholder="Enter room name" ref={newRoomRef} />
          <button onClick={handleCreateRoom}>START</button>
        </div>
      )}

      <div>
        Available Rooms:
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button disabled={key === roomId} title={`Join ${rooms[key].name}`} onClick={() => handleJoinRoom(key)}>
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default RoomsContainer;
