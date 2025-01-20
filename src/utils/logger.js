// src/utils/logger.js

/**
 * Logger class for standardized logging.
 */
class Logger {
    /**
     * Logs a debug message.
     * @param {string} message - The message to log.
     */
    debug(message) {
        console.debug(`DEBUG [${new Date().toISOString()}]: ${message}`);
    }

    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     */
    info(message) {
        console.log(`INFO [${new Date().toISOString()}]: ${message}`);
    }

    /**
     * Logs a warning message.
     * @param {string} message - The message to log.
     */
    warn(message) {
        console.warn(`WARN [${new Date().toISOString()}]: ${message}`);
    }

    /**
     * Logs an error message.
     * @param {string} message - The message to log.
     * @param {Error} [error] - Optional error object for detailed logging.
     */
    error(message, error = null) {
        console.error(`ERROR [${new Date().toISOString()}]: ${message}`);
        if (error) {
            console.error(`ERROR DETAILS: ${error.stack || error.message}`);
        }
    }
}

module.exports = { Logger };