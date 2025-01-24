// test/fetchMessages.test.js

const puppeteer = require('puppeteer');
const eventEmitter = require('../src/events/eventEmitter');
const { Logger } = require('../src/utils/logger');
const { setup } = require('../src/utils/setup.cjs');
const { fetchMessages } = require('../fetchMessages');

// Mock dependencies
jest.mock('puppeteer');
jest.mock('../src/events/eventEmitter');
jest.mock('../src/utils/logger');
jest.mock('../src/utils/setup.cjs');

// Setup mock implementations
beforeEach(() => {
    puppeteer.launch.mockResolvedValue({
        newPage: jest.fn().mockResolvedValue({
            goto: jest.fn(),
            type: jest.fn(),
            click: jest.fn(),
            waitForNavigation: jest.fn(),
            evaluate: jest.fn().mockResolvedValue([]),
            close: jest.fn()
        }),
        close: jest.fn()
    });

    setup.mockResolvedValue();
    Logger.mockImplementation(() => ({
        info: jest.fn(),
        error: jest.fn(),
        logEventEmitted: jest.fn()
    }));
});

describe('fetchMessages', () => {
    it('should execute successfully and emit messageFetched event', async () => {
        await fetchMessages();

        expect(setup).toHaveBeenCalled();
        expect(puppeteer.launch).toHaveBeenCalled();
        expect(eventEmitter.emit).toHaveBeenCalledWith('messageFetched', expect.any(Array));
        expect(Logger.prototype.info).toHaveBeenCalledWith('Messages fetched and updated successfully.');
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = 'Test error';
        setup.mockRejectedValueOnce(new Error(errorMessage));

        await fetchMessages();

        expect(Logger.prototype.error).toHaveBeenCalledWith('Error fetching messages:', errorMessage);
    });
});
