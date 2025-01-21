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
     * Logs when an event is emitted.
     * @param {string} eventName - The name of the event.
     */
    logEventEmitted(eventName) {
        console.log(`EVENT EMITTED: ${eventName}`);
    }

    /**
     * Logs when an event is handled.
     * @param {string} eventName - The name of the event.
     */
    logEventHandled(eventName) {
        console.log(`EVENT HANDLED: ${eventName}`);
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