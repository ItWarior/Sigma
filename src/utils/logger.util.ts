import { createLogger, format, transports } from 'winston';

const { combine, timestamp, simple } = format;

const log = createLogger({
  level: 'silly',
  format: combine(timestamp(), simple()),
  transports: [new transports.Console()],
  exitOnError: false,
});

export default log;
