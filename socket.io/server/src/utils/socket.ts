import EVENTS from './events';
import { Server, Socket } from 'socket.io';
import log from '../log/pino';
import { randomUUID } from 'crypto';

const rooms: Record<string, { name: string }> = {};

let messages: {
  roomId: string;
  id: string;
  username: string;
  message: string;
  date: string;
}[] = [];

const socket = ({ io }: { io: Server }) => {
  log.info('🔌 Socket enabled');

  io.on(EVENTS.connection, (socket: Socket) => {
    // console.log(socket.handshake.headers['user-agent']);
    log.info(`User connected ${socket.id}`);

    /*
     * Emit all available rooms to user after connection
     */
    socket.emit(EVENTS.SERVER.ROOMS, rooms);

    /*
     * When a user creates a new room object
     */

    socket.on(
      EVENTS.CLIENT.CREATE_ROOM,
      ({ roomName }: { roomName: string }) => {
        // console.log({ currentRooms: rooms });
        // create a roomId
        const roomId = randomUUID();

        // add a new room to the rooms object
        rooms[roomId] = {
          name: roomName,
        };

        // socket join the room
        socket.join(roomId);

        // broadcast an event saying there is a new room
        socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

        // emit back to the room creator with all the rooms
        socket.emit(EVENTS.SERVER.ROOMS, rooms);

        // emit event back the room creator saying they have joined a room
        socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
      },
    );

    /*
     * When a user sends a room message
     */
    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ id, roomId, username, message }) => {
        const date = new Date().toISOString();

        console.log('SEND_ROOM_MESSAGE', { id, roomId, username, message });
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          id,
          username,
          message,
          date,
        });

        messages = [...messages, { id, roomId, username, message, date }];

        console.log({ messages });
      },
    );

    /*
     * When user request to join a room
     */
    socket.on(EVENTS.CLIENT.JOIN_ROOM_REQUEST, (roomId) => {
      // Socket join Room
      socket.join(roomId);

      // emit event back the room creator saying they have joined a room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
  });
};

export default socket;
