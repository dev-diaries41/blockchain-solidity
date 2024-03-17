import { createLogger, format, transports } from 'winston';

const commonTransports = [
  new transports.Console(),
  new transports.File({
    filename: 'error.log',
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
  }),
];

const combinedTransport = new transports.File({
  filename: 'combined.log',
  level: 'debug',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
});

const eventTransporter = new transports.File({
  filename: 'event.log',
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.metadata(),
    format.json()
  ),
});

const logger = createLogger({
  transports: [...commonTransports, combinedTransport],
});

const eventLogger = createLogger({
  transports: [...commonTransports, eventTransporter],
});

export { logger, eventLogger };