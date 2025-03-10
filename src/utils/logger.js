// src/utils/logger.js

/**
 * Logger class for standardized logging.
 */
class Logger {
    /**
     * Logs a message with a specific log level.
     * @param {string} level - The log level (DEBUG, INFO, WARN, ERROR).
     * @param {string} message - The message to log.
     */
    log(level, message) {
        const timestamp = new Date().toISOString();
        console.log(`[${level}] [${timestamp}] ${message}`);
    }

    /**
     * Logs a debug message.
     * @param {string} message - The message to log.
     */
    debug(message) {
        this.log('DEBUG', message);
    }

    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     */
    info(message) {
        this.log('INFO', message);
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
        this.log('WARN', message);
    }

    /**
     * Logs an error message.
     * @param {string} message - The message to log.
     */
    error(message) {
        this.log('ERROR', message);
    }

    /**
     * Logs a startup message.
     * @param {string} message - The message to log.
     */
    startup(message) {
        this.log('STARTUP', message);
    }

    /**
     * Logs a runtime message.
     * @param {string} message - The message to log.
     */
    runtime(message) {
        this.log('RUNTIME', message);
    }
}

export { Logger };