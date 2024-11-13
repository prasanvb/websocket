import { Server, Socket } from 'socket.io';
import log from './log/pino';

const EVENTS = {
  connection: 'connection',
};

function socket({ io }: { io: Server }) {
  log.info('🔌 Socket enabled');

  io.on(EVENTS.connection, (socket: Socket) => {
    console.log({ socket });
    log.info(`User connected ${socket.id}`);
  });
}

export default socket;
