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
        console.debug(`DEBUG: ${message}`);
    }

    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     */
    info(message) {
        console.info(`INFO: ${message}`);
    }

    /**
     * Logs when an event is emitted.
     * @param {string} eventName - The name of the event.
     */
    logEventEmitted(eventName) {
        console.info(`EVENT EMITTED: ${eventName} at ${new Date().toISOString()}`);
    }

    /**
     * Logs when an event is handled.
     * @param {string} eventName - The name of the event.
     */
    logEventHandled(eventName) {
        console.info(`EVENT HANDLED: ${eventName} at ${new Date().toISOString()}`);
    }

    /**
     * Logs a warning message.
     * @param {string} message - The message to log.
     */
    warn(message) {
        console.warn(`WARNING: ${message}`);
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