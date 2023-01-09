import { createLogger, transports, format } from "winston";
import * as dotenv from 'dotenv';
import DailyRotateFile from 'winston-daily-rotate-file';

dotenv.config()

const fileName: string = process.env.LOGS_FOLDER + "logs";

let logTransports = process.env.PRODUCTION === "true" ?
    [new DailyRotateFile(
        {
            filename: fileName,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info'
        }
    )]
    : [new transports.Console()];

export const logger = createLogger({
    transports: logTransports,
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});