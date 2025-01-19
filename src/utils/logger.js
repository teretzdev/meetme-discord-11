// src/utils/logger.js

/**
 * Logger class for standardized logging.
 */
class Logger {
    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     */
    info(message) {
        console.log(`INFO: ${message}`);
    }

    /**
     * Logs a warning message.
     * @param {string} message - The message to log.
     */
    warn(message) {
        console.warn(`WARN: ${message}`);
    }

    /**
     * Logs an error message.
     * @param {string} message - The message to log.
     */
    error(message) {
        console.error(`ERROR: ${message}`);
    }
}

module.exports = { Logger };
