import pino from 'pino';

const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${new Date().toLocaleString()}"`,
});

export default log;
