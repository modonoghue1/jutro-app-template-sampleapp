const { createLogger, transports } = require('winston');
const { format } = require('logform');

const logFormat = format.combine(
    format.timestamp(),
    format.align(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = createLogger({
    level: 'debug',
    format: logFormat,
    transports: [new transports.Console()],
});

/**
 * log
 * @param {object} logMessage
 */
function log(logMessage) {
    logger.log({
        level: 'debug',
        message: logMessage,
    });
}

/**
 * prettyPrintObject
 * @param {object} message
 * @param {object} object
 */
function prettyPrintObject(message, object) {
    const objectString = JSON.stringify(object, null, 2);
    log(message);
    log(objectString);
}

module.exports.log = log;
module.exports.prettyPrintObject = prettyPrintObject;
