// Imports
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, errors } = format;
//require('winston-mongodb');
require('express-async-errors');

// Log format definition
const myFormat = printf(({ level, message, timestamp, errors }) => {
    return `[${timestamp}] [${level}]: ${message} \n ${errors}`;
});

const logger = createLogger({
    format: format.combine(
        timestamp(),
        myFormat
        ),
    transports: [
        new winston.transports.Console({colorize: true}),
        new winston.transports.File({ filename: 'systemLog.log' }),
        //new winston.transports.MongoDB({ db:'mongodb://localhost/vidly', level: 'info' })
    ]
});

module.exports = logger;
