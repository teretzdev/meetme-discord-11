// test/fetchMessages.test.js

import puppeteer from 'puppeteer';
import eventEmitter from '../src/events/eventEmitter.js';
import { Logger } from '../src/utils/logger.js';
import { setup } from '../src/utils/setup.js';
import { fetchMessages } from '../fetchMessages.js';

// Mock dependencies
jest.mock('puppeteer');
jest.mock('../src/events/eventEmitter', () => ({
    emit: jest.fn(),
    on: jest.fn()
}));
jest.mock('../src/utils/logger', () => ({
    Logger: jest.fn().mockImplementation(() => ({
        info: jest.fn(),
        error: jest.fn(),
        logEventEmitted: jest.fn()
    }))
}));
jest.mock('../src/utils/setup.js', () => ({
    setup: jest.fn()
}));

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

    it('should handle network errors during browser initialization', async () => {
        const errorMessage = 'Network error';
        puppeteer.launch.mockRejectedValueOnce(new Error(errorMessage));

        await fetchMessages();

        expect(Logger.prototype.error).toHaveBeenCalledWith('Error initializing browser:', errorMessage);
    });

    it('should handle authentication failures during login', async () => {
        const errorMessage = 'Authentication failed';
        puppeteer.launch.mockResolvedValueOnce({
            newPage: jest.fn().mockResolvedValue({
                goto: jest.fn(),
                type: jest.fn(),
                click: jest.fn().mockImplementationOnce(() => {
                    throw new Error(errorMessage);
                }),
                waitForNavigation: jest.fn(),
                evaluate: jest.fn().mockResolvedValue([]),
                close: jest.fn()
            }),
            close: jest.fn()
        });

        await fetchMessages();

        expect(Logger.prototype.error).toHaveBeenCalledWith('Error logging into MeetMe:', errorMessage);
    });

    it('should handle different chat data structures', async () => {
        const chatData = [
            { user: 'User1', text: 'Hello', timestamp: '2023-10-01T10:00:00Z' },
            { user: 'User2', text: 'Hi', timestamp: '2023-10-01T10:01:00Z' }
        ];
        puppeteer.launch.mockResolvedValueOnce({
            newPage: jest.fn().mockResolvedValue({
                goto: jest.fn(),
                type: jest.fn(),
                click: jest.fn(),
                waitForNavigation: jest.fn(),
                evaluate: jest.fn().mockResolvedValue(chatData),
                close: jest.fn()
            }),
            close: jest.fn()
        });

        await fetchMessages();

        expect(eventEmitter.emit).toHaveBeenCalledWith('messageFetched', chatData);
    });
});