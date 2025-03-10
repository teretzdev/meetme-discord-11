/**
 * src/utils/startupLogger.js
 * 
 * A dedicated module for centralized application startup logging.
 * Provides methods to log initialization steps, configuration loading, and successful startup events.
 */

import { Logger } from './logger.js';

/**
 * StartupLogger class for centralized logging during application initialization.
 */
class StartupLogger {
    constructor() {
        this.logger = new Logger();
    }

    /**
     * Logs the beginning of the application startup process.
     */
    logStartupBegin() {
        this.logger.info('Application startup process initiated.');
    }

    /**
     * Logs the loading of configuration files.
     * @param {string} configName - The name of the configuration being loaded.
     */
    logConfigLoading(configName) {
        this.logger.info(`Loading configuration: ${configName}`);
    }

    /**
     * Logs the successful loading of a configuration file.
     * @param {string} configName - The name of the configuration that was successfully loaded.
     */
    logConfigLoaded(configName) {
        this.logger.info(`Configuration loaded successfully: ${configName}`);
    }

    /**
     * Logs the completion of the application startup process.
     */
    logStartupComplete() {
        this.logger.info('Application startup process completed successfully.');
    }

    /**
     * Logs an error that occurs during the startup process.
     * @param {string} errorMessage - The error message to log.
     */
    logStartupError(errorMessage) {
        this.logger.error(`Startup error: ${errorMessage}`);
    }
}

export { StartupLogger };
