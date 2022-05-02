import 'dotenv/config';
const winston = require('winston');
require('winston-daily-rotate-file');

const { format, transports, config } = winston;

const transporter = [];
transporter.push(new transports.Console());

const logger = new winston.createLogger({
  levels: config.npm.levels,
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(
      (info) => `${info.level} : ${info.timestamp} : ${info.stack || info.message}`,
    ),
  ),
  transports: transporter,
  exitOnError: false,
});

export default logger;
