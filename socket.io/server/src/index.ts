import express, { Request, Response } from 'express';
import log from './log/pino';
import config from 'config';
import { createServer } from 'http';
import { Server } from 'socket.io';
// import cors from 'cors';

const port = config.get<number>('port');
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');

const app = express();

app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    // setting allows cookies and other credentials (such as authentication) to be included with requests.
    credentials: true,
  },
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is up');
});

httpServer.listen(port, host, () => {
  log.info(`🚀 Server listing http://${host}:${port} 🎃`);
});
