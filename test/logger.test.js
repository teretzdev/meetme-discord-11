// test/logger.test.js

const { Logger } = require('../src/utils/logger');

describe('Logger', () => {
    let logger;
    let consoleLogSpy;
    let consoleWarnSpy;
    let consoleErrorSpy;

    beforeEach(() => {
        logger = new Logger();
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log informational messages correctly', () => {
        const message = 'This is an info message';
        logger.info(message);
        expect(consoleLogSpy).toHaveBeenCalledWith(`INFO: ${message}`);
    });

    it('should log event emissions correctly', () => {
        const eventName = 'testEvent';
        const timestamp = new Date().toISOString();
        logger.logEventEmitted(eventName);
        expect(consoleLogSpy).toHaveBeenCalledWith(`EVENT EMITTED: ${eventName} at ${timestamp}`);
    });

    it('should log event handling correctly', () => {
        const eventName = 'testEvent';
        const timestamp = new Date().toISOString();
        logger.logEventHandled(eventName);
        expect(consoleLogSpy).toHaveBeenCalledWith(`EVENT HANDLED: ${eventName} at ${timestamp}`);
    });

    it('should log warnings correctly', () => {
        const message = 'This is a warning message';
        logger.warn(message);
        expect(consoleWarnSpy).toHaveBeenCalledWith(`WARN: ${message}`);
    });

    it('should log errors correctly', () => {
        const message = 'This is an error message';
        logger.error(message);
        expect(consoleErrorSpy).toHaveBeenCalledWith(`ERROR: ${message}`);
    });
});
