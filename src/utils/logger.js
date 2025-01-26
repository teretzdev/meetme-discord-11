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
        console.log(`[${new Date().toISOString()}] INFO: ${message}`);
    }

    /**
     * Logs when an event is emitted.
     * @param {string} eventName - The name of the event.
     */
    logEventEmitted(eventName) {
        console.info(`[${new Date().toISOString()}] EVENT EMITTED: ${eventName}`);
    }

    /**
     * Logs when an event is handled.
     * @param {string} eventName - The name of the event.
     */
    logEventHandled(eventName) {
        console.info(`[${new Date().toISOString()}] EVENT HANDLED: ${eventName}`);
    }

    /**
     * Logs a warning message.
     * @param {string} message - The message to log.
     */
    warn(message) {
        console.warn(`[${new Date().toISOString()}] WARNING: ${message}`);
    }

    /**
     * Logs an error message.
     * @param {string} message - The message to log.
     */
    error(message) {
        console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
    }
}

module.exports = { Logger };